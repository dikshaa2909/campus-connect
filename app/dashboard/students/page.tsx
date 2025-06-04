"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Download, Filter, Mail, Plus, Search, SortAsc } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/lib/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function StudentsPage() {
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const courseParam = searchParams.get("course")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for students
  const allStudents = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      studentId: "S12345",
      department: "Computer Science",
      year: "Junior",
      gpa: "3.8",
      avatar: "/placeholder.svg?height=40&width=40",
      courses: ["PSY101", "MATH201", "CS101"],
    },
    {
      id: "2",
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      studentId: "S12346",
      department: "Psychology",
      year: "Senior",
      gpa: "3.9",
      avatar: "/placeholder.svg?height=40&width=40",
      courses: ["PSY101", "PSY301", "ENG101"],
    },
    {
      id: "3",
      name: "Michael Chen",
      email: "michael.chen@example.com",
      studentId: "S12347",
      department: "Business Administration",
      year: "Sophomore",
      gpa: "3.5",
      avatar: "/placeholder.svg?height=40&width=40",
      courses: ["MATH201", "BUS101", "ECON101"],
    },
    {
      id: "4",
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      studentId: "S12348",
      department: "Chemistry",
      year: "Freshman",
      gpa: "3.7",
      avatar: "/placeholder.svg?height=40&width=40",
      courses: ["CHEM101", "MATH201", "BIO101"],
    },
    {
      id: "5",
      name: "David Rodriguez",
      email: "david.rodriguez@example.com",
      studentId: "S12349",
      department: "Computer Science",
      year: "Senior",
      gpa: "3.6",
      avatar: "/placeholder.svg?height=40&width=40",
      courses: ["CS101", "CS201", "MATH201"],
    },
    {
      id: "6",
      name: "Jessica Lee",
      email: "jessica.lee@example.com",
      studentId: "S12350",
      department: "Psychology",
      year: "Junior",
      gpa: "3.8",
      avatar: "/placeholder.svg?height=40&width=40",
      courses: ["PSY101", "PSY201", "SOC101"],
    },
    {
      id: "7",
      name: "James Wilson",
      email: "james.wilson@example.com",
      studentId: "S12351",
      department: "History",
      year: "Sophomore",
      gpa: "3.4",
      avatar: "/placeholder.svg?height=40&width=40",
      courses: ["HIST101", "ENG101", "POL101"],
    },
    {
      id: "8",
      name: "Olivia Martinez",
      email: "olivia.martinez@example.com",
      studentId: "S12352",
      department: "Chemistry",
      year: "Senior",
      gpa: "3.9",
      avatar: "/placeholder.svg?height=40&width=40",
      courses: ["CHEM101", "CHEM201", "BIO101"],
    },
  ]

  // Filter students based on course parameter and search query
  const filteredStudents = allStudents.filter((student) => {
    const matchesCourse = courseParam ? student.courses.includes(courseParam) : true
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.department.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCourse && matchesSearch
  })

  // Get course name from course code
  const getCourseNameFromCode = (code: string) => {
    switch (code) {
      case "PSY101":
        return "Introduction to Psychology"
      case "PSY201":
        return "Research Methods in Psychology"
      case "PSY301":
        return "Advanced Psychology"
      case "MATH201":
        return "Calculus II"
      case "CS101":
        return "Introduction to Computer Science"
      case "CS201":
        return "Data Structures and Algorithms"
      case "CHEM101":
        return "Chemistry 101"
      case "BIO101":
        return "Biology 101"
      case "ENG101":
        return "English Composition"
      case "BUS101":
        return "Introduction to Business"
      case "ECON101":
        return "Principles of Economics"
      case "HIST101":
        return "World History"
      case "SOC101":
        return "Introduction to Sociology"
      case "POL101":
        return "Political Science"
      default:
        return code
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Students</h2>
          <p className="text-muted-foreground">
            {courseParam
              ? `Students enrolled in ${getCourseNameFromCode(courseParam)}`
              : "View and manage students across all courses"}
          </p>
        </div>
        {user?.role === "admin" && (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search students..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
          <span className="sr-only">Filter</span>
        </Button>
        <Button variant="outline" size="icon">
          <SortAsc className="h-4 w-4" />
          <span className="sr-only">Sort</span>
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Students</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{courseParam ? `${getCourseNameFromCode(courseParam)} - Students` : "All Students"}</CardTitle>
              <CardDescription>{filteredStudents.length} students found</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredStudents.length === 0 ? (
                <div className="flex h-[200px] w-full flex-col items-center justify-center rounded-md border border-dashed">
                  <p className="text-center text-sm text-muted-foreground">
                    No students found. Try adjusting your search criteria.
                  </p>
                </div>
              ) : (
                <div className="rounded-md border">
                  <div className="grid grid-cols-7 gap-4 p-4 font-medium">
                    <div className="col-span-2">Student</div>
                    <div>ID</div>
                    <div>Department</div>
                    <div>Year</div>
                    <div>GPA</div>
                    <div className="text-right">Actions</div>
                  </div>
                  <div className="divide-y">
                    {filteredStudents.map((student) => (
                      <div key={student.id} className="grid grid-cols-7 gap-4 p-4">
                        <div className="col-span-2 flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                            <AvatarFallback>
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-muted-foreground">{student.email}</div>
                          </div>
                        </div>
                        <div className="self-center">{student.studentId}</div>
                        <div className="self-center">{student.department}</div>
                        <div className="self-center">{student.year}</div>
                        <div className="self-center">{student.gpa}</div>
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`mailto:${student.email}`}>
                              <Mail className="h-4 w-4" />
                              <span className="sr-only">Email</span>
                            </Link>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                Actions
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/students/${student.id}`}>View Profile</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/students/${student.id}/grades`}>View Grades</Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/students/${student.id}/assignments`}>Assignments</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/students/${student.id}/attendance`}>Attendance</Link>
                              </DropdownMenuItem>
                              {user?.role === "admin" && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem asChild>
                                    <Link href={`/dashboard/students/${student.id}/edit`}>Edit</Link>
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Students</CardTitle>
              <CardDescription>Students currently active in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-7 gap-4 p-4 font-medium">
                  <div className="col-span-2">Student</div>
                  <div>ID</div>
                  <div>Department</div>
                  <div>Year</div>
                  <div>Status</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {filteredStudents.slice(0, 6).map((student) => (
                    <div key={student.id} className="grid grid-cols-7 gap-4 p-4">
                      <div className="col-span-2 flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                          <AvatarFallback>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-muted-foreground">{student.email}</div>
                        </div>
                      </div>
                      <div className="self-center">{student.studentId}</div>
                      <div className="self-center">{student.department}</div>
                      <div className="self-center">{student.year}</div>
                      <div className="self-center">
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          Active
                        </Badge>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/students/${student.id}`}>View</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="inactive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inactive Students</CardTitle>
              <CardDescription>Students who are currently inactive</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[200px] w-full flex-col items-center justify-center rounded-md border border-dashed">
                <p className="text-center text-sm text-muted-foreground">No inactive students found.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
