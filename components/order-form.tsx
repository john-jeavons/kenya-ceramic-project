"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Loader2, Plus, Minus, CheckCircle, Droplets } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface OrderFormData {
  name: string
  email: string
  phone: string
  address: string
  quantity: number
}

export function OrderForm() {
  const [formData, setFormData] = useState<OrderFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    quantity: 1,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const FILTER_PRICE = 1250
  const PRODUCT_ID = 1

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleQuantityChange = (change: number) => {
    setFormData((prev) => ({
      ...prev,
      quantity: Math.max(1, prev.quantity + change),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          product_id: PRODUCT_ID,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Order Created Successfully!",
          description: "Redirecting to payment...",
        })
        // Redirect to payment page with order ID
        router.push(`/payment/${data.order_id}`)
      } else {
        throw new Error(data.error || "Failed to create order")
      }
    } catch (error) {
      console.error("Order submission error:", error)
      toast({
        title: "Order Failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const totalPrice = FILTER_PRICE * formData.quantity

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Order Summary */}
      <Card className="lg:order-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-primary" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
              <Droplets className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">CeraMaji Ceramic Water Filter</h3>
              <p className="text-sm text-muted-foreground">99.9% water purification</p>
              <Badge variant="secondary" className="mt-1">
                20L Capacity
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Unit Price:</span>
              <span className="font-semibold">KES {FILTER_PRICE.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Quantity:</span>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={formData.quantity <= 1}
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="w-8 text-center font-semibold">{formData.quantity}</span>
                <Button type="button" variant="outline" size="sm" onClick={() => handleQuantityChange(1)}>
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-lg font-bold">
              <span>Total:</span>
              <span className="text-primary">KES {totalPrice.toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-primary/5 p-4 rounded-lg space-y-2">
            <h4 className="font-semibold text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              What's Included:
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Ceramic water filter system</li>
              <li>• Installation guide</li>
              <li>• Maintenance instructions</li>
              <li>• 2-year warranty</li>
              <li>• Free delivery within Western Kenya</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Order Form */}
      <Card className="lg:order-1">
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
          <p className="text-sm text-muted-foreground">
            Please provide your details for order processing and delivery.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+254 700 123 456"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Delivery Address *</Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your complete delivery address including town, county, and any landmarks"
                rows={3}
                required
              />
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Delivery Information:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Free delivery within Western Kenya (Trans Nzoia, Bungoma, Kakamega)</li>
                <li>• Delivery takes 3-5 business days</li>
                <li>• You'll receive SMS updates on delivery status</li>
                <li>• Payment required before delivery</li>
              </ul>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Order...
                </>
              ) : (
                <>Proceed to Payment - KES {totalPrice.toLocaleString()}</>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              By placing this order, you agree to our terms of service and privacy policy. Your information is secure
              and will only be used for order processing.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
