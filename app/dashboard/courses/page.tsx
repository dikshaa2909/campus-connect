"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, Calendar, Clock, Filter, Plus, Search, SortAsc } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth-context"

export default function CoursesPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for courses
  const activeCourses = [
    {
      id: "1",
      title: "Introduction to Psychology",
      code: "PSY101",
      instructor: "Dr. Sarah Johnson",
      department: "Psychology",
      schedule: "Mon, Wed, Fri 10:00 AM - 11:30 AM",
      location: "Science Building, Room 302",
      progress: 75,
      credits: 3,
    },
    {
      id: "2",
      title: "Calculus II",
      code: "MATH201",
      instructor: "Prof. Michael Chen",
      department: "Mathematics",
      schedule: "Tue, Thu 2:00 PM - 3:30 PM",
      location: "Science Building, Room 305",
      progress: 60,
      credits: 4,
    },
    {
      id: "3",
      title: "Chemistry 101",
      code: "CHEM101",
      instructor: "Dr. Robert Williams",
      department: "Chemistry",
      schedule: "Mon, Wed 11:00 AM - 12:30 PM",
      location: "Science Building, Room 310",
      progress: 80,
      credits: 4,
    },
    {
      id: "4",
      title: "World History",
      code: "HIST101",
      instructor: "Prof. Emily Davis",
      department: "History",
      schedule: "Thu, Fri 9:00 AM - 10:30 AM",
      location: "Humanities Building, Room 205",
      progress: 50,
      credits: 3,
    },
  ]

  const pastCourses = [
    {
      id: "5",
      title: "Introduction to Computer Science",
      code: "CS101",
      instructor: "Dr. James Wilson",
      department: "Computer Science",
      term: "Fall 2024",
      grade: "A",
      credits: 3,
    },
    {
      id: "6",
      title: "English Composition",
      code: "ENG101",
      instructor: "Prof. Lisa Brown",
      department: "English",
      term: "Fall 2024",
      grade: "A-",
      credits: 3,
    },
    {
      id: "7",
      title: "Introduction to Psychology",
      code: "PSY101",
      instructor: "Dr. Sarah Johnson",
      department: "Psychology",
      term: "Fall 2024",
      grade: "B+",
      credits: 3,
    },
  ]

  // Filter courses based on search query
  const filteredActiveCourses = activeCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredPastCourses = pastCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Courses</h2>
          <p className="text-muted-foreground">
            {user?.role === "student"
              ? "View and manage your enrolled courses."
              : user?.role === "faculty"
                ? "View and manage your teaching courses."
                : "Manage all courses in the system."}
          </p>
        </div>
        {(user?.role === "faculty" || user?.role === "admin") && (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {user?.role === "faculty" ? "Create Course" : "Add Course"}
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search courses..."
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
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Courses</TabsTrigger>
          <TabsTrigger value="past">Past Courses</TabsTrigger>
          {user?.role === "admin" && <TabsTrigger value="all">All Courses</TabsTrigger>}
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {filteredActiveCourses.length === 0 ? (
            <div className="flex h-[400px] w-full flex-col items-center justify-center rounded-md border border-dashed">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <BookOpen className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No courses found</h3>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                {searchQuery
                  ? "No courses match your search criteria. Try a different search term."
                  : "You are not enrolled in any active courses."}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredActiveCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>
                      {course.code} • {course.credits} credits
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Course Progress</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span>{course.instructor}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{course.schedule}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{course.location}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-3">
                    <Button asChild className="w-full">
                      <Link href={`/dashboard/courses/${course.id}`}>
                        {user?.role === "student" ? "View Course" : "Manage Course"}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {filteredPastCourses.length === 0 ? (
            <div className="flex h-[400px] w-full flex-col items-center justify-center rounded-md border border-dashed">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <BookOpen className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No past courses found</h3>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                {searchQuery
                  ? "No past courses match your search criteria. Try a different search term."
                  : "You don't have any past courses."}
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <div className="grid grid-cols-5 gap-4 p-4 font-medium">
                <div>Course</div>
                <div>Instructor</div>
                <div>Department</div>
                <div>Term</div>
                <div className="text-right">Grade</div>
              </div>
              <div className="divide-y">
                {filteredPastCourses.map((course) => (
                  <div key={course.id} className="grid grid-cols-5 gap-4 p-4">
                    <div>
                      <div className="font-medium">{course.title}</div>
                      <div className="text-sm text-muted-foreground">{course.code}</div>
                    </div>
                    <div className="self-center">{course.instructor}</div>
                    <div className="self-center">{course.department}</div>
                    <div className="self-center">{course.term}</div>
                    <div className="self-center text-right">
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-600 dark:bg-green-900/20 dark:text-green-400">
                        {course.grade}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        {user?.role === "admin" && (
          <TabsContent value="all" className="space-y-4">
            <div className="rounded-md border">
              <div className="grid grid-cols-5 gap-4 p-4 font-medium">
                <div>Course</div>
                <div>Instructor</div>
                <div>Department</div>
                <div>Students</div>
                <div className="text-right">Actions</div>
              </div>
              <div className="divide-y">
                {[...filteredActiveCourses].map((course) => (
                  <div key={course.id} className="grid grid-cols-5 gap-4 p-4">
                    <div>
                      <div className="font-medium">{course.title}</div>
                      <div className="text-sm text-muted-foreground">{course.code}</div>
                    </div>
                    <div className="self-center">{course.instructor}</div>
                    <div className="self-center">{course.department}</div>
                    <div className="self-center">{Math.floor(Math.random() * 30) + 10} students</div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/courses/${course.id}`}>View</Link>
                      </Button>
                      <Button size="sm" asChild>
                        <Link href={`/dashboard/courses/${course.id}/edit`}>Edit</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
