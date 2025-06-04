"use client"

import { useAuth } from "@/lib/auth-context"
import { StudentDashboard } from "@/components/dashboard/student-dashboard"
import { FacultyDashboard } from "@/components/dashboard/faculty-dashboard"
import { AdminDashboard } from "@/components/dashboard/admin-dashboard"
import { DebugAuth } from "@/components/debug-auth"

export default function DashboardPage() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Authentication Error</h2>
        <p className="mb-4">You are not authenticated. Please log in to access the dashboard.</p>
        <DebugAuth />
      </div>
    )
  }

  // Render different dashboard based on user role
  let DashboardComponent
  switch (user.role) {
    case "student":
      DashboardComponent = <StudentDashboard />
      break
    case "faculty":
      DashboardComponent = <FacultyDashboard />
      break
    case "admin":
      DashboardComponent = <AdminDashboard />
      break
    default:
      DashboardComponent = <StudentDashboard />
  }

  return (
    <>
      {DashboardComponent}
      {process.env.NODE_ENV !== "production" && (
        <div className="mt-8">
          <DebugAuth />
        </div>
      )}
    </>
  )
}
