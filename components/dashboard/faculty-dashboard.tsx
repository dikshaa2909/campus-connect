"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { BookOpen, Calendar, CheckCircle, Clock, FileText, Users, MessageSquare } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

export function FacultyDashboard() {
  const { user, signOut } = useAuth()
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => setProgress(75), 500)
    return () => clearTimeout(timer)
  }, [])

  // Mock data for the dashboard
  const courses = [
    {
      id: "1",
      title: "Introduction to Psychology",
      code: "PSY101",
      students: 35,
      nextClass: "Tomorrow, 10:00 AM",
      location: "Science Building, Room 302",
    },
    {
      id: "2",
      title: "Advanced Psychology",
      code: "PSY301",
      students: 22,
      nextClass: "Today, 2:00 PM",
      location: "Science Building, Room 305",
    },
    {
      id: "3",
      title: "Research Methods in Psychology",
      code: "PSY201",
      students: 28,
      nextClass: "Wednesday, 11:00 AM",
      location: "Science Building, Room 310",
    },
  ]

  const pendingAssignments = [
    {
      id: "1",
      title: "Research Paper",
      course: "Introduction to Psychology",
      submissions: 25,
      total: 35,
      dueDate: "Apr 15, 2025",
    },
    {
      id: "2",
      title: "Case Study Analysis",
      course: "Advanced Psychology",
      submissions: 18,
      total: 22,
      dueDate: "Apr 12, 2025",
    },
    {
      id: "3",
      title: "Experimental Design",
      course: "Research Methods in Psychology",
      submissions: 20,
      total: 28,
      dueDate: "Apr 18, 2025",
    },
  ]

  const todaySchedule = [
    {
      id: "1",
      title: "Advanced Psychology",
      time: "2:00 PM - 3:30 PM",
      location: "Science Building, Room 305",
    },
    {
      id: "2",
      title: "Office Hours",
      time: "4:00 PM - 6:00 PM",
      location: "Faculty Office, Room 205",
    },
  ]

  const recentMessages = [
    {
      id: "1",
      name: "John Smith",
      avatar: "/placeholder.svg?height=36&width=36",
      time: "2h ago",
      message: "I have a question about the research paper requirements.",
    },
    {
      id: "2",
      name: "Emily Johnson",
      avatar: "/placeholder.svg?height=36&width=36",
      time: "Yesterday",
      message: "Will you be available during office hours tomorrow?",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user?.displayName}</h2>
          <p className="text-muted-foreground">Here's what's happening with your courses today.</p>
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
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">9 credit hours this semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85</div>
            <p className="text-xs text-muted-foreground">Across all courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Requiring grading</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Office Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Today</div>
            <p className="text-xs text-muted-foreground">4:00 PM - 6:00 PM</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
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
                <CardTitle>Assignment Status</CardTitle>
                <CardDescription>Pending assignments and submissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingAssignments.map((assignment) => (
                  <div key={assignment.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">{assignment.title}</p>
                        <p className="text-xs text-muted-foreground">{assignment.course}</p>
                      </div>
                      <div className="text-xs text-muted-foreground">Due: {assignment.dueDate}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span>
                          Submissions: {assignment.submissions}/{assignment.total}
                        </span>
                        <span>{Math.round((assignment.submissions / assignment.total) * 100)}%</span>
                      </div>
                      <Progress value={(assignment.submissions / assignment.total) * 100} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Course Overview</CardTitle>
                <CardDescription>Summary of your current courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {courses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">{course.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {course.code} • {course.students} students
                        </p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/courses/${course.id}`}>View</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>Messages from your students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMessages.map((message) => (
                    <div key={message.id} className="flex items-start space-x-4">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.name} />
                        <AvatarFallback>
                          {message.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">{message.name}</p>
                          <span className="text-xs text-muted-foreground">{message.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{message.message}</p>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/dashboard/messages">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      View All Messages
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.code}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/20">
                      <Users className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Students</p>
                      <p className="text-xs text-muted-foreground">{course.students} enrolled</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/20">
                      <Calendar className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Next Class</p>
                      <p className="text-xs text-muted-foreground">{course.nextClass}</p>
                      <p className="text-xs text-muted-foreground">{course.location}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" className="flex-1">
                      <Link href={`/dashboard/courses/${course.id}`}>View</Link>
                    </Button>
                    <Button asChild className="flex-1">
                      <Link href={`/dashboard/courses/${course.id}/manage`}>Manage</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Assignments</CardTitle>
              <CardDescription>Assignments that need grading</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {pendingAssignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/20">
                        <FileText className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">{assignment.title}</p>
                        <p className="text-sm text-muted-foreground">{assignment.course}</p>
                        <p className="text-sm text-muted-foreground">Due: {assignment.dueDate}</p>
                        <p className="text-sm text-muted-foreground">
                          Submissions: {assignment.submissions}/{assignment.total}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Grade
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Create New Assignment</CardTitle>
              <CardDescription>Add a new assignment to your courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                    <FileText className="h-8 w-8 mb-2" />
                    <span>Written Assignment</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                    <CheckCircle className="h-8 w-8 mb-2" />
                    <span>Quiz/Exam</span>
                  </Button>
                </div>
                <Button className="w-full">Create New Assignment</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Overview</CardTitle>
              <CardDescription>Students across all your courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Introduction to Psychology (PSY101)</p>
                    <p className="text-sm text-muted-foreground">35 students enrolled</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/dashboard/students?course=PSY101">View Students</Link>
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Advanced Psychology (PSY301)</p>
                    <p className="text-sm text-muted-foreground">22 students enrolled</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/dashboard/students?course=PSY301">View Students</Link>
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Research Methods in Psychology (PSY201)</p>
                    <p className="text-sm text-muted-foreground">28 students enrolled</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/dashboard/students?course=PSY201">View Students</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Student Performance</CardTitle>
              <CardDescription>Overall performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Average Attendance</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <Progress value={92} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Average Assignment Completion</span>
                    <span className="font-medium">88%</span>
                  </div>
                  <Progress value={88} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Average Grade</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} />
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/reports">View Detailed Reports</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
