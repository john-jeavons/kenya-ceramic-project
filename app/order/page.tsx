import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OrderForm } from "@/components/order-form"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Order Water Filter - Kenya Ceramic Project",
  description: "Order your CeraMaji ceramic water filter for clean, safe drinking water. KES 1,250 with free delivery.",
}

export default function OrderPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4">
              Order Now
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Get Your CeraMaji Water Filter</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Join thousands of families enjoying clean, safe drinking water. Complete your order below and we'll
              deliver your filter within 3-5 business days.
            </p>
          </div>

          <OrderForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
