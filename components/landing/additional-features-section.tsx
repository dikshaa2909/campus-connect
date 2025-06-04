import { Calendar, FileText, MessageSquare, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AdditionalFeaturesSection() {
  const features = [
    {
      icon: <Shield className="h-10 w-10 text-purple-600" />,
      title: "Secure Authentication",
      description:
        "Role-based access control ensures students, faculty, and administrators have appropriate permissions.",
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-purple-600" />,
      title: "Integrated Messaging",
      description: "Direct communication between students and faculty with real-time notifications.",
    },
    {
      icon: <Calendar className="h-10 w-10 text-purple-600" />,
      title: "Interactive Calendar",
      description: "View your schedule in day, week, or month format with color-coded events.",
    },
    {
      icon: <FileText className="h-10 w-10 text-purple-600" />,
      title: "Assignment Management",
      description: "Submit, grade, and track assignments with detailed feedback and analytics.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-purple-50 dark:from-background dark:to-purple-950/10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm dark:bg-purple-800/30">
              More Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Designed for Modern Education</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Campus Connect offers a comprehensive set of tools to enhance the educational experience
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="rounded-full border-8 border-purple-50 p-2 dark:border-purple-950/50">{feature.icon}</div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-center text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button size="lg" asChild>
            <Link href="/signup">Get Started Today</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
