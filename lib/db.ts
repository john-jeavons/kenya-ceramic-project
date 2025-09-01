import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set")
}

export const sql = neon(process.env.DATABASE_URL)

// Database schema types
export interface User {
  id: number
  name: string
  email: string
  phone: string
  address: string
  created_at: Date
}

export interface Order {
  id: number
  user_id: number
  product_id: number
  quantity: number
  total_price: number
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  created_at: Date
}

export interface Payment {
  id: number
  order_id: number
  amount: number
  method: string
  status: "pending" | "completed" | "failed" | "refunded"
  transaction_ref?: string
  created_at: Date
}

export interface Product {
  id: number
  name: string
  description: string
  price: number
  image_url?: string
  created_at: Date
}
