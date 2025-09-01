"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Truck, Package, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"

interface Order {
  id: number
  quantity: number
  total_price: number
  order_status: string
  customer_name: string
  customer_email: string
  customer_phone: string
  customer_address: string
  product_name: string
  payment_status?: string
  transaction_ref?: string
  created_at: string
}

interface OrderStatusProps {
  orderId: string
}

export function OrderStatus({ orderId }: OrderStatusProps) {
  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchOrderStatus()
    // Poll for updates every 30 seconds
    const interval = setInterval(fetchOrderStatus, 30000)
    return () => clearInterval(interval)
  }, [orderId])

  const fetchOrderStatus = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}/status`)
      const data = await response.json()

      if (response.ok) {
        setOrder(data.order)
      }
    } catch (error) {
      console.error("Failed to fetch order status:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />
      case "confirmed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "shipped":
        return <Truck className="w-5 h-5 text-blue-500" />
      case "delivered":
        return <Package className="w-5 h-5 text-green-600" />
      case "cancelled":
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPaymentStatusColor = (status?: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!order) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Order Not Found</h3>
          <p className="text-muted-foreground mb-4">We couldn't find your order. Please check your order ID.</p>
          <Button asChild>
            <Link href="/order">Place New Order</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Order Status Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {getStatusIcon(order.order_status)}
                Order #{order.id}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Placed on {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <Badge className={getStatusColor(order.order_status)}>
                {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
              </Badge>
              {order.payment_status && (
                <Badge className={`${getPaymentStatusColor(order.payment_status)} mt-2 block`}>
                  Payment: {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Order Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Product:</span>
                  <span className="font-medium">{order.product_name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity:</span>
                  <span className="font-medium">{order.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span className="font-medium">KES {order.total_price.toLocaleString()}</span>
                </div>
                {order.transaction_ref && (
                  <div className="flex justify-between">
                    <span>Transaction ID:</span>
                    <span className="font-medium text-xs">{order.transaction_ref}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Delivery Information</h4>
              <div className="text-sm space-y-1">
                <p>
                  <strong>Name:</strong> {order.customer_name}
                </p>
                <p>
                  <strong>Phone:</strong> {order.customer_phone}
                </p>
                <p>
                  <strong>Email:</strong> {order.customer_email}
                </p>
                <p>
                  <strong>Address:</strong> {order.customer_address}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Order Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium">Order Placed</p>
                <p className="text-sm text-muted-foreground">Your order has been received</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {order.payment_status === "completed" ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <Clock className="w-5 h-5 text-yellow-500" />
              )}
              <div>
                <p className="font-medium">Payment {order.payment_status === "completed" ? "Confirmed" : "Pending"}</p>
                <p className="text-sm text-muted-foreground">
                  {order.payment_status === "completed"
                    ? "Payment has been processed successfully"
                    : "Waiting for payment confirmation"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {["confirmed", "shipped", "delivered"].includes(order.order_status) ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <Clock className="w-5 h-5 text-gray-400" />
              )}
              <div>
                <p className="font-medium">Order Confirmed</p>
                <p className="text-sm text-muted-foreground">Your order is being prepared</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {["shipped", "delivered"].includes(order.order_status) ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <Clock className="w-5 h-5 text-gray-400" />
              )}
              <div>
                <p className="font-medium">Shipped</p>
                <p className="text-sm text-muted-foreground">Your order is on the way</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {order.order_status === "delivered" ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <Clock className="w-5 h-5 text-gray-400" />
              )}
              <div>
                <p className="font-medium">Delivered</p>
                <p className="text-sm text-muted-foreground">Your order has been delivered</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild variant="outline">
              <Link href="/contact">Contact Support</Link>
            </Button>
            <Button asChild>
              <Link href="/order">Place Another Order</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
