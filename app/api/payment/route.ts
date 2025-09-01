import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { intaSend } from "@/lib/intasend"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { order_id, amount, phone, email, method } = body

    // Validate required fields
    if (!order_id || !amount || !phone || !email || !method) {
      return NextResponse.json({ error: "Missing required payment fields" }, { status: 400 })
    }

    // Verify order exists and is pending
    const order = await sql`
      SELECT id, total_price, status FROM orders WHERE id = ${order_id}
    `

    if (order.length === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    if (order[0].status !== "pending") {
      return NextResponse.json({ error: "Order is not pending payment" }, { status: 400 })
    }

    if (order[0].total_price !== amount) {
      return NextResponse.json({ error: "Amount mismatch" }, { status: 400 })
    }

    // Generate unique API reference
    const api_ref = `KCP-${order_id}-${Date.now()}`

    // Prepare payment data
    const paymentData = {
      amount: amount,
      currency: "KES",
      email: email,
      phone_number: phone.replace(/\s+/g, "").replace(/^\+/, ""), // Clean phone number
      api_ref: api_ref,
      redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/order-status/${order_id}`,
      comment: `Payment for CeraMaji Water Filter - Order #${order_id}`,
    }

    let paymentResponse

    try {
      // Initiate payment based on method
      if (method === "mpesa") {
        paymentResponse = await intaSend.initiatePayment(paymentData)
      } else if (method === "card") {
        paymentResponse = await intaSend.initiateCardPayment(paymentData)
      } else {
        return NextResponse.json({ error: "Invalid payment method" }, { status: 400 })
      }

      // Store payment record
      await sql`
        INSERT INTO payments (order_id, amount, method, status, transaction_ref)
        VALUES (${order_id}, ${amount}, ${method}, 'pending', ${paymentResponse.id})
      `

      // Update order status to indicate payment initiated
      await sql`
        UPDATE orders SET status = 'payment_initiated' WHERE id = ${order_id}
      `

      return NextResponse.json({
        success: true,
        payment_id: paymentResponse.id,
        payment_url: paymentResponse.url,
        api_ref: api_ref,
        message: method === "mpesa" ? "M-Pesa payment initiated. Check your phone." : "Redirecting to payment gateway.",
      })
    } catch (intaSendError) {
      console.error("IntaSend payment error:", intaSendError)

      // Store failed payment attempt
      await sql`
        INSERT INTO payments (order_id, amount, method, status, transaction_ref)
        VALUES (${order_id}, ${amount}, ${method}, 'failed', ${api_ref})
      `

      return NextResponse.json(
        {
          error: "Payment initiation failed",
          details: intaSendError instanceof Error ? intaSendError.message : "Unknown error",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Payment API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
