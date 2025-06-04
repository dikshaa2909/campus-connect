"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { BookOpen, Calendar, Clock, FileText, GraduationCap, TrendingUp } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

export function StudentDashboard() {
  const { user, signOut } = useAuth()
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  // Mock data for the dashboard
  const upcomingAssignments = [
    {
      id: "1",
      title: "Research Paper",
      course: "Introduction to Psychology",
      dueDate: "Apr 15, 2025",
      status: "pending",
    },
    {
      id: "2",
      title: "Problem Set 3",
      course: "Calculus II",
      dueDate: "Apr 12, 2025",
      status: "pending",
    },
    {
      id: "3",
      title: "Lab Report",
      course: "Chemistry 101",
      dueDate: "Apr 18, 2025",
      status: "pending",
    },
  ]

  const courses = [
    {
      id: "1",
      title: "Introduction to Psychology",
      instructor: "Dr. Sarah Johnson",
      progress: 75,
      nextClass: "Tomorrow, 10:00 AM",
    },
    {
      id: "2",
      title: "Calculus II",
      instructor: "Prof. Michael Chen",
      progress: 60,
      nextClass: "Today, 2:00 PM",
    },
    {
      id: "3",
      title: "Chemistry 101",
      instructor: "Dr. Robert Williams",
      progress: 80,
      nextClass: "Wednesday, 11:00 AM",
    },
    {
      id: "4",
      title: "World History",
      instructor: "Prof. Emily Davis",
      progress: 50,
      nextClass: "Thursday, 9:00 AM",
    },
  ]

  const recentGrades = [
    {
      id: "1",
      assignment: "Midterm Exam",
      course: "Introduction to Psychology",
      grade: "A",
      score: "92/100",
    },
    {
      id: "2",
      assignment: "Problem Set 2",
      course: "Calculus II",
      grade: "B+",
      score: "88/100",
    },
    {
      id: "3",
      assignment: "Lab Report",
      course: "Chemistry 101",
      grade: "A-",
      score: "90/100",
    },
  ]

  const todaySchedule = [
    {
      id: "1",
      title: "Calculus II",
      time: "2:00 PM - 3:30 PM",
      location: "Science Building, Room 302",
    },
    {
      id: "2",
      title: "Chemistry Lab",
      time: "4:00 PM - 6:00 PM",
      location: "Chemistry Lab, Room 105",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user?.displayName}</h2>
          <p className="text-muted-foreground">Here's what's happening with your academic progress today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/dashboard/schedule">
              <Calendar className="mr-2 h-4 w-4" />
              View Schedule
            </Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              signOut().then(() => {
                router.push("/")
              })
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.75</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 inline" />
              +0.2 from last semester
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">12 credit hours this semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assignments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Due in the next 7 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95%</div>
            <p className="text-xs text-muted-foreground">Overall attendance rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="grades">Grades</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>Your classes and activities for today</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {todaySchedule.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4">
                    <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/20">
                      <Calendar className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                      <p className="text-xs text-muted-foreground">{item.location}</p>
                    </div>
                  </div>
                ))}
                {todaySchedule.length === 0 && (
                  <p className="text-sm text-muted-foreground">No classes scheduled for today.</p>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Assignments</CardTitle>
                <CardDescription>Assignments due in the next 7 days</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingAssignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-start space-x-4">
                    <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/20">
                      <FileText className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{assignment.title}</p>
                      <p className="text-xs text-muted-foreground">{assignment.course}</p>
                      <p className="text-xs text-muted-foreground">Due: {assignment.dueDate}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Grades</CardTitle>
                <CardDescription>Your most recent assignment and exam grades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentGrades.map((grade) => (
                    <div key={grade.id} className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">{grade.assignment}</p>
                        <p className="text-xs text-muted-foreground">{grade.course}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium">{grade.score}</div>
                        <div className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-600 dark:bg-green-900/20 dark:text-green-400">
                          {grade.grade}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>Recent messages from your instructors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Dr. Sarah Johnson" />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">Dr. Sarah Johnson</p>
                        <span className="text-xs text-muted-foreground">2h ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Please remember to submit your research paper outline by Friday.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Prof. Michael Chen" />
                      <AvatarFallback>MC</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">Prof. Michael Chen</p>
                        <span className="text-xs text-muted-foreground">Yesterday</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Office hours are canceled tomorrow. Please email me if you need assistance.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {courses.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.instructor}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Course Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} />
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/20">
                      <Calendar className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Next Class</p>
                      <p className="text-xs text-muted-foreground">{course.nextClass}</p>
                    </div>
                  </div>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/dashboard/courses/${course.id}`}>View Course</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Assignments</CardTitle>
              <CardDescription>Assignments due in the next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {upcomingAssignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/20">
                        <FileText className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">{assignment.title}</p>
                        <p className="text-sm text-muted-foreground">{assignment.course}</p>
                        <p className="text-sm text-muted-foreground">Due: {assignment.dueDate}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Completed Assignments</CardTitle>
              <CardDescription>Your recently submitted assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/20">
                      <FileText className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Essay on Modern Literature</p>
                      <p className="text-sm text-muted-foreground">World Literature</p>
                      <p className="text-sm text-muted-foreground">Submitted: Apr 5, 2025</p>
                    </div>
                  </div>
                  <div className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-600 dark:bg-green-900/20 dark:text-green-400">
                    Graded: A
                  </div>
                </div>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/20">
                      <FileText className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Problem Set 2</p>
                      <p className="text-sm text-muted-foreground">Calculus II</p>
                      <p className="text-sm text-muted-foreground">Submitted: Apr 2, 2025</p>
                    </div>
                  </div>
                  <div className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-600 dark:bg-green-900/20 dark:text-green-400">
                    Graded: B+
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="grades" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Grade Summary</CardTitle>
              <CardDescription>Your current grades for this semester</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Introduction to Psychology</p>
                    <p className="text-sm text-muted-foreground">Dr. Sarah Johnson</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-sm font-medium">92%</div>
                    <div className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-600 dark:bg-green-900/20 dark:text-green-400">
                      A
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Calculus II</p>
                    <p className="text-sm text-muted-foreground">Prof. Michael Chen</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-sm font-medium">88%</div>
                    <div className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-600 dark:bg-green-900/20 dark:text-green-400">
                      B+
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Chemistry 101</p>
                    <p className="text-sm text-muted-foreground">Dr. Robert Williams</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-sm font-medium">90%</div>
                    <div className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-600 dark:bg-green-900/20 dark:text-green-400">
                      A-
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">World History</p>
                    <p className="text-sm text-muted-foreground">Prof. Emily Davis</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-sm font-medium">85%</div>
                    <div className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-600 dark:bg-green-900/20 dark:text-green-400">
                      B
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Grade History</CardTitle>
              <CardDescription>Your academic performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Current Semester GPA</p>
                  <p className="text-sm font-bold">3.75</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Previous Semester GPA</p>
                  <p className="text-sm font-bold">3.55</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Cumulative GPA</p>
                  <p className="text-sm font-bold">3.65</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
