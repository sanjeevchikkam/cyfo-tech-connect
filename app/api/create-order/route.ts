import { NextRequest, NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "../../../lib/supabase";
import { createCashfreeOrder } from "../../../lib/cashfree";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { workshop_id, name, mobile, email, amount } = body;

    if (!workshop_id || !name || !mobile || !email || amount === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: workshop_id, name, mobile, email, amount" },
        { status: 400 }
      );
    }

    const dbClient = supabaseAdmin || supabase;

    if (!dbClient) {
      return NextResponse.json(
        { error: "Supabase client is not configured correctly on the server. Please check your environment variables." },
        { status: 500 }
      );
    }

    // Resolve the workshop_id in case the client sent workshops.id (UUID) instead of workshops.workshop_id
    let resolvedWorkshopId = workshop_id;
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(workshop_id);
    
    let workshopQuery = dbClient.from("workshops").select("id, workshop_id");
    if (isUuid) {
      workshopQuery = workshopQuery.or(`id.eq.${workshop_id},workshop_id.eq.${workshop_id}`);
    } else {
      workshopQuery = workshopQuery.eq("workshop_id", workshop_id);
    }

    const { data: workshopRows, error: wsError } = await workshopQuery.limit(1);
    if (!wsError && workshopRows && workshopRows.length > 0) {
      resolvedWorkshopId = workshopRows[0].workshop_id || workshop_id;
    }

    // 1. Insert into registrations table first. Let database generate the UUID and ticket_id
    const { data: registration, error: regError } = await dbClient
      .from("registrations")
      .insert({
        workshop_id: resolvedWorkshopId,
        name,
        mobile,
        email,
        attendance: false,
        status: "workshop register"
      })
      .select()
      .single();

    if (regError) {
      console.error("Database error inserting registration:", regError);
      return NextResponse.json(
        { error: `Registration failed: ${regError.message}` },
        { status: 500 }
      );
    }

    const ticketId = registration.ticket_id;

    // 2. Insert into payments table with status PENDING
    const { error: payError } = await dbClient
      .from("payments")
      .insert({
        ticket_id: ticketId,
        amount: Number(amount),
        currency: "INR",
        payment_status: "PENDING"
      });

    if (payError) {
      console.error("Database error inserting initial payment record:", payError);
      // We don't fail the whole request because the registration is created, but we log it
    }

    // 3. Prepare Callback & Webhook URLs
    // Cashfree strictly requires HTTPS for return_url and notify_url.
    // In many reverse-proxies or cloud environments (like Cloud Run / AI Studio), the app itself runs on http://localhost:3000 internally,
    // so req.nextUrl.origin results in 'http://localhost:3000' or similar http URL.
    // We construct the correct external HTTPS URL using the forwarded headers or host.
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || req.nextUrl.host;
    const proto = req.headers.get("x-forwarded-proto") || (host.includes("localhost") || host.includes("127.0.0.1") ? "http" : "https");
    const origin = `${proto}://${host}`;
    const returnUrl = `${origin}/api/payment-callback?order_id=${ticketId}`;
    const notifyUrl = `${origin}/api/webhook/cashfree`;

    console.log(`[Cashfree API] Creating order in environment: ${process.env.CASHFREE_ENV || "sandbox"} for ticket: ${ticketId}`);

    // 4. Create Cashfree Order
    try {
      const cfOrder = await createCashfreeOrder({
        orderId: ticketId,
        amount: Number(amount),
        customer: {
          id: registration.id,
          name,
          email,
          phone: mobile
        },
        returnUrl,
        notifyUrl
      });

      // Securely store the created Cashfree order metadata (cf_order_id, payment_session_id, etc.) in the database
      const { error: updatePayError } = await dbClient
        .from("payments")
        .update({
          raw_response: cfOrder
        })
        .eq("ticket_id", ticketId);

      if (updatePayError) {
        console.error("Database error updating payment record with Cashfree order info:", updatePayError);
      }

      return NextResponse.json({
        success: true,
        ticket_id: ticketId,
        payment_session_id: cfOrder.payment_session_id,
        cf_order_id: cfOrder.cf_order_id,
        order_status: cfOrder.order_status,
        payment_mode: process.env.CASHFREE_ENV === "production" ? "production" : "sandbox"
      });

    } catch (cfError: any) {
      console.error("Cashfree API integration failed:", cfError);
      
      // Update registration status to indicate order creation failure
      await dbClient
        .from("registrations")
        .update({ status: "Payment initiation failed" })
        .eq("ticket_id", ticketId);

      return NextResponse.json(
        { 
          error: "Failed to initiate payment with Cashfree", 
          details: cfError.message,
          ticket_id: ticketId 
        },
        { status: 502 }
      );
    }

  } catch (error: any) {
    console.error("Global error in /api/create-order:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
