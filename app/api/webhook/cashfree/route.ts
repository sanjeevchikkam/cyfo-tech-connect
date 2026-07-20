

import { NextRequest, NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "../../../../lib/supabase";
import { getCashfreeOrderDetails, getCashfreeOrderPayments } from "../../../../lib/cashfree";
import { sendTicketEmail } from "../../../../lib/resend";


export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json().catch(() => ({}));
    console.log("Cashfree webhook received payload:", JSON.stringify(rawBody));

    // Safely extract order/ticket ID from standard Cashfree webhook schemas
    const ticketId = 
      rawBody.data?.order?.order_id || 
      rawBody.order_id || 
      rawBody.orderId ||
      rawBody.data?.orderId;

    if (!ticketId) {
      console.warn("Cashfree Webhook received but no order/ticket ID could be parsed.", rawBody);
      return NextResponse.json({ error: "No order ID found in payload" }, { status: 400 });
    }

    const dbClient = supabaseAdmin || supabase;

    if (!dbClient) {
      console.error("Supabase client not configured inside Webhook.");
      return NextResponse.json({ error: "Database configuration error" }, { status: 500 });
    }

    // Direct confirmation from Cashfree API to ensure absolute security and prevent spoofing
    console.log(`Verifying payment for Ticket ID: ${ticketId} with Cashfree API...`);
    const cfOrder = await getCashfreeOrderDetails(ticketId);
    const orderStatus = cfOrder.order_status;

    if (orderStatus === "PAID") {
      let paymentId = "";
      let paymentMethod = "";
      let rawPayload: any = cfOrder;

      try {
        const payments = await getCashfreeOrderPayments(ticketId);
        const successfulPayment = payments.find((p: any) => p.payment_status === "SUCCESS");
        if (successfulPayment) {
          paymentId = successfulPayment.cf_payment_id ? String(successfulPayment.cf_payment_id) : "";
          paymentMethod = successfulPayment.payment_group || successfulPayment.payment_method?.payment_channel || "";
          rawPayload = successfulPayment;
        }
      } catch (err) {
        console.warn("Webhook fetch payments failed, using order details:", err);
      }

      // Update Registrations status
      const { error: regError } = await dbClient
        .from("registrations")
        .update({ status: "Success" })
        .eq("ticket_id", ticketId);

      if (regError) {
        console.error("Webhook database update failed for registrations:", regError);
      } else {
        console.log(`Webhook updated registration status for ${ticketId} to Success.`);
      }

      // Update Payments status
      const { error: payError } = await dbClient
        .from("payments")
        .update({
          payment_id: paymentId || `CF_PAID_WEBHOOK_${ticketId}`,
          payment_status: "SUCCESS",
          payment_method: paymentMethod || "CASHFREE_WEBHOOK",
          raw_response: rawPayload
        })
        .eq("ticket_id", ticketId);

      if (payError) {
        console.error("Webhook database update failed for payments:", payError);
      }

      // Send ticket confirmation email with QR and event details
      try {
        const { data: regDetails, error: regDetailsErr } = await dbClient
          .from("registrations")
          .select("*")
          .eq("ticket_id", ticketId)
          .single();

        if (regDetailsErr) {
          console.error("Failed to fetch registration details for email:", regDetailsErr);
        } else if (regDetails && regDetails.email) {
          const { data: workshopDetails, error: wsDetailsErr } = await dbClient
            .from("workshops")
            .select("*")
            .eq("workshop_id", regDetails.workshop_id)
            .single();

          if (wsDetailsErr) {
            console.error("Failed to fetch workshop details for email:", wsDetailsErr);
          } else if (workshopDetails) {
            console.log(`Sending ticket email for ${ticketId} to ${regDetails.email}...`);
            await sendTicketEmail({
              email: regDetails.email,
              name: regDetails.name,
              ticketId: ticketId,
              eventName: workshopDetails.title,
              eventDate: workshopDetails.date_time || "Check schedule in email",
              eventVenue: workshopDetails.venue || "Virtual Stream",
            });
            console.log(`Success email sent successfully to ${regDetails.email} for ticket ${ticketId}`);
          }
        }
      } catch (emailErr) {
        console.error("Error sending confirmation email in webhook:", emailErr);
      }

      return NextResponse.json({ success: true, message: "Webhook processed and registration marked Success" });
    } else {
      console.log(`Payment webhook verified order ${ticketId} status is ${orderStatus}. Updating status.`);
      
      await dbClient
        .from("payments")
        .update({
          payment_status: orderStatus,
          raw_response: cfOrder
        })
        .eq("ticket_id", ticketId);

      await dbClient
        .from("registrations")
        .update({ status: `Payment ${orderStatus}` })
        .eq("ticket_id", ticketId);

      return NextResponse.json({ success: true, message: `Webhook processed and marked ${orderStatus}` });
    }

  } catch (error: any) {
    console.error("Global error in Cashfree Webhook endpoint:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
