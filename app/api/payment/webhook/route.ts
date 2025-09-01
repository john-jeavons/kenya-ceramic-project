import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("IntaSend webhook received:", body)

    // Verify webhook signature (in production)
    // const signature = request.headers.get('x-intasend-signature')
    // if (!verifyWebhookSignature(body, signature)) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    // }

    const { invoice_id, state, api_ref, failed_reason, failed_code } = body

    if (!invoice_id || !state) {
      return NextResponse.json({ error: "Missing required webhook data" }, { status: 400 })
    }

    // Find the payment record
    const payment = await sql`
      SELECT id, order_id FROM payments WHERE transaction_ref = ${invoice_id}
    `

    if (payment.length === 0) {
      console.error("Payment not found for invoice_id:", invoice_id)
      return NextResponse.json({ error: "Payment not found" }, { status: 404 })
    }

    const paymentId = payment[0].id
    const orderId = payment[0].order_id

    // Update payment status based on IntaSend state
    let paymentStatus = "pending"
    let orderStatus = "pending"

    switch (state) {
      case "COMPLETE":
        paymentStatus = "completed"
        orderStatus = "confirmed"
        break
      case "FAILED":
        paymentStatus = "failed"
        orderStatus = "pending"
        break
      case "PROCESSING":
      case "PENDING":
        paymentStatus = "pending"
        orderStatus = "payment_initiated"
        break
      case "RETRY":
        paymentStatus = "pending"
        orderStatus = "payment_initiated"
        break
      default:
        paymentStatus = "pending"
        orderStatus = "payment_initiated"
    }

    // Update payment record
    await sql`
      UPDATE payments 
      SET status = ${paymentStatus}
      WHERE id = ${paymentId}
    `

    // Update order status
    await sql`
      UPDATE orders 
      SET status = ${orderStatus}
      WHERE id = ${orderId}
    `

    // Log the webhook processing
    console.log(`Webhook processed: Payment ${paymentId}, Order ${orderId}, Status: ${paymentStatus}`)

    // Send confirmation email/SMS here if payment completed
    if (state === "COMPLETE") {
      // TODO: Send confirmation notifications
      console.log(`Payment completed for order ${orderId}`)
    }

    return NextResponse.json({ success: true, message: "Webhook processed successfully" })
  } catch (error) {
    console.error("Webhook processing error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
