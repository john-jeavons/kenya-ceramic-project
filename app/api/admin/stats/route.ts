import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    // Get total orders
    const totalOrdersResult = await sql`
      SELECT COUNT(*) as count FROM orders
    `
    const totalOrders = Number.parseInt(totalOrdersResult[0].count)

    // Get total revenue
    const totalRevenueResult = await sql`
      SELECT COALESCE(SUM(total_price), 0) as revenue FROM orders WHERE status != 'cancelled'
    `
    const totalRevenue = Number.parseFloat(totalRevenueResult[0].revenue)

    // Get total customers
    const totalCustomersResult = await sql`
      SELECT COUNT(DISTINCT user_id) as count FROM orders
    `
    const totalCustomers = Number.parseInt(totalCustomersResult[0].count)

    // Get orders by status
    const ordersByStatusResult = await sql`
      SELECT 
        status,
        COUNT(*) as count
      FROM orders 
      GROUP BY status
    `

    const ordersByStatus = ordersByStatusResult.reduce(
      (acc, row) => {
        acc[row.status] = Number.parseInt(row.count)
        return acc
      },
      {
        pending: 0,
        confirmed: 0,
        shipped: 0,
        delivered: 0,
        cancelled: 0,
      },
    )

    // Calculate growth rate (simplified - comparing this month to last month)
    const currentMonth = new Date()
    const lastMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    const thisMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)

    const thisMonthOrdersResult = await sql`
      SELECT COUNT(*) as count FROM orders 
      WHERE created_at >= ${thisMonth.toISOString()}
    `
    const thisMonthOrders = Number.parseInt(thisMonthOrdersResult[0].count)

    const lastMonthOrdersResult = await sql`
      SELECT COUNT(*) as count FROM orders 
      WHERE created_at >= ${lastMonth.toISOString()} 
      AND created_at < ${thisMonth.toISOString()}
    `
    const lastMonthOrders = Number.parseInt(lastMonthOrdersResult[0].count)

    const growthRate =
      lastMonthOrders > 0 ? Math.round(((thisMonthOrders - lastMonthOrders) / lastMonthOrders) * 100) : 0

    const stats = {
      total_orders: totalOrders,
      total_revenue: totalRevenue,
      total_customers: totalCustomers,
      pending_orders: ordersByStatus.pending,
      confirmed_orders: ordersByStatus.confirmed,
      shipped_orders: ordersByStatus.shipped,
      delivered_orders: ordersByStatus.delivered,
      cancelled_orders: ordersByStatus.cancelled,
      growth_rate: growthRate,
    }

    return NextResponse.json({ stats })
  } catch (error) {
    console.error("Failed to fetch admin stats:", error)
    return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 })
  }
}
