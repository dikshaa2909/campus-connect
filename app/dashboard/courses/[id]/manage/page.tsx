"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FileText, Loader2, Plus, Save, Trash, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function CourseManagePage({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

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
    enrollmentCount: params.id === "1" ? 35 : params.id === "2" ? 28 : 32,
    maxEnrollment: params.id === "1" ? 40 : params.id === "2" ? 30 : 35,
  }

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
  ]

  const handleSave = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Course updated",
        description: "Your changes have been saved successfully.",
      })
      setIsSaving(false)
    }, 1500)
  }

  const handleDelete = () => {
    setIsDeleting(true)
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Course deleted",
        description: "The course has been deleted successfully.",
      })
      setIsDeleting(false)
      setShowDeleteDialog(false)
      router.push("/dashboard/courses")
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manage Course</h2>
          <p className="text-muted-foreground">
            {course.title} ({course.code})
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/courses/${params.id}`}>View Course</Link>
          </Button>
          <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete Course
          </Button>
        </div>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Course Details</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Information</CardTitle>
              <CardDescription>Edit the course details</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="title">Course Title</Label>
                    <Input id="title" defaultValue={course.title} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="code">Course Code</Label>
                    <Input id="code" defaultValue={course.code} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select defaultValue={course.department}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Psychology">Psychology</SelectItem>
                        <SelectItem value="Mathematics">Mathematics</SelectItem>
                        <SelectItem value="Chemistry">Chemistry</SelectItem>
                        <SelectItem value="Computer Science">Computer Science</SelectItem>
                        <SelectItem value="Biology">Biology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instructor">Instructor</Label>
                    <Input id="instructor" defaultValue={course.instructor} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="credits">Credits</Label>
                    <Input id="credits" type="number" defaultValue={course.credits} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="term">Term</Label>
                    <Select defaultValue={course.term}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fall 2024">Fall 2024</SelectItem>
                        <SelectItem value="Spring 2025">Spring 2025</SelectItem>
                        <SelectItem value="Summer 2025">Summer 2025</SelectItem>
                        <SelectItem value="Fall 2025">Fall 2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schedule">Schedule</Label>
                    <Input id="schedule" defaultValue={course.schedule} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" defaultValue={course.location} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxEnrollment">Maximum Enrollment</Label>
                    <Input id="maxEnrollment" type="number" defaultValue={course.maxEnrollment} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Course Description</Label>
                  <Textarea id="description" defaultValue={course.description} className="min-h-[150px]" />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Enrolled Students</CardTitle>
              <CardDescription>{course.enrollmentCount} students enrolled in this course</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-6 gap-4 p-4 font-medium">
                  <div className="col-span-2">Student</div>
                  <div>Email</div>
                  <div>Grade</div>
                  <div>Status</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {students.map((student) => (
                    <div key={student.id} className="grid grid-cols-6 gap-4 p-4">
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
                      <div className="self-center">{student.grade}</div>
                      <div className="self-center">
                        <Select defaultValue="enrolled">
                          <SelectTrigger className="h-8 w-28">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="enrolled">Enrolled</SelectItem>
                            <SelectItem value="waitlisted">Waitlisted</SelectItem>
                            <SelectItem value="dropped">Dropped</SelectItem>
                          </SelectContent>
                        </Select>
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
              <Button variant="outline" className="flex-1">
                <Upload className="mr-2 h-4 w-4" />
                Import Students
              </Button>
              <Button className="flex-1">
                <Plus className="mr-2 h-4 w-4" />
                Add Student
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Resources</CardTitle>
              <CardDescription>Manage course materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 gap-4 p-4 font-medium">
                  <div className="col-span-2">Resource</div>
                  <div>Type</div>
                  <div>Size</div>
                  <div className="text-right">Actions</div>
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
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm">
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload Resource
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Assignments</CardTitle>
              <CardDescription>Manage assignments for this course</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[200px] w-full flex-col items-center justify-center rounded-md border border-dashed">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <FileText className="h-10 w-10 text-muted-foreground" />
                  <h3 className="text-lg font-semibold">No assignments created yet</h3>
                  <p className="text-sm text-muted-foreground">Create your first assignment for this course</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/dashboard/assignments/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Assignment
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Course</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this course? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-md border p-4 bg-destructive/10">
            <h3 className="font-semibold">{course.title}</h3>
            <p className="text-sm text-muted-foreground">
              {course.code} • {course.term}
            </p>
            <p className="text-sm text-muted-foreground mt-1">{course.enrollmentCount} students enrolled</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Course"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
