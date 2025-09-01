import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { intaSend } from "@/lib/intasend"

export async function GET(request: NextRequest, { params }: { params: { paymentId: string } }) {
  try {
    const paymentId = params.paymentId

    // Get payment from database
    const payment = await sql`
      SELECT 
        p.id,
        p.order_id,
        p.amount,
        p.method,
        p.status,
        p.transaction_ref,
        p.created_at,
        o.status as order_status
      FROM payments p
      JOIN orders o ON p.order_id = o.id
      WHERE p.transaction_ref = ${paymentId}
    `

    if (payment.length === 0) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 })
    }

    const paymentRecord = payment[0]

    // If payment is still pending, check with IntaSend
    if (paymentRecord.status === "pending") {
      try {
        const intaSendStatus = await intaSend.checkPaymentStatus(paymentId)

        let newStatus = "pending"
        let newOrderStatus = "payment_initiated"

        switch (intaSendStatus.state) {
          case "COMPLETE":
            newStatus = "completed"
            newOrderStatus = "confirmed"
            break
          case "FAILED":
            newStatus = "failed"
            newOrderStatus = "pending"
            break
          case "PROCESSING":
          case "PENDING":
          case "RETRY":
            newStatus = "pending"
            newOrderStatus = "payment_initiated"
            break
        }

        // Update database if status changed
        if (newStatus !== paymentRecord.status) {
          await sql`
            UPDATE payments 
            SET status = ${newStatus}
            WHERE id = ${paymentRecord.id}
          `

          await sql`
            UPDATE orders 
            SET status = ${newOrderStatus}
            WHERE id = ${paymentRecord.order_id}
          `

          paymentRecord.status = newStatus
          paymentRecord.order_status = newOrderStatus
        }
      } catch (intaSendError) {
        console.error("Error checking IntaSend status:", intaSendError)
        // Continue with database status if IntaSend check fails
      }
    }

    return NextResponse.json({
      payment: {
        id: paymentRecord.id,
        order_id: paymentRecord.order_id,
        amount: paymentRecord.amount,
        method: paymentRecord.method,
        status: paymentRecord.status,
        transaction_ref: paymentRecord.transaction_ref,
        created_at: paymentRecord.created_at,
        order_status: paymentRecord.order_status,
      },
    })
  } catch (error) {
    console.error("Payment status check error:", error)
    return NextResponse.json({ error: "Failed to check payment status" }, { status: 500 })
  }
}
