import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, address, product_id, quantity } = body

    // Validate required fields
    if (!name || !email || !phone || !address || !product_id || !quantity) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get product price
    const product = await sql`
      SELECT price FROM products WHERE id = ${product_id}
    `

    if (product.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const total_price = product[0].price * quantity

    // Create or get user
    let user = await sql`
      SELECT id FROM users WHERE email = ${email}
    `

    if (user.length === 0) {
      user = await sql`
        INSERT INTO users (name, email, phone, address)
        VALUES (${name}, ${email}, ${phone}, ${address})
        RETURNING id
      `
    }

    const user_id = user[0].id

    // Create order
    const order = await sql`
      INSERT INTO orders (user_id, product_id, quantity, total_price, status)
      VALUES (${user_id}, ${product_id}, ${quantity}, ${total_price}, 'pending')
      RETURNING id, total_price
    `

    return NextResponse.json({
      success: true,
      order_id: order[0].id,
      total_price: order[0].total_price,
      message: "Order created successfully",
    })
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const orders = await sql`
      SELECT 
        o.id,
        o.quantity,
        o.total_price,
        o.status,
        o.created_at,
        u.name as customer_name,
        u.email as customer_email,
        p.name as product_name
      FROM orders o
      JOIN users u ON o.user_id = u.id
      JOIN products p ON o.product_id = p.id
      ORDER BY o.created_at DESC
    `

    return NextResponse.json({ orders })
  } catch (error) {
    console.error("Failed to fetch orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}
