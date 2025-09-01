"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Loader2, CreditCard, Smartphone, CheckCircle, AlertCircle, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

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
}

interface PaymentFormProps {
  orderId: string
}

export function PaymentForm({ orderId }: PaymentFormProps) {
  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<"mpesa" | "card">("mpesa")
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    fetchOrderDetails()
  }, [orderId])

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}/status`)
      const data = await response.json()

      if (response.ok) {
        setOrder(data.order)

        // If payment is already completed, redirect to status page
        if (data.order.payment_status === "completed") {
          router.push(`/order-status/${orderId}`)
          return
        }
      } else {
        throw new Error(data.error || "Failed to fetch order")
      }
    } catch (error) {
      console.error("Failed to fetch order:", error)
      toast({
        title: "Error",
        description: "Failed to load order details. Please try again.",
        variant: "destructive",
      })
      router.push("/order")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePayment = async () => {
    if (!order) return

    setIsProcessing(true)

    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_id: order.id,
          amount: order.total_price,
          phone: order.customer_phone,
          email: order.customer_email,
          method: selectedMethod,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        if (selectedMethod === "mpesa") {
          toast({
            title: "M-Pesa Payment Initiated",
            description: "Please check your phone for the M-Pesa prompt and enter your PIN to complete payment.",
          })

          // Redirect to status page to track payment
          setTimeout(() => {
            router.push(`/order-status/${order.id}`)
          }, 3000)
        } else {
          // For card payments, redirect to IntaSend payment page
          if (data.payment_url) {
            setPaymentUrl(data.payment_url)
            toast({
              title: "Redirecting to Payment",
              description: "You will be redirected to complete your card payment.",
            })
          }
        }
      } else {
        throw new Error(data.error || "Payment failed")
      }
    } catch (error) {
      console.error("Payment error:", error)
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
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
          <p className="text-muted-foreground mb-4">We couldn't find your order. Please try again.</p>
          <Button onClick={() => router.push("/order")}>Create New Order</Button>
        </CardContent>
      </Card>
    )
  }

  // Show payment URL for card payments
  if (paymentUrl) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <CreditCard className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Complete Your Payment</h3>
          <p className="text-muted-foreground mb-6">
            Click the button below to complete your card payment securely with IntaSend.
          </p>
          <Button asChild size="lg" className="mb-4">
            <a href={paymentUrl} target="_blank" rel="noopener noreferrer">
              Complete Payment
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
          <p className="text-xs text-muted-foreground">
            After completing payment, you'll be redirected back to track your order.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
          <Badge variant="secondary">Order #{order.id}</Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Product:</span>
              <span className="font-semibold">{order.product_name}</span>
            </div>
            <div className="flex justify-between">
              <span>Quantity:</span>
              <span className="font-semibold">{order.quantity}</span>
            </div>
            <div className="flex justify-between">
              <span>Unit Price:</span>
              <span className="font-semibold">KES {(order.total_price / order.quantity).toLocaleString()}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total Amount:</span>
              <span className="text-primary">KES {order.total_price.toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Delivery Details:</h4>
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
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Choose Payment Method</CardTitle>
          <p className="text-sm text-muted-foreground">Select your preferred payment method to complete your order.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedMethod === "mpesa" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
              onClick={() => setSelectedMethod("mpesa")}
            >
              <div className="flex items-center gap-3">
                <Smartphone className="w-6 h-6 text-green-600" />
                <div className="flex-1">
                  <h3 className="font-semibold">M-Pesa</h3>
                  <p className="text-sm text-muted-foreground">Pay with your mobile money</p>
                </div>
                {selectedMethod === "mpesa" && <CheckCircle className="w-5 h-5 text-primary" />}
              </div>
            </div>

            <div
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedMethod === "card" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
              onClick={() => setSelectedMethod("card")}
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-blue-600" />
                <div className="flex-1">
                  <h3 className="font-semibold">Credit/Debit Card</h3>
                  <p className="text-sm text-muted-foreground">Pay with Visa, Mastercard</p>
                </div>
                {selectedMethod === "card" && <CheckCircle className="w-5 h-5 text-primary" />}
              </div>
            </div>
          </div>

          <div className="bg-primary/5 p-4 rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Payment Security:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• SSL encrypted secure payment</li>
              <li>• Powered by IntaSend payment gateway</li>
              <li>• No card details stored on our servers</li>
              <li>• Instant payment confirmation</li>
            </ul>
          </div>

          <Button onClick={handlePayment} className="w-full" size="lg" disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>
                Pay KES {order.total_price.toLocaleString()} with {selectedMethod === "mpesa" ? "M-Pesa" : "Card"}
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By completing this payment, you confirm your order and agree to our terms of service.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
