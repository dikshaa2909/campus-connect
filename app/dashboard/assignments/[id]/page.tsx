"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Calendar, Download, FileText, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-context"

export default function AssignmentDetailPage({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [comment, setComment] = useState("")

  // Mock data for the assignment
  const assignment = {
    id: params.id,
    title: params.id === "1" ? "Research Paper" : params.id === "2" ? "Problem Set 3" : "Lab Report",
    course: params.id === "1" ? "Introduction to Psychology" : params.id === "2" ? "Calculus II" : "Chemistry 101",
    courseId: params.id === "1" ? "1" : params.id === "2" ? "2" : "3",
    dueDate: params.id === "1" ? "Apr 15, 2025" : params.id === "2" ? "Apr 12, 2025" : "Apr 18, 2025",
    status: "pending",
    description:
      params.id === "1"
        ? "Write a 10-page research paper on a psychological theory of your choice. Your paper should include an introduction, literature review, methodology, results, discussion, and conclusion. Use APA formatting and include at least 8 scholarly sources."
        : params.id === "2"
          ? "Complete problems 1-20 in Chapter 5 of the textbook. Show all your work and explain your reasoning for each step. Submit your solutions as a single PDF document."
          : "Write a lab report on the experiment conducted in last week's lab session. Include an introduction, materials and methods, results, discussion, and conclusion. Your report should be 5-7 pages in length.",
    instructions:
      params.id === "1"
        ? "1. Choose a psychological theory that interests you.\n2. Research the theory using scholarly sources.\n3. Write a 10-page paper following APA guidelines.\n4. Include a title page, abstract, and references page (not counted in the 10-page limit).\n5. Submit your paper as a PDF document."
        : params.id === "2"
          ? "1. Complete all problems in Chapter 5, problems 1-20.\n2. Show all your work for each problem.\n3. Explain your reasoning for each step.\n4. Submit your solutions as a single PDF document."
          : "1. Follow the lab report format discussed in class.\n2. Include all required sections: introduction, materials and methods, results, discussion, and conclusion.\n3. Include any relevant graphs or tables.\n4. Cite all sources using APA format.\n5. Submit your report as a PDF document.",
    points: params.id === "1" ? 100 : params.id === "2" ? 50 : 75,
    instructor:
      params.id === "1" ? "Dr. Sarah Johnson" : params.id === "2" ? "Prof. Michael Chen" : "Dr. Robert Williams",
  }

  // For completed assignments
  const completedAssignment = {
    id: params.id,
    title: params.id === "4" ? "Essay on Modern Literature" : params.id === "5" ? "Problem Set 2" : "Midterm Exam",
    course: params.id === "4" ? "World Literature" : params.id === "5" ? "Calculus II" : "Introduction to Psychology",
    courseId: params.id === "4" ? "4" : params.id === "5" ? "2" : "1",
    submittedDate: params.id === "4" ? "Apr 5, 2025" : params.id === "5" ? "Apr 2, 2025" : "Mar 25, 2025",
    status: "graded",
    grade: params.id === "4" ? "A" : params.id === "5" ? "B+" : "A-",
    score: params.id === "4" ? "92/100" : params.id === "5" ? "88/100" : "90/100",
    feedback:
      params.id === "4"
        ? "Excellent analysis of the themes. Your writing is clear and well-structured."
        : params.id === "5"
          ? "Good work overall. Pay attention to the chain rule applications in problems 7 and 9."
          : "Strong understanding of core concepts. Could improve on application questions.",
    submissionFile: "submission.pdf",
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Assignment submitted",
        description: "Your assignment has been submitted successfully.",
      })
      setIsSubmitting(false)
      router.push("/dashboard/assignments")
    }, 1500)
  }

  const isCompleted = ["4", "5", "6"].includes(params.id)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {isCompleted ? completedAssignment.title : assignment.title}
          </h2>
          <p className="text-muted-foreground">{isCompleted ? completedAssignment.course : assignment.course}</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/dashboard/assignments">Back to Assignments</Link>
        </Button>
      </div>

      {isCompleted ? (
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Completed Assignment</CardTitle>
                <CardDescription>Submitted on {completedAssignment.submittedDate}</CardDescription>
              </div>
              <Badge className="w-fit bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                {completedAssignment.grade} ({completedAssignment.score})
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-md border p-4">
              <h3 className="font-semibold mb-2">Your Submission</h3>
              <div className="flex items-center gap-2 p-3 rounded-md bg-muted">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span>{completedAssignment.submissionFile}</span>
                <Button variant="ghost" size="sm" className="ml-auto">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>

            <div className="rounded-md border p-4">
              <h3 className="font-semibold mb-2">Instructor Feedback</h3>
              <div className="p-3 rounded-md bg-muted">
                <p>{completedAssignment.feedback}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-md border p-4">
                <h3 className="font-semibold mb-2">Grade</h3>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    {completedAssignment.grade}
                  </Badge>
                  <span className="text-muted-foreground">{completedAssignment.score}</span>
                </div>
              </div>
              <div className="rounded-md border p-4">
                <h3 className="font-semibold mb-2">Submission Date</h3>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{completedAssignment.submittedDate}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="outline" className="flex-1" asChild>
              <Link href={`/dashboard/courses/${completedAssignment.courseId}`}>View Course</Link>
            </Button>
            <Button className="flex-1">Resubmit Assignment</Button>
          </CardFooter>
        </Card>
      ) : (
        <Tabs defaultValue="details" className="space-y-4">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="submit">Submit</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>Assignment Details</CardTitle>
                    <CardDescription>Due on {assignment.dueDate}</CardDescription>
                  </div>
                  <Badge variant="outline" className="w-fit">
                    {assignment.points} points
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{assignment.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Instructions</h3>
                  <div className="p-4 rounded-md bg-muted">
                    {assignment.instructions.split("\n").map((line, index) => (
                      <p key={index} className="mb-2">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-md border p-4">
                    <h3 className="font-semibold mb-2">Due Date</h3>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{assignment.dueDate}</span>
                    </div>
                  </div>
                  <div className="rounded-md border p-4">
                    <h3 className="font-semibold mb-2">Instructor</h3>
                    <div className="flex items-center gap-2">
                      <span>{assignment.instructor}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href="#submit" onClick={() => document.querySelector('[data-value="submit"]')?.click()}>
                    Submit Assignment
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="submit" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Submit Assignment</CardTitle>
                <CardDescription>Upload your completed assignment for {assignment.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="font-medium">Upload File</label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">PDF, DOCX, or ZIP (MAX. 10MB)</p>
                        </div>
                        <Input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          onChange={(e) => setFile(e.target.files?.[0] || null)}
                        />
                      </label>
                    </div>
                    {file && (
                      <div className="flex items-center gap-2 p-2 rounded-md bg-muted mt-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{file.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="ml-auto"
                          onClick={() => setFile(null)}
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="font-medium">Comments (Optional)</label>
                    <Textarea
                      placeholder="Add any comments for your instructor"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="rounded-md bg-muted p-4">
                    <h4 className="font-medium mb-2">Submission Checklist</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Your file is in the correct format (PDF, DOCX, or ZIP)</li>
                      <li>Your file size is under 10MB</li>
                      <li>You have included your name and student ID in the document</li>
                      <li>You have followed all assignment instructions</li>
                    </ul>
                  </div>

                  <Button type="submit" className="w-full" disabled={!file || isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      "Submit Assignment"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
