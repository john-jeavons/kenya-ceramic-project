import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Droplets, Heart, Leaf } from "lucide-react"

export function ProductShowcase() {
  const features = [
    {
      icon: <Droplets className="w-6 h-6 text-primary" />,
      title: "99.9% Purification",
      description: "Removes harmful bacteria, parasites, and contaminants from water",
    },
    {
      icon: <Leaf className="w-6 h-6 text-primary" />,
      title: "Eco-Friendly Materials",
      description: "Made from local clay and sawdust - completely natural and sustainable",
    },
    {
      icon: <Heart className="w-6 h-6 text-primary" />,
      title: "Community Impact",
      description: "Every purchase supports local employment and community health",
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-primary" />,
      title: "Proven Effective",
      description: "Tested and trusted by over 5,000 families across Western Kenya",
    },
  ]

  const benefits = [
    "Reduces waterborne diseases by 99.9%",
    "Improves children's school attendance",
    "Saves money on medical expenses",
    "Creates sustainable local employment",
    "Environmentally friendly production",
    "Long-lasting and durable design",
  ]

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Our Product
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">CeraMaji Ceramic Water Filter</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Locally manufactured using traditional techniques combined with modern water purification science to deliver
            clean, safe drinking water.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative">
            <Image
              src="/images/water-filter-bucket.png"
              alt="CeraMaji Water Filter Details"
              width={500}
              height={600}
              className="w-full max-w-lg mx-auto rounded-2xl shadow-lg"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4">How It Works</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold">Pour Water</h4>
                    <p className="text-muted-foreground">Add untreated water to the top chamber</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold">Natural Filtration</h4>
                    <p className="text-muted-foreground">Ceramic filter removes 99.9% of contaminants</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">Clean Water</h4>
                    <p className="text-muted-foreground">Collect purified water from the bottom chamber</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-3">Technical Specifications</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <strong>Capacity:</strong> 20 liters
                </li>
                <li>
                  <strong>Filtration Rate:</strong> 2-3 liters per hour
                </li>
                <li>
                  <strong>Materials:</strong> Local clay, sawdust, silver nanoparticles
                </li>
                <li>
                  <strong>Lifespan:</strong> 2-3 years with proper maintenance
                </li>
                <li>
                  <strong>Maintenance:</strong> Simple cleaning every 2-3 months
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto mb-2">{feature.icon}</div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-muted">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Health & Community Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
