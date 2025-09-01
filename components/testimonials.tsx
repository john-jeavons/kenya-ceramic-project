import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      name: "Mary Wanjiku",
      location: "Kiminini, Trans Nzoia",
      quote:
        "Since using the CeraMaji filter, my children haven't had any stomach problems. The water tastes clean and I feel confident giving it to my family.",
      rating: 5,
    },
    {
      name: "James Ochieng",
      location: "Kitale, Trans Nzoia",
      quote:
        "This filter has saved us so much money on medical bills. My wife and I are healthier, and our children can focus on school instead of being sick.",
      rating: 5,
    },
    {
      name: "Grace Nafula",
      location: "Webuye, Bungoma",
      quote:
        "I love that this filter is made right here in Kenya. It's affordable, effective, and supports our local community. Highly recommended!",
      rating: 5,
    },
  ]

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from families across Western Kenya who have transformed their health with clean water.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-background">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-sm mb-4 text-pretty leading-relaxed">"{testimonial.quote}"</blockquote>
                <div>
                  <div className="font-semibold text-sm">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.location}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
