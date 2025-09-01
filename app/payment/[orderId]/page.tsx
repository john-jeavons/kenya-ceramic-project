import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PaymentForm } from "@/components/payment-form"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Payment - Kenya Ceramic Project",
  description: "Complete your payment for CeraMaji ceramic water filter order.",
}

interface PaymentPageProps {
  params: {
    orderId: string
  }
}

export default function PaymentPage({ params }: PaymentPageProps) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4">
              Payment
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Complete Your Payment</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              You're almost done! Choose your payment method below to complete your order and get your water filter
              delivered.
            </p>
          </div>

          <PaymentForm orderId={params.orderId} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
