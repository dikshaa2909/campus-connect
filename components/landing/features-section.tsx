import { BookOpen, Calendar, FileText, GraduationCap, MessageSquare, Users } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: <GraduationCap className="h-10 w-10 text-purple-600" />,
      title: "Student Dashboard",
      description:
        "Access course materials, submit assignments, view grades, and manage your academic journey all in one place.",
    },
    {
      icon: <BookOpen className="h-10 w-10 text-purple-600" />,
      title: "Faculty Portal",
      description: "Create courses, grade assignments, track attendance, and communicate with students efficiently.",
    },
    {
      icon: <Users className="h-10 w-10 text-purple-600" />,
      title: "Admin Management",
      description: "Comprehensive tools for managing users, courses, schedules, and institutional operations.",
    },
    {
      icon: <Calendar className="h-10 w-10 text-purple-600" />,
      title: "Smart Scheduling",
      description: "Automated timetable generation and management for classes, exams, and campus events.",
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-purple-600" />,
      title: "Communication Hub",
      description: "Integrated messaging, announcements, and notifications to keep everyone connected.",
    },
    {
      icon: <FileText className="h-10 w-10 text-purple-600" />,
      title: "Resource Library",
      description: "Centralized repository for educational materials, research papers, and institutional resources.",
    },
  ]

  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm dark:bg-purple-800/30">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need in One Platform</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Campus Connect provides a comprehensive suite of tools designed to enhance the educational experience for
              everyone.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
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
      </div>
    </section>
  )
}
