import { NextRequest, NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "../../../lib/supabase";
import { getCashfreeOrderDetails, getCashfreeOrderPayments } from "../../../lib/cashfree";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const orderId = searchParams.get("order_id") || searchParams.get("cf_id");

  if (!orderId) {
    console.error("No order ID provided in payment callback redirect.");
    return NextResponse.redirect(new URL("/fail", req.nextUrl.origin));
  }

  const dbClient = supabaseAdmin || supabase;

  if (!dbClient) {
    console.error("Supabase is not configured in payment callback.");
    return NextResponse.redirect(new URL(`/fail?ticket_id=${orderId}&error=DatabaseConfigError`, req.nextUrl.origin));
  }

  try {
    // 1. Fetch live order details from Cashfree directly for absolute security
    const cfOrder = await getCashfreeOrderDetails(orderId);
    const orderStatus = cfOrder.order_status; // "PAID", "ACTIVE", "EXPIRED", etc.

    if (orderStatus === "PAID") {
      // Fetch details of individual payments for this order to find the valid payment transaction ID
      let paymentId = "";
      let paymentMethod = "";
      let rawPayload: any = cfOrder;

      try {
        const payments = await getCashfreeOrderPayments(orderId);
        const successfulPayment = payments.find((p: any) => p.payment_status === "SUCCESS");
        if (successfulPayment) {
          paymentId = successfulPayment.cf_payment_id ? String(successfulPayment.cf_payment_id) : "";
          paymentMethod = successfulPayment.payment_group || successfulPayment.payment_method?.payment_channel || "";
          rawPayload = successfulPayment;
        }
      } catch (e) {
        console.warn("Could not load payment transaction list from Cashfree, falling back to order status details:", e);
      }

      // 2. Update Registrations Table Status to "Success"
      const { error: regError } = await dbClient
        .from("registrations")
        .update({ status: "Success" })
        .eq("ticket_id", orderId);

      if (regError) {
        console.error("Error updating registration status:", regError);
      }

      // 3. Update Payments Table with Successful Transaction Details
      const { error: payError } = await dbClient
        .from("payments")
        .update({
          payment_id: paymentId || `CF_PAID_${orderId}`,
          payment_status: "SUCCESS",
          payment_method: paymentMethod || "CASHFREE",
          raw_response: rawPayload
        })
        .eq("ticket_id", orderId);

      if (payError) {
        console.error("Error updating payment status in DB:", payError);
      }

      // 4. Redirect to Success Page
      return NextResponse.redirect(new URL(`/success?ticket_id=${orderId}`, req.nextUrl.origin));
    } else {
      // Payment failed or incomplete
      console.warn(`Order status is not PAID. Actual status: ${orderStatus}`);

      // Update payment status in database
      await dbClient
        .from("payments")
        .update({
          payment_status: orderStatus,
          raw_response: cfOrder
        })
        .eq("ticket_id", orderId);

      await dbClient
        .from("registrations")
        .update({ status: `Payment ${orderStatus}` })
        .eq("ticket_id", orderId);

      // Redirect to Fail Page
      return NextResponse.redirect(new URL(`/fail?ticket_id=${orderId}&status=${orderStatus}`, req.nextUrl.origin));
    }

  } catch (err: any) {
    console.error("Failed to verify payment during redirect callback callback:", err);
    return NextResponse.redirect(new URL(`/fail?ticket_id=${orderId}&error=VerificationFailed`, req.nextUrl.origin));
  }
}
