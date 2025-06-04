export function StatsSection() {
  const stats = [
    { value: "10,000+", label: "Students" },
    { value: "500+", label: "Faculty Members" },
    { value: "1,000+", label: "Courses" },
    { value: "95%", label: "Satisfaction Rate" },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-purple-50 dark:bg-purple-950/10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Trusted by Educational Institutions
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join thousands of students and educators already using Campus Connect
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 py-12 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center space-y-2 rounded-lg border bg-background p-6 shadow-sm"
            >
              <div className="text-3xl font-bold sm:text-4xl md:text-5xl text-purple-600">{stat.value}</div>
              <div className="text-sm font-medium text-muted-foreground sm:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
