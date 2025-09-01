import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const orderId = params.id

    const result = await sql`
      SELECT 
        o.id,
        o.quantity,
        o.total_price,
        o.status as order_status,
        o.created_at,
        u.name as customer_name,
        u.email as customer_email,
        u.phone as customer_phone,
        u.address as customer_address,
        p.name as product_name,
        p.description as product_description,
        p.price as product_price,
        pay.status as payment_status,
        pay.transaction_ref,
        pay.method as payment_method
      FROM orders o
      JOIN users u ON o.user_id = u.id
      JOIN products p ON o.product_id = p.id
      LEFT JOIN payments pay ON o.id = pay.order_id
      WHERE o.id = ${orderId}
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({ order: result[0] })
  } catch (error) {
    console.error("Failed to fetch order status:", error)
    return NextResponse.json({ error: "Failed to fetch order status" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const orderId = params.id
    const body = await request.json()
    const { status } = body

    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 })
    }

    // Validate status
    const validStatuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"]
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    // Update order status
    const result = await sql`
      UPDATE orders 
      SET status = ${status}
      WHERE id = ${orderId}
      RETURNING id, status
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      order: result[0],
      message: `Order status updated to ${status}`,
    })
  } catch (error) {
    console.error("Failed to update order status:", error)
    return NextResponse.json({ error: "Failed to update order status" }, { status: 500 })
  }
}
