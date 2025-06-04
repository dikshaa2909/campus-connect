import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Campus Connect has transformed how we manage our academic processes. The intuitive interface and comprehensive features have made administration so much easier.",
      author: "Dr. Sarah Johnson",
      role: "Dean of Students, Westfield University",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "As a student, I love how easy it is to access all my course materials, submit assignments, and track my grades in one place. The mobile app is a game-changer!",
      author: "Michael Chen",
      role: "Computer Science Major, Class of 2024",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "The faculty dashboard has streamlined my teaching workflow. I can create assignments, grade submissions, and communicate with students all from one platform.",
      author: "Prof. Robert Williams",
      role: "Department of Engineering",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm dark:bg-purple-800/30">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Users Say</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from students, faculty, and administrators who use Campus Connect every day.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6 flex flex-col gap-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <blockquote className="text-lg italic text-muted-foreground">"{testimonial.quote}"</blockquote>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
