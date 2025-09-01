import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OrderStatus } from "@/components/order-status"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Order Status - Kenya Ceramic Project",
  description: "Track your CeraMaji ceramic water filter order status and delivery.",
}

interface OrderStatusPageProps {
  params: {
    orderId: string
  }
}

export default function OrderStatusPage({ params }: OrderStatusPageProps) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4">
              Order Status
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Track Your Order</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Stay updated on your CeraMaji water filter order. We'll keep you informed every step of the way.
            </p>
          </div>

          <OrderStatus orderId={params.orderId} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
