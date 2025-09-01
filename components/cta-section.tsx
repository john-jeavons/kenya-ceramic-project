import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Phone, Mail } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
          Ready to Provide Clean Water for Your Family?
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto text-pretty opacity-90">
          Join thousands of families across Kenya who have improved their health and quality of life with our ceramic
          water filters.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="bg-background text-foreground hover:bg-background/90"
          >
            <Link href="/order">
              Order Now - KES 1,250
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
          >
            <Link href="/contact">Ask Questions</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Card className="bg-primary-foreground/10 border-primary-foreground/20">
            <CardContent className="p-4 flex items-center gap-3">
              <Phone className="w-5 h-5" />
              <div className="text-left">
                <div className="font-semibold text-sm">Call Us</div>
                <div className="text-sm opacity-90">+254 700 123 456</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-primary-foreground/10 border-primary-foreground/20">
            <CardContent className="p-4 flex items-center gap-3">
              <Mail className="w-5 h-5" />
              <div className="text-left">
                <div className="font-semibold text-sm">Email Us</div>
                <div className="text-sm opacity-90">info@ceramaji.co.ke</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
