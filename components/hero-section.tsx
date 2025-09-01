import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-background to-muted py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
              Clean Water for Every <span className="text-primary">Kenyan Family</span>
            </h1>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              Affordable ceramic water filters made from local clay and sawdust. Providing 99.9% water purification to
              improve health and empower communities in Western Kenya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/order">Order Filter - KES 1,250</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">Learn Our Story</Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground">Purification</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">1,250</div>
                <div className="text-sm text-muted-foreground">KES Only</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">5,000+</div>
                <div className="text-sm text-muted-foreground">Families Served</div>
              </Card>
            </div>
          </div>

          <div className="relative">
            <Image
              src="/images/ceramaji-brand.jpg"
              alt="CeraMaji Water for Life - Clean Water Solutions"
              width={500}
              height={600}
              className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
