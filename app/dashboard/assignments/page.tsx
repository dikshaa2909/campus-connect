"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Calendar, CheckCircle, Download, FileText, Filter, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/lib/auth-context"

export default function AssignmentsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for assignments
  const pendingAssignments = [
    {
      id: "1",
      title: "Research Paper",
      course: "Introduction to Psychology",
      courseId: "1",
      dueDate: "Apr 15, 2025",
      status: "pending",
      description: "Write a 10-page research paper on a psychological theory of your choice.",
      points: 100,
    },
    {
      id: "2",
      title: "Problem Set 3",
      course: "Calculus II",
      courseId: "2",
      dueDate: "Apr 12, 2025",
      status: "pending",
      description: "Complete problems 1-20 in Chapter 5 of the textbook.",
      points: 50,
    },
    {
      id: "3",
      title: "Lab Report",
      course: "Chemistry 101",
      courseId: "3",
      dueDate: "Apr 18, 2025",
      status: "pending",
      description: "Write a lab report on the experiment conducted in last week's lab session.",
      points: 75,
    },
  ]

  const completedAssignments = [
    {
      id: "4",
      title: "Essay on Modern Literature",
      course: "World Literature",
      courseId: "4",
      submittedDate: "Apr 5, 2025",
      status: "graded",
      grade: "A",
      score: "92/100",
      feedback: "Excellent analysis of the themes. Your writing is clear and well-structured.",
    },
    {
      id: "5",
      title: "Problem Set 2",
      course: "Calculus II",
      courseId: "2",
      submittedDate: "Apr 2, 2025",
      status: "graded",
      grade: "B+",
      score: "88/100",
      feedback: "Good work overall. Pay attention to the chain rule applications in problems 7 and 9.",
    },
    {
      id: "6",
      title: "Midterm Exam",
      course: "Introduction to Psychology",
      courseId: "1",
      submittedDate: "Mar 25, 2025",
      status: "graded",
      grade: "A-",
      score: "90/100",
      feedback: "Strong understanding of core concepts. Could improve on application questions.",
    },
  ]

  // For faculty view
  const assignmentsToGrade = [
    {
      id: "1",
      title: "Research Paper",
      course: "Introduction to Psychology",
      courseId: "1",
      dueDate: "Apr 15, 2025",
      submissions: 25,
      totalStudents: 35,
      points: 100,
    },
    {
      id: "2",
      title: "Case Study Analysis",
      course: "Advanced Psychology",
      courseId: "2",
      dueDate: "Apr 12, 2025",
      submissions: 18,
      totalStudents: 22,
      points: 75,
    },
    {
      id: "3",
      title: "Experimental Design",
      course: "Research Methods in Psychology",
      courseId: "3",
      dueDate: "Apr 18, 2025",
      submissions: 20,
      totalStudents: 28,
      points: 50,
    },
  ]

  // Filter assignments based on search query
  const filteredPendingAssignments = pendingAssignments.filter(
    (assignment) =>
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.course.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredCompletedAssignments = completedAssignments.filter(
    (assignment) =>
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.course.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredAssignmentsToGrade = assignmentsToGrade.filter(
    (assignment) =>
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.course.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Assignments</h2>
          <p className="text-muted-foreground">
            {user?.role === "student"
              ? "View and submit your assignments."
              : user?.role === "faculty"
                ? "Create and grade assignments for your courses."
                : "Manage assignments across all courses."}
          </p>
        </div>
        {(user?.role === "faculty" || user?.role === "admin") && (
          <Button onClick={() => router.push("/dashboard/assignments/create")}>
            <Plus className="mr-2 h-4 w-4" />
            Create Assignment
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search assignments..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
          <span className="sr-only">Filter</span>
        </Button>
      </div>

      <Tabs defaultValue={user?.role === "faculty" ? "to-grade" : "pending"} className="space-y-4">
        <TabsList>
          {user?.role === "student" && (
            <>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </>
          )}
          {user?.role === "faculty" && (
            <>
              <TabsTrigger value="to-grade">To Grade</TabsTrigger>
              <TabsTrigger value="created">Created</TabsTrigger>
            </>
          )}
          {user?.role === "admin" && (
            <>
              <TabsTrigger value="pending">All Assignments</TabsTrigger>
              <TabsTrigger value="courses">By Course</TabsTrigger>
            </>
          )}
        </TabsList>

        {/* Student View - Pending Assignments */}
        {user?.role === "student" && (
          <TabsContent value="pending" className="space-y-4">
            {filteredPendingAssignments.length === 0 ? (
              <div className="flex h-[400px] w-full flex-col items-center justify-center rounded-md border border-dashed">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <FileText className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">No pending assignments</h3>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  {searchQuery
                    ? "No assignments match your search criteria. Try a different search term."
                    : "You don't have any pending assignments at the moment."}
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredPendingAssignments.map((assignment) => (
                  <Card key={assignment.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{assignment.title}</CardTitle>
                          <CardDescription>{assignment.course}</CardDescription>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                        >
                          Due Soon
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>Due: {assignment.dueDate}</span>
                          </div>
                          <span className="font-medium">{assignment.points} pts</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{assignment.description}</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href={`/dashboard/assignments/${assignment.id}`}>Submit Assignment</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        )}

        {/* Student View - Completed Assignments */}
        {user?.role === "student" && (
          <TabsContent value="completed" className="space-y-4">
            {filteredCompletedAssignments.length === 0 ? (
              <div className="flex h-[400px] w-full flex-col items-center justify-center rounded-md border border-dashed">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <CheckCircle className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">No completed assignments</h3>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  {searchQuery
                    ? "No completed assignments match your search criteria."
                    : "You haven't completed any assignments yet."}
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredCompletedAssignments.map((assignment) => (
                  <Card key={assignment.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{assignment.title}</CardTitle>
                          <CardDescription>{assignment.course}</CardDescription>
                        </div>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          {assignment.grade}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>Submitted: {assignment.submittedDate}</span>
                          </div>
                          <span className="font-medium">{assignment.score}</span>
                        </div>
                        <div className="rounded-md bg-muted p-3">
                          <p className="text-sm font-medium">Feedback:</p>
                          <p className="text-sm text-muted-foreground">{assignment.feedback}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button variant="secondary" className="flex-1" asChild>
                        <Link href={`/dashboard/assignments/${assignment.id}`}>View Details</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        )}

        {/* Faculty View - Assignments to Grade */}
        {user?.role === "faculty" && (
          <TabsContent value="to-grade" className="space-y-4">
            {filteredAssignmentsToGrade.length === 0 ? (
              <div className="flex h-[400px] w-full flex-col items-center justify-center rounded-md border border-dashed">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <FileText className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">No assignments to grade</h3>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  {searchQuery
                    ? "No assignments match your search criteria."
                    : "You don't have any assignments that need grading."}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAssignmentsToGrade.map((assignment) => (
                  <Card key={assignment.id}>
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <CardTitle>{assignment.title}</CardTitle>
                          <CardDescription>{assignment.course}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Due: {assignment.dueDate}</Badge>
                          <Badge variant="outline">{assignment.points} pts</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>
                            Submissions: {assignment.submissions}/{assignment.totalStudents}
                          </span>
                          <span className="font-medium">
                            {Math.round((assignment.submissions / assignment.totalStudents) * 100)}%
                          </span>
                        </div>
                        <Progress value={(assignment.submissions / assignment.totalStudents) * 100} />
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button variant="outline" className="flex-1" asChild>
                        <Link href={`/dashboard/assignments/${assignment.id}/edit`}>
                          <FileText className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </Button>
                      <Button className="flex-1" asChild>
                        <Link href={`/dashboard/assignments/${assignment.id}/grade`}>Grade Submissions</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        )}

        {/* Faculty View - Created Assignments */}
        {user?.role === "faculty" && (
          <TabsContent value="created" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Created Assignments</CardTitle>
                <CardDescription>Manage assignments you've created for your courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-6 gap-4 p-4 font-medium">
                    <div className="col-span-2">Assignment</div>
                    <div>Course</div>
                    <div>Due Date</div>
                    <div>Submissions</div>
                    <div className="text-right">Actions</div>
                  </div>
                  <div className="divide-y">
                    {assignmentsToGrade.map((assignment) => (
                      <div key={assignment.id} className="grid grid-cols-6 gap-4 p-4">
                        <div className="col-span-2">
                          <div className="font-medium">{assignment.title}</div>
                          <div className="text-sm text-muted-foreground">{assignment.points} points</div>
                        </div>
                        <div className="self-center">{assignment.course}</div>
                        <div className="self-center">{assignment.dueDate}</div>
                        <div className="self-center">
                          {assignment.submissions}/{assignment.totalStudents}
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/dashboard/assignments/${assignment.id}/edit`}>Edit</Link>
                          </Button>
                          <Button size="sm" asChild>
                            <Link href={`/dashboard/assignments/${assignment.id}/grade`}>Grade</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href="/dashboard/assignments/create">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Assignment
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        )}

        {/* Admin View */}
        {user?.role === "admin" && (
          <TabsContent value="pending" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Assignments</CardTitle>
                <CardDescription>Overview of all assignments across courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-6 gap-4 p-4 font-medium">
                    <div className="col-span-2">Assignment</div>
                    <div>Course</div>
                    <div>Instructor</div>
                    <div>Due Date</div>
                    <div className="text-right">Actions</div>
                  </div>
                  <div className="divide-y">
                    {[...pendingAssignments, ...completedAssignments].map((assignment) => (
                      <div key={assignment.id} className="grid grid-cols-6 gap-4 p-4">
                        <div className="col-span-2">
                          <div className="font-medium">{assignment.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {assignment.hasOwnProperty("points")
                              ? `${(assignment as any).points} points`
                              : `${(assignment as any).score}`}
                          </div>
                        </div>
                        <div className="self-center">{assignment.course}</div>
                        <div className="self-center">
                          {assignment.course === "Introduction to Psychology"
                            ? "Dr. Sarah Johnson"
                            : assignment.course === "Calculus II"
                              ? "Prof. Michael Chen"
                              : "Dr. Robert Williams"}
                        </div>
                        <div className="self-center">
                          {assignment.hasOwnProperty("dueDate")
                            ? (assignment as any).dueDate
                            : (assignment as any).submittedDate}
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/dashboard/assignments/${assignment.id}`}>View</Link>
                          </Button>
                          <Button size="sm" asChild>
                            <Link href={`/dashboard/assignments/${assignment.id}/edit`}>Edit</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {user?.role === "admin" && (
          <TabsContent value="courses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Assignments by Course</CardTitle>
                <CardDescription>View assignments organized by course</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Introduction to Psychology</h3>
                      <p className="text-sm text-muted-foreground">Dr. Sarah Johnson • 35 students</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/dashboard/courses/1">View Course</Link>
                    </Button>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="rounded-md bg-muted p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Research Paper</p>
                        <p className="text-sm text-muted-foreground">Due: Apr 15, 2025</p>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <Link href="/dashboard/assignments/1">View</Link>
                      </Button>
                    </div>
                    <div className="rounded-md bg-muted p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Midterm Exam</p>
                        <p className="text-sm text-muted-foreground">Completed: Mar 25, 2025</p>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <Link href="/dashboard/assignments/6">View</Link>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Calculus II</h3>
                      <p className="text-sm text-muted-foreground">Prof. Michael Chen • 28 students</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/dashboard/courses/2">View Course</Link>
                    </Button>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="rounded-md bg-muted p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Problem Set 3</p>
                        <p className="text-sm text-muted-foreground">Due: Apr 12, 2025</p>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <Link href="/dashboard/assignments/2">View</Link>
                      </Button>
                    </div>
                    <div className="rounded-md bg-muted p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Problem Set 2</p>
                        <p className="text-sm text-muted-foreground">Completed: Apr 2, 2025</p>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <Link href="/dashboard/assignments/5">View</Link>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Chemistry 101</h3>
                      <p className="text-sm text-muted-foreground">Dr. Robert Williams • 32 students</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/dashboard/courses/3">View Course</Link>
                    </Button>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="rounded-md bg-muted p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Lab Report</p>
                        <p className="text-sm text-muted-foreground">Due: Apr 18, 2025</p>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <Link href="/dashboard/assignments/3">View</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
