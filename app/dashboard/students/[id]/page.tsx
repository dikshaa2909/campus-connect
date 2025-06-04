"use client"

import Link from "next/link"
import { Calendar, GraduationCap, Mail, Phone, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/lib/auth-context"

export default function StudentDetailPage({ params }: { params: { id: string } }) {
  const { user } = useAuth()

  // Mock data for the student
  const student = {
    id: params.id,
    name: params.id === "1" ? "John Smith" : params.id === "2" ? "Emily Johnson" : "Michael Chen",
    email:
      params.id === "1"
        ? "john.smith@example.com"
        : params.id === "2"
          ? "emily.johnson@example.com"
          : "michael.chen@example.com",
    phone: "+1 (555) 123-4567",
    studentId: params.id === "1" ? "S12345" : params.id === "2" ? "S12346" : "S12347",
    department: params.id === "1" ? "Computer Science" : params.id === "2" ? "Psychology" : "Business Administration",
    year: params.id === "1" ? "Junior" : params.id === "2" ? "Senior" : "Sophomore",
    gpa: params.id === "1" ? "3.8" : params.id === "2" ? "3.9" : "3.5",
    avatar: "/placeholder.svg?height=128&width=128",
    address: "123 Campus Drive, University City, CA 90210",
    dateOfBirth: "January 15, 2000",
    enrollmentDate: "September 1, 2022",
    advisor: "Dr. Robert Williams",
    status: "Active",
  }

  // Mock data for courses
  const courses = [
    {
      id: "1",
      code: "PSY101",
      title: "Introduction to Psychology",
      instructor: "Dr. Sarah Johnson",
      grade: "A",
      progress: 75,
    },
    {
      id: "2",
      code: "MATH201",
      title: "Calculus II",
      instructor: "Prof. Michael Chen",
      grade: "B+",
      progress: 60,
    },
    {
      id: "3",
      code: "CS101",
      title: "Introduction to Computer Science",
      instructor: "Dr. James Wilson",
      grade: "A-",
      progress: 80,
    },
  ]

  // Mock data for assignments
  const assignments = [
    {
      id: "1",
      title: "Research Paper",
      course: "Introduction to Psychology",
      dueDate: "Apr 15, 2025",
      status: "Pending",
    },
    {
      id: "2",
      title: "Problem Set 3",
      course: "Calculus II",
      dueDate: "Apr 12, 2025",
      status: "Pending",
    },
    {
      id: "3",
      title: "Programming Project",
      course: "Introduction to Computer Science",
      dueDate: "Apr 18, 2025",
      status: "Submitted",
      grade: "A",
    },
  ]

  // Mock data for attendance
  const attendance = [
    {
      id: "1",
      course: "Introduction to Psychology",
      date: "Apr 5, 2025",
      status: "Present",
    },
    {
      id: "2",
      course: "Calculus II",
      date: "Apr 4, 2025",
      status: "Present",
    },
    {
      id: "3",
      course: "Introduction to Computer Science",
      date: "Apr 3, 2025",
      status: "Absent",
    },
    {
      id: "4",
      course: "Introduction to Psychology",
      date: "Apr 2, 2025",
      status: "Present",
    },
    {
      id: "5",
      course: "Calculus II",
      date: "Apr 1, 2025",
      status: "Present",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{student.name}</h2>
          <p className="text-muted-foreground">Student ID: {student.studentId}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/students">Back to Students</Link>
          </Button>
          <Button asChild>
            <Link href={`mailto:${student.email}`}>
              <Mail className="mr-2 h-4 w-4" />
              Contact
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Student Profile</CardTitle>
            <CardDescription>Personal and academic information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center gap-2">
              <Avatar className="h-24 w-24">
                <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                <AvatarFallback className="text-2xl">
                  {student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-lg font-semibold">{student.name}</h3>
                <p className="text-sm text-muted-foreground">{student.department}</p>
              </div>
              <Badge className="mt-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                {student.status}
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{student.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{student.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{student.studentId}</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {student.year} • GPA: {student.gpa}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Enrolled: {student.enrollmentDate}</span>
              </div>
            </div>

            <div className="rounded-md border p-3">
              <h4 className="text-sm font-medium mb-2">Academic Advisor</h4>
              <p className="text-sm">{student.advisor}</p>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-5 space-y-6">
          <Tabs defaultValue="courses" className="space-y-4">
            <TabsList>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="grades">Grades</TabsTrigger>
            </TabsList>
            <TabsContent value="courses" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Enrolled Courses</CardTitle>
                  <CardDescription>Courses the student is currently taking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courses.map((course) => (
                      <div key={course.id} className="rounded-md border p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <h3 className="font-semibold">{course.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {course.code} • {course.instructor}
                            </p>
                          </div>
                          <Badge variant="outline">{course.grade}</Badge>
                        </div>
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Course Progress</span>
                            <span className="font-medium">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="assignments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Assignments</CardTitle>
                  <CardDescription>Student's assignment status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-4 gap-4 p-4 font-medium">
                      <div>Assignment</div>
                      <div>Course</div>
                      <div>Due Date</div>
                      <div>Status</div>
                    </div>
                    <div className="divide-y">
                      {assignments.map((assignment) => (
                        <div key={assignment.id} className="grid grid-cols-4 gap-4 p-4">
                          <div className="font-medium">{assignment.title}</div>
                          <div>{assignment.course}</div>
                          <div>{assignment.dueDate}</div>
                          <div>
                            <Badge
                              className={
                                assignment.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                  : assignment.status === "Submitted"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                    : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              }
                            >
                              {assignment.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="attendance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Record</CardTitle>
                  <CardDescription>Student's attendance history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-3 gap-4 p-4 font-medium">
                      <div>Course</div>
                      <div>Date</div>
                      <div>Status</div>
                    </div>
                    <div className="divide-y">
                      {attendance.map((record) => (
                        <div key={record.id} className="grid grid-cols-3 gap-4 p-4">
                          <div>{record.course}</div>
                          <div>{record.date}</div>
                          <div>
                            <Badge
                              className={
                                record.status === "Present"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                              }
                            >
                              {record.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="grades" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Grade Summary</CardTitle>
                  <CardDescription>Current academic performance overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="rounded-md border p-4">
                        <h3 className="font-semibold mb-2">Current GPA</h3>
                        <div className="flex items-center gap-2">
                          <div className="text-3xl font-bold">{student.gpa}</div>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                            Good Standing
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">Top 15% of class</p>
                      </div>
                      <div className="rounded-md border p-4">
                        <h3 className="font-semibold mb-2">Credits Completed</h3>
                        <div className="text-3xl font-bold">42</div>
                        <p className="text-sm text-muted-foreground mt-2">Out of 120 required</p>
                      </div>
                      <div className="rounded-md border p-4">
                        <h3 className="font-semibold mb-2">Academic Standing</h3>
                        <div className="text-xl font-medium">Dean's List</div>
                        <p className="text-sm text-muted-foreground mt-2">Last 2 semesters</p>
                      </div>
                    </div>

                    <div className="rounded-md border">
                      <div className="grid grid-cols-5 gap-4 p-4 font-medium">
                        <div className="col-span-2">Course</div>
                        <div>Term</div>
                        <div>Credits</div>
                        <div>Grade</div>
                      </div>
                      <div className="divide-y">
                        {courses.map((course) => (
                          <div key={course.id} className="grid grid-cols-5 gap-4 p-4">
                            <div className="col-span-2">
                              <div className="font-medium">{course.title}</div>
                              <div className="text-sm text-muted-foreground">{course.code}</div>
                            </div>
                            <div>Spring 2025</div>
                            <div>{course.id === "2" ? "4" : "3"}</div>
                            <div>
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                                {course.grade}
                              </Badge>
                            </div>
                          </div>
                        ))}
                        <div key="past-1" className="grid grid-cols-5 gap-4 p-4">
                          <div className="col-span-2">
                            <div className="font-medium">English Composition</div>
                            <div className="text-sm text-muted-foreground">ENG101</div>
                          </div>
                          <div>Fall 2024</div>
                          <div>3</div>
                          <div>
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                              A-
                            </Badge>
                          </div>
                        </div>
                        <div key="past-2" className="grid grid-cols-5 gap-4 p-4">
                          <div className="col-span-2">
                            <div className="font-medium">Introduction to Sociology</div>
                            <div className="text-sm text-muted-foreground">SOC101</div>
                          </div>
                          <div>Fall 2024</div>
                          <div>3</div>
                          <div>
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                              B+
                            </Badge>
                          </div>
                        </div>
                        <div key="past-3" className="grid grid-cols-5 gap-4 p-4">
                          <div className="col-span-2">
                            <div className="font-medium">Calculus I</div>
                            <div className="text-sm text-muted-foreground">MATH101</div>
                          </div>
                          <div>Fall 2024</div>
                          <div>4</div>
                          <div>
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                              A
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Grade Distribution</CardTitle>
                    <CardDescription>Breakdown of grades by letter grade</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">A Range (A, A-)</span>
                          <span className="text-sm font-medium">4 courses</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-full w-[57%] rounded-full bg-green-500"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">B Range (B+, B, B-)</span>
                          <span className="text-sm font-medium">3 courses</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-full w-[43%] rounded-full bg-blue-500"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">C Range (C+, C, C-)</span>
                          <span className="text-sm font-medium">0 courses</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-full w-[0%] rounded-full bg-yellow-500"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">D Range or Below</span>
                          <span className="text-sm font-medium">0 courses</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-full w-[0%] rounded-full bg-red-500"></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>GPA Trend</CardTitle>
                    <CardDescription>GPA progression by semester</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[220px] w-full">
                      <div className="flex h-full flex-col justify-between">
                        <div className="grid grid-cols-3 gap-4 pb-6">
                          <div className="space-y-1.5">
                            <div className="h-20 w-full rounded-t-md bg-primary/20 relative">
                              <div className="absolute bottom-0 left-0 right-0 h-[70%] rounded-t-md bg-primary"></div>
                            </div>
                            <div className="text-center text-sm">Fall 2024</div>
                            <div className="text-center text-xs text-muted-foreground">3.7 GPA</div>
                          </div>
                          <div className="space-y-1.5">
                            <div className="h-20 w-full rounded-t-md bg-primary/20 relative">
                              <div className="absolute bottom-0 left-0 right-0 h-[76%] rounded-t-md bg-primary"></div>
                            </div>
                            <div className="text-center text-sm">Spring 2025</div>
                            <div className="text-center text-xs text-muted-foreground">3.8 GPA</div>
                          </div>
                          <div className="space-y-1.5">
                            <div className="h-20 w-full rounded-t-md bg-primary/20 relative">
                              <div className="absolute bottom-0 left-0 right-0 h-[80%] rounded-t-md bg-primary"></div>
                            </div>
                            <div className="text-center text-sm">Current</div>
                            <div className="text-center text-xs text-muted-foreground">{student.gpa} GPA</div>
                          </div>
                        </div>
                        <div className="rounded-md border p-3 bg-muted/50">
                          <h4 className="text-sm font-medium mb-1">Academic Advisor Note:</h4>
                          <p className="text-xs text-muted-foreground">
                            {student.name} has shown consistent improvement in academic performance. Recommend
                            continuing with current course load and considering honors program application.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Assignment Performance</CardTitle>
                  <CardDescription>Detailed breakdown of recent assignments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-6 gap-4 p-4 font-medium">
                      <div className="col-span-2">Assignment</div>
                      <div>Course</div>
                      <div>Due Date</div>
                      <div>Score</div>
                      <div>Class Average</div>
                    </div>
                    <div className="divide-y">
                      <div className="grid grid-cols-6 gap-4 p-4">
                        <div className="col-span-2">
                          <div className="font-medium">Research Paper</div>
                          <div className="text-sm text-muted-foreground">Final submission</div>
                        </div>
                        <div>Introduction to Psychology</div>
                        <div>Apr 15, 2025</div>
                        <div className="font-medium">92/100</div>
                        <div className="text-sm text-muted-foreground">85/100</div>
                      </div>
                      <div className="grid grid-cols-6 gap-4 p-4">
                        <div className="col-span-2">
                          <div className="font-medium">Problem Set 3</div>
                          <div className="text-sm text-muted-foreground">Integration techniques</div>
                        </div>
                        <div>Calculus II</div>
                        <div>Apr 12, 2025</div>
                        <div className="font-medium">88/100</div>
                        <div className="text-sm text-muted-foreground">82/100</div>
                      </div>
                      <div className="grid grid-cols-6 gap-4 p-4">
                        <div className="col-span-2">
                          <div className="font-medium">Midterm Exam</div>
                          <div className="text-sm text-muted-foreground">Chapters 1-5</div>
                        </div>
                        <div>Introduction to Psychology</div>
                        <div>Mar 25, 2025</div>
                        <div className="font-medium">90/100</div>
                        <div className="text-sm text-muted-foreground">78/100</div>
                      </div>
                      <div className="grid grid-cols-6 gap-4 p-4">
                        <div className="col-span-2">
                          <div className="font-medium">Programming Project</div>
                          <div className="text-sm text-muted-foreground">Data structures implementation</div>
                        </div>
                        <div>Introduction to Computer Science</div>
                        <div>Mar 18, 2025</div>
                        <div className="font-medium">95/100</div>
                        <div className="text-sm text-muted-foreground">82/100</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
