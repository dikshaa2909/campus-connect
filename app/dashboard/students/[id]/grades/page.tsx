// Create a new dedicated grades page with more detailed information

"use client"

import Link from "next/link"
import { ArrowLeft, Download, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/lib/auth-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StudentGradesPage({ params }: { params: { id: string } }) {
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
    studentId: params.id === "1" ? "S12345" : params.id === "2" ? "S12346" : "S12347",
    department: params.id === "1" ? "Computer Science" : params.id === "2" ? "Psychology" : "Business Administration",
    year: params.id === "1" ? "Junior" : params.id === "2" ? "Senior" : "Sophomore",
    gpa: params.id === "1" ? "3.8" : params.id === "2" ? "3.9" : "3.5",
    avatar: "/placeholder.svg?height=128&width=128",
  }

  // Mock data for courses
  const currentCourses = [
    {
      id: "1",
      code: "PSY101",
      title: "Introduction to Psychology",
      instructor: "Dr. Sarah Johnson",
      grade: "A",
      progress: 75,
      credits: 3,
    },
    {
      id: "2",
      code: "MATH201",
      title: "Calculus II",
      instructor: "Prof. Michael Chen",
      grade: "B+",
      progress: 60,
      credits: 4,
    },
    {
      id: "3",
      code: "CS101",
      title: "Introduction to Computer Science",
      instructor: "Dr. James Wilson",
      grade: "A-",
      progress: 80,
      credits: 3,
    },
  ]

  // Mock data for past courses
  const pastCourses = [
    {
      id: "4",
      code: "ENG101",
      title: "English Composition",
      instructor: "Prof. Lisa Brown",
      grade: "A-",
      term: "Fall 2024",
      credits: 3,
    },
    {
      id: "5",
      code: "MATH101",
      title: "Calculus I",
      instructor: "Prof. Michael Chen",
      grade: "A",
      term: "Fall 2024",
      credits: 4,
    },
    {
      id: "6",
      code: "SOC101",
      title: "Introduction to Sociology",
      instructor: "Dr. Emily Davis",
      grade: "B+",
      term: "Fall 2024",
      credits: 3,
    },
    {
      id: "7",
      code: "HIST101",
      title: "World History",
      instructor: "Prof. Robert Williams",
      grade: "B",
      term: "Fall 2024",
      credits: 3,
    },
  ]

  // Mock data for assignments
  const assignments = [
    {
      id: "1",
      title: "Research Paper",
      course: "Introduction to Psychology",
      courseCode: "PSY101",
      dueDate: "Apr 15, 2025",
      score: 92,
      maxScore: 100,
      classAverage: 85,
      feedback: "Excellent analysis of the psychological theories. Well-structured and thoroughly researched.",
    },
    {
      id: "2",
      title: "Problem Set 3",
      course: "Calculus II",
      courseCode: "MATH201",
      dueDate: "Apr 12, 2025",
      score: 88,
      maxScore: 100,
      classAverage: 82,
      feedback: "Good work on integration techniques. Pay attention to substitution methods in problems 7-9.",
    },
    {
      id: "3",
      title: "Midterm Exam",
      course: "Introduction to Psychology",
      courseCode: "PSY101",
      dueDate: "Mar 25, 2025",
      score: 90,
      maxScore: 100,
      classAverage: 78,
      feedback: "Strong understanding of core concepts. Could improve on application questions.",
    },
    {
      id: "4",
      title: "Programming Project",
      course: "Introduction to Computer Science",
      courseCode: "CS101",
      dueDate: "Mar 18, 2025",
      score: 95,
      maxScore: 100,
      classAverage: 82,
      feedback: "Excellent implementation of data structures. Code is well-organized and efficient.",
    },
  ]

  // Calculate GPA data
  const calculateGPA = () => {
    const allCourses = [...currentCourses, ...pastCourses]
    let totalPoints = 0
    let totalCredits = 0

    const gradePoints: Record<string, number> = {
      A: 4.0,
      "A-": 3.7,
      "B+": 3.3,
      B: 3.0,
      "B-": 2.7,
      "C+": 2.3,
      C: 2.0,
      "C-": 1.7,
      "D+": 1.3,
      D: 1.0,
      "D-": 0.7,
      F: 0.0,
    }

    allCourses.forEach((course) => {
      totalPoints += gradePoints[course.grade] * course.credits
      totalCredits += course.credits
    })

    return {
      gpa: (totalPoints / totalCredits).toFixed(2),
      totalCredits,
      gradeDistribution: {
        A: allCourses.filter((c) => c.grade.startsWith("A")).length,
        B: allCourses.filter((c) => c.grade.startsWith("B")).length,
        C: allCourses.filter((c) => c.grade.startsWith("C")).length,
        D: allCourses.filter((c) => c.grade.startsWith("D")).length,
        F: allCourses.filter((c) => c.grade === "F").length,
      },
    }
  }

  const gpaData = calculateGPA()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter">Academic Record</h2>
          <p className="text-muted-foreground">
            Detailed grade report for {student.name} ({student.studentId})
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/students/${params.id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Student Profile
            </Link>
          </Button>
          <Button asChild>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault()
                alert("Grade report downloaded")
              }}
            >
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Cumulative GPA</CardTitle>
            <CardDescription>Overall academic performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{student.gpa}</div>
            <div className="mt-2 flex items-center text-sm text-muted-foreground">
              <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
              <span>+0.1 from last semester</span>
            </div>
            <div className="mt-4">
              <div className="mb-1 flex items-center justify-between text-sm">
                <span>Academic Standing</span>
                <span className="font-medium">Dean's List</span>
              </div>
              <Progress value={95} className="h-2" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Credits</CardTitle>
            <CardDescription>Progress toward degree</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{gpaData.totalCredits}</div>
            <div className="mt-2 text-sm text-muted-foreground">
              <span>Out of 120 required for graduation</span>
            </div>
            <div className="mt-4">
              <div className="mb-1 flex items-center justify-between text-sm">
                <span>Degree Progress</span>
                <span className="font-medium">{Math.round((gpaData.totalCredits / 120) * 100)}%</span>
              </div>
              <Progress value={(gpaData.totalCredits / 120) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Grade Distribution</CardTitle>
            <CardDescription>Breakdown by letter grade</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>A Range (A, A-)</span>
                  <span className="font-medium">{gpaData.gradeDistribution.A} courses</span>
                </div>
                <Progress
                  value={(gpaData.gradeDistribution.A / (currentCourses.length + pastCourses.length)) * 100}
                  className="h-2 bg-muted"
                  indicatorClassName="bg-green-500"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>B Range (B+, B, B-)</span>
                  <span className="font-medium">{gpaData.gradeDistribution.B} courses</span>
                </div>
                <Progress
                  value={(gpaData.gradeDistribution.B / (currentCourses.length + pastCourses.length)) * 100}
                  className="h-2 bg-muted"
                  indicatorClassName="bg-blue-500"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>C Range or Below</span>
                  <span className="font-medium">
                    {gpaData.gradeDistribution.C + gpaData.gradeDistribution.D + gpaData.gradeDistribution.F} courses
                  </span>
                </div>
                <Progress
                  value={
                    ((gpaData.gradeDistribution.C + gpaData.gradeDistribution.D + gpaData.gradeDistribution.F) /
                      (currentCourses.length + pastCourses.length)) *
                    100
                  }
                  className="h-2 bg-muted"
                  indicatorClassName="bg-yellow-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="current" className="space-y-4">
        <TabsList>
          <TabsTrigger value="current">Current Courses</TabsTrigger>
          <TabsTrigger value="past">Past Courses</TabsTrigger>
          <TabsTrigger value="assignments">Recent Assignments</TabsTrigger>
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
        </TabsList>
        <TabsContent value="current" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Semester Courses</CardTitle>
              <CardDescription>Spring 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-6 gap-4 p-4 font-medium">
                  <div className="col-span-2">Course</div>
                  <div>Code</div>
                  <div>Credits</div>
                  <div>Current Grade</div>
                  <div>Progress</div>
                </div>
                <div className="divide-y">
                  {currentCourses.map((course) => (
                    <div key={course.id} className="grid grid-cols-6 gap-4 p-4">
                      <div className="col-span-2">
                        <div className="font-medium">{course.title}</div>
                        <div className="text-sm text-muted-foreground">{course.instructor}</div>
                      </div>
                      <div className="self-center">{course.code}</div>
                      <div className="self-center">{course.credits}</div>
                      <div className="self-center">
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                          {course.grade}
                        </Badge>
                      </div>
                      <div className="self-center">
                        <div className="flex items-center gap-2">
                          <Progress value={course.progress} className="h-2 w-full max-w-24" />
                          <span className="text-xs">{course.progress}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Current Term GPA: <span className="font-medium">{student.gpa}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Credits This Term:{" "}
                  <span className="font-medium">{currentCourses.reduce((sum, course) => sum + course.credits, 0)}</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="past" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Past Courses</CardTitle>
                  <CardDescription>Academic history by term</CardDescription>
                </div>
                <Select defaultValue="fall2024">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fall2024">Fall 2024</SelectItem>
                    <SelectItem value="spring2024">Spring 2024</SelectItem>
                    <SelectItem value="fall2023">Fall 2023</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 gap-4 p-4 font-medium">
                  <div className="col-span-2">Course</div>
                  <div>Code</div>
                  <div>Credits</div>
                  <div>Final Grade</div>
                </div>
                <div className="divide-y">
                  {pastCourses.map((course) => (
                    <div key={course.id} className="grid grid-cols-5 gap-4 p-4">
                      <div className="col-span-2">
                        <div className="font-medium">{course.title}</div>
                        <div className="text-sm text-muted-foreground">{course.instructor}</div>
                      </div>
                      <div className="self-center">{course.code}</div>
                      <div className="self-center">{course.credits}</div>
                      <div className="self-center">
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                          {course.grade}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Fall 2024 GPA: <span className="font-medium">3.7</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Credits Fall 2024:{" "}
                  <span className="font-medium">{pastCourses.reduce((sum, course) => sum + course.credits, 0)}</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Assignment Performance</CardTitle>
              <CardDescription>Detailed breakdown of graded work</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="rounded-md border p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="font-semibold">{assignment.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {assignment.course} ({assignment.courseCode})
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                          {assignment.score}/{assignment.maxScore}
                        </Badge>
                        <div className="text-xs text-muted-foreground">Due: {assignment.dueDate}</div>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Your Score</span>
                        <span className="font-medium">
                          {assignment.score}/{assignment.maxScore} (
                          {Math.round((assignment.score / assignment.maxScore) * 100)}%)
                        </span>
                      </div>
                      <Progress value={(assignment.score / assignment.maxScore) * 100} className="h-2" />
                      <div className="flex items-center justify-between text-sm">
                        <span>Class Average</span>
                        <span>
                          {assignment.classAverage}/{assignment.maxScore} (
                          {Math.round((assignment.classAverage / assignment.maxScore) * 100)}%)
                        </span>
                      </div>
                      <Progress
                        value={(assignment.classAverage / assignment.maxScore) * 100}
                        className="h-2 bg-muted"
                        indicatorClassName="bg-blue-400"
                      />
                    </div>
                    <div className="mt-4 rounded-md bg-muted p-3">
                      <h4 className="text-sm font-medium mb-1">Instructor Feedback:</h4>
                      <p className="text-sm text-muted-foreground">{assignment.feedback}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="transcript" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Unofficial Transcript</CardTitle>
                  <CardDescription>Complete academic record</CardDescription>
                </div>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-md border p-4">
                  <h3 className="font-semibold mb-2">Student Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Name:</span> {student.name}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">ID:</span> {student.studentId}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Department:</span> {student.department}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Year:</span> {student.year}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Cumulative GPA:</span> {student.gpa}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Total Credits:</span> {gpaData.totalCredits}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Spring 2025 (In Progress)</h3>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 gap-4 p-4 font-medium">
                      <div className="col-span-2">Course</div>
                      <div>Code</div>
                      <div>Credits</div>
                      <div>Grade</div>
                    </div>
                    <div className="divide-y">
                      {currentCourses.map((course) => (
                        <div key={course.id} className="grid grid-cols-5 gap-4 p-4">
                          <div className="col-span-2">
                            <div className="font-medium">{course.title}</div>
                          </div>
                          <div>{course.code}</div>
                          <div>{course.credits}</div>
                          <div>{course.grade} (In Progress)</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-right">
                    Term GPA: {student.gpa} • Credits: {currentCourses.reduce((sum, course) => sum + course.credits, 0)}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Fall 2024</h3>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 gap-4 p-4 font-medium">
                      <div className="col-span-2">Course</div>
                      <div>Code</div>
                      <div>Credits</div>
                      <div>Grade</div>
                    </div>
                    <div className="divide-y">
                      {pastCourses.map((course) => (
                        <div key={course.id} className="grid grid-cols-5 gap-4 p-4">
                          <div className="col-span-2">
                            <div className="font-medium">{course.title}</div>
                          </div>
                          <div>{course.code}</div>
                          <div>{course.credits}</div>
                          <div>{course.grade}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-right">
                    Term GPA: 3.7 • Credits: {pastCourses.reduce((sum, course) => sum + course.credits, 0)}
                  </div>
                </div>

                <div className="rounded-md border p-4 bg-muted/50">
                  <h3 className="font-semibold mb-2">Academic Standing</h3>
                  <p className="text-sm">
                    <span className="font-medium">Current Status:</span> Good Standing
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Honors:</span> Dean's List (Fall 2024, Spring 2025)
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Expected Graduation:</span> May 2026
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
