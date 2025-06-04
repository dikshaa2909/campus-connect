"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Calendar, Clock, Download, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/lib/auth-context"

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for the course
  const course = {
    id: params.id,
    title: params.id === "1" ? "Introduction to Psychology" : params.id === "2" ? "Calculus II" : "Chemistry 101",
    code: params.id === "1" ? "PSY101" : params.id === "2" ? "MATH201" : "CHEM101",
    instructor:
      params.id === "1" ? "Dr. Sarah Johnson" : params.id === "2" ? "Prof. Michael Chen" : "Dr. Robert Williams",
    department: params.id === "1" ? "Psychology" : params.id === "2" ? "Mathematics" : "Chemistry",
    schedule:
      params.id === "1"
        ? "Mon, Wed, Fri 10:00 AM - 11:30 AM"
        : params.id === "2"
          ? "Tue, Thu 2:00 PM - 3:30 PM"
          : "Mon, Wed 11:00 AM - 12:30 PM",
    location:
      params.id === "1"
        ? "Science Building, Room 302"
        : params.id === "2"
          ? "Science Building, Room 305"
          : "Science Building, Room 310",
    credits: params.id === "1" ? 3 : params.id === "2" ? 4 : 4,
    term: "Spring 2025",
    description:
      params.id === "1"
        ? "An introduction to the scientific study of behavior and mental processes. Topics include research methods, biological bases of behavior, sensation and perception, learning, memory, cognition, development, personality, psychological disorders, and social psychology."
        : params.id === "2"
          ? "A continuation of Calculus I. Topics include techniques of integration, applications of integration, differential equations, parametric equations, polar coordinates, and infinite sequences and series."
          : "An introduction to the fundamental principles of chemistry. Topics include atomic structure, chemical bonding, stoichiometry, states of matter, solutions, chemical reactions, thermodynamics, and equilibrium.",
    progress: params.id === "1" ? 75 : params.id === "2" ? 60 : 80,
    enrollmentCount: params.id === "1" ? 35 : params.id === "2" ? 28 : 32,
    maxEnrollment: params.id === "1" ? 40 : params.id === "2" ? 30 : 35,
  }

  // Mock data for assignments
  const assignments = [
    {
      id: "1",
      title: params.id === "1" ? "Research Paper" : params.id === "2" ? "Problem Set 3" : "Lab Report",
      dueDate: params.id === "1" ? "Apr 15, 2025" : params.id === "2" ? "Apr 12, 2025" : "Apr 18, 2025",
      status: "pending",
      points: params.id === "1" ? 100 : params.id === "2" ? 50 : 75,
    },
    {
      id: "2",
      title: params.id === "1" ? "Midterm Exam" : params.id === "2" ? "Problem Set 2" : "Midterm Exam",
      dueDate: params.id === "1" ? "Mar 25, 2025" : params.id === "2" ? "Apr 2, 2025" : "Mar 20, 2025",
      status: "completed",
      points: params.id === "1" ? 100 : params.id === "2" ? 50 : 100,
      grade: params.id === "1" ? "A-" : params.id === "2" ? "B+" : "B",
    },
  ]

  // Mock data for students
  const students = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      grade: "A",
    },
    {
      id: "2",
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      grade: "B+",
    },
    {
      id: "3",
      name: "Michael Chen",
      email: "michael.chen@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      grade: "A-",
    },
    {
      id: "4",
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      grade: "B",
    },
    {
      id: "5",
      name: "David Rodriguez",
      email: "david.rodriguez@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      grade: "A",
    },
  ]

  // Mock data for resources
  const resources = [
    {
      id: "1",
      title: "Course Syllabus",
      type: "PDF",
      size: "245 KB",
      uploadedDate: "Jan 15, 2025",
    },
    {
      id: "2",
      title: "Lecture Slides - Week 1",
      type: "PPTX",
      size: "3.2 MB",
      uploadedDate: "Jan 20, 2025",
    },
    {
      id: "3",
      title: "Lecture Slides - Week 2",
      type: "PPTX",
      size: "2.8 MB",
      uploadedDate: "Jan 27, 2025",
    },
    {
      id: "4",
      title: "Required Reading - Chapter 1",
      type: "PDF",
      size: "1.5 MB",
      uploadedDate: "Jan 15, 2025",
    },
    {
      id: "5",
      title: "Required Reading - Chapter 2",
      type: "PDF",
      size: "1.8 MB",
      uploadedDate: "Jan 22, 2025",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{course.title}</h2>
          <p className="text-muted-foreground">
            {course.code} • {course.term}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/courses">Back to Courses</Link>
          </Button>
          {(user?.role === "faculty" || user?.role === "admin") && (
            <Button asChild>
              <Link href={`/dashboard/courses/${params.id}/manage`}>Manage Course</Link>
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Course Information</CardTitle>
            <CardDescription>Details about this course</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Instructor</span>
                <span className="text-sm">{course.instructor}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Department</span>
                <span className="text-sm">{course.department}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Credits</span>
                <span className="text-sm">{course.credits}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Term</span>
                <span className="text-sm">{course.term}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{course.schedule}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{course.location}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Enrollment</span>
                <span className="font-medium">
                  {course.enrollmentCount}/{course.maxEnrollment}
                </span>
              </div>
              <Progress value={(course.enrollmentCount / course.maxEnrollment) * 100} />
            </div>

            {user?.role === "student" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Your Progress</span>
                  <span className="font-medium">{course.progress}%</span>
                </div>
                <Progress value={course.progress} />
              </div>
            )}
          </CardContent>
        </Card>

        <div className="md:col-span-5 space-y-6">
          <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              {(user?.role === "faculty" || user?.role === "admin") && (
                <TabsTrigger value="students">Students</TabsTrigger>
              )}
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Course Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{course.description}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assignments
                      .filter((assignment) => assignment.status === "pending")
                      .map((assignment) => (
                        <div key={assignment.id} className="flex items-center justify-between rounded-md border p-4">
                          <div>
                            <h3 className="font-medium">{assignment.title}</h3>
                            <p className="text-sm text-muted-foreground">Due: {assignment.dueDate}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{assignment.points} pts</Badge>
                            <Button size="sm" asChild>
                              <Link href={`/dashboard/assignments/${assignment.id}`}>
                                {user?.role === "student" ? "View" : "Manage"}
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    {assignments.filter((assignment) => assignment.status === "pending").length === 0 && (
                      <div className="rounded-md border border-dashed p-4 text-center">
                        <p className="text-sm text-muted-foreground">No upcoming assignments</p>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="#" onClick={() => setActiveTab("assignments")}>
                      View All Assignments
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="assignments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>All Assignments</CardTitle>
                  <CardDescription>Assignments for this course</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 gap-4 p-4 font-medium">
                      <div className="col-span-2">Assignment</div>
                      <div>Due Date</div>
                      <div>Points</div>
                      <div>Status</div>
                    </div>
                    <div className="divide-y">
                      {assignments.map((assignment) => (
                        <div key={assignment.id} className="grid grid-cols-5 gap-4 p-4">
                          <div className="col-span-2">
                            <div className="font-medium">{assignment.title}</div>
                          </div>
                          <div>{assignment.dueDate}</div>
                          <div>{assignment.points} pts</div>
                          <div>
                            {assignment.status === "pending" ? (
                              <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                                Pending
                              </Badge>
                            ) : (
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                {assignment.grade}
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                {user?.role === "faculty" && (
                  <CardFooter>
                    <Button asChild>
                      <Link href="/dashboard/assignments/create">Create New Assignment</Link>
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>
            <TabsContent value="resources" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Course Resources</CardTitle>
                  <CardDescription>Materials for this course</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 gap-4 p-4 font-medium">
                      <div className="col-span-2">Resource</div>
                      <div>Type</div>
                      <div>Size</div>
                      <div>Uploaded</div>
                    </div>
                    <div className="divide-y">
                      {resources.map((resource) => (
                        <div key={resource.id} className="grid grid-cols-5 gap-4 p-4">
                          <div className="col-span-2 flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <div className="font-medium">{resource.title}</div>
                          </div>
                          <div>{resource.type}</div>
                          <div>{resource.size}</div>
                          <div className="flex items-center justify-between">
                            <span>{resource.uploadedDate}</span>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                {user?.role === "faculty" && (
                  <CardFooter>
                    <Button>Upload Resource</Button>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>
            {(user?.role === "faculty" || user?.role === "admin") && (
              <TabsContent value="students" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Enrolled Students</CardTitle>
                    <CardDescription>{course.enrollmentCount} students enrolled in this course</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-5 gap-4 p-4 font-medium">
                        <div className="col-span-2">Student</div>
                        <div>Email</div>
                        <div>Grade</div>
                        <div className="text-right">Actions</div>
                      </div>
                      <div className="divide-y">
                        {students.map((student) => (
                          <div key={student.id} className="grid grid-cols-5 gap-4 p-4">
                            <div className="col-span-2 flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                                <AvatarFallback>
                                  {student.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="font-medium">{student.name}</div>
                            </div>
                            <div className="self-center">{student.email}</div>
                            <div className="self-center">
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                {student.grade}
                              </Badge>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/dashboard/students/${student.id}`}>View</Link>
                              </Button>
                              <Button size="sm" asChild>
                                <Link href={`/dashboard/students/${student.id}/grades`}>Grades</Link>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" className="flex-1" asChild>
                      <Link href="/dashboard/students">View All Students</Link>
                    </Button>
                    <Button className="flex-1">Export Grades</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  )
}
