"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { BookOpen, Building, FileText, GraduationCap, LayoutDashboard, Settings, TrendingUp, Users } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

export function AdminDashboard() {
  const { user, signOut } = useAuth()
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => setProgress(85), 500)
    return () => clearTimeout(timer)
  }, [])

  // Mock data for the dashboard
  const stats = [
    {
      title: "Total Students",
      value: "1,245",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      change: "+5% from last month",
    },
    {
      title: "Total Faculty",
      value: "78",
      icon: <GraduationCap className="h-4 w-4 text-muted-foreground" />,
      change: "+2 new this month",
    },
    {
      title: "Active Courses",
      value: "156",
      icon: <BookOpen className="h-4 w-4 text-muted-foreground" />,
      change: "Spring semester",
    },
    {
      title: "Departments",
      value: "12",
      icon: <Building className="h-4 w-4 text-muted-foreground" />,
      change: "Across 4 schools",
    },
  ]

  const recentUsers = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      role: "Student",
      department: "Computer Science",
      avatar: "/placeholder.svg?height=36&width=36",
      createdAt: "2 days ago",
    },
    {
      id: "2",
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      role: "Faculty",
      department: "Psychology",
      avatar: "/placeholder.svg?height=36&width=36",
      createdAt: "3 days ago",
    },
    {
      id: "3",
      name: "Michael Chen",
      email: "michael.chen@example.com",
      role: "Student",
      department: "Business Administration",
      avatar: "/placeholder.svg?height=36&width=36",
      createdAt: "5 days ago",
    },
  ]

  const departments = [
    {
      id: "1",
      name: "Computer Science",
      students: 245,
      faculty: 18,
      courses: 32,
    },
    {
      id: "2",
      name: "Psychology",
      students: 180,
      faculty: 12,
      courses: 24,
    },
    {
      id: "3",
      name: "Business Administration",
      students: 320,
      faculty: 22,
      courses: 36,
    },
    {
      id: "4",
      name: "Engineering",
      students: 275,
      faculty: 20,
      courses: 30,
    },
  ]

  const systemStatus = [
    {
      name: "Server Uptime",
      value: 99.9,
      status: "Operational",
    },
    {
      name: "Database",
      value: 98.5,
      status: "Operational",
    },
    {
      name: "Storage",
      value: 75,
      status: "Warning",
    },
    {
      name: "API Services",
      value: 100,
      status: "Operational",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, {user?.displayName}. Here's an overview of the system.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/dashboard/settings">
              <Settings className="mr-2 h-4 w-4" />
              System Settings
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
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="mr-1 h-3 w-3 inline" />
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>Recently added users to the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs">{user.role}</span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{user.department}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{user.createdAt}</span>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/dashboard/users">View All Users</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Current status of system components</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemStatus.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{item.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.value}%</span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              item.status === "Operational"
                                ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                                : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                      </div>
                      <Progress
                        value={item.value}
                        className={item.status === "Operational" ? "" : "bg-yellow-100 dark:bg-yellow-900/20"}
                      />
                    </div>
                  ))}
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/dashboard/system">System Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Department Overview</CardTitle>
                <CardDescription>Summary of departments and their statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departments.slice(0, 3).map((dept) => (
                    <div key={dept.id} className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">{dept.name}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{dept.students} Students</span>
                          <span>{dept.faculty} Faculty</span>
                          <span>{dept.courses} Courses</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/departments/${dept.id}`}>View</Link>
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/dashboard/departments">View All Departments</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center" asChild>
                    <Link href="/dashboard/users/new">
                      <Users className="h-6 w-6 mb-1" />
                      <span>Add User</span>
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center" asChild>
                    <Link href="/dashboard/courses/new">
                      <BookOpen className="h-6 w-6 mb-1" />
                      <span>Add Course</span>
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center" asChild>
                    <Link href="/dashboard/reports">
                      <FileText className="h-6 w-6 mb-1" />
                      <span>Generate Reports</span>
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center" asChild>
                    <Link href="/dashboard/settings">
                      <Settings className="h-6 w-6 mb-1" />
                      <span>System Settings</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage users across the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Students</p>
                    <p className="text-xs text-muted-foreground">1,245 active accounts</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/dashboard/users?role=student">Manage</Link>
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Faculty</p>
                    <p className="text-xs text-muted-foreground">78 active accounts</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/dashboard/users?role=faculty">Manage</Link>
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">Administrators</p>
                    <p className="text-xs text-muted-foreground">12 active accounts</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/dashboard/users?role=admin">Manage</Link>
                  </Button>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/dashboard/users/new">Add New User</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>Recent login activity across the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Active Users (Last 24 Hours)</span>
                    <span className="font-medium">452</span>
                  </div>
                  <Progress value={36} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Active Users (Last 7 Days)</span>
                    <span className="font-medium">876</span>
                  </div>
                  <Progress value={70} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Active Users (Last 30 Days)</span>
                    <span className="font-medium">1,124</span>
                  </div>
                  <Progress value={90} />
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/reports/activity">View Detailed Activity</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="departments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {departments.map((dept) => (
              <Card key={dept.id}>
                <CardHeader>
                  <CardTitle>{dept.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/20">
                      <Users className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Students</p>
                      <p className="text-xs text-muted-foreground">{dept.students} enrolled</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/20">
                      <GraduationCap className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Faculty</p>
                      <p className="text-xs text-muted-foreground">{dept.faculty} members</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/20">
                      <BookOpen className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Courses</p>
                      <p className="text-xs text-muted-foreground">{dept.courses} active</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/dashboard/departments/${dept.id}`}>Manage Department</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Department Management</CardTitle>
              <CardDescription>Add or modify departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full" asChild>
                  <Link href="/dashboard/departments/new">Add New Department</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/departments/structure">View Department Structure</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="system" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Current status of system components</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemStatus.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{item.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.value}%</span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              item.status === "Operational"
                                ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                                : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                      </div>
                      <Progress
                        value={item.value}
                        className={item.status === "Operational" ? "" : "bg-yellow-100 dark:bg-yellow-900/20"}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>System Maintenance</CardTitle>
                <CardDescription>Scheduled maintenance and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Database Optimization</p>
                        <p className="text-xs text-muted-foreground">Scheduled for Apr 15, 2025</p>
                      </div>
                      <div className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-semibold text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400">
                        Upcoming
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      System will be in maintenance mode from 2:00 AM to 4:00 AM.
                    </p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Security Updates</p>
                        <p className="text-xs text-muted-foreground">Scheduled for Apr 20, 2025</p>
                      </div>
                      <div className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-semibold text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400">
                        Upcoming
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Critical security patches will be applied. No downtime expected.
                    </p>
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/dashboard/system/maintenance">View All Maintenance</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
              <CardDescription>Manage system-wide settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center" asChild>
                  <Link href="/dashboard/settings/general">
                    <LayoutDashboard className="h-6 w-6 mb-1" />
                    <span>General Settings</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center" asChild>
                  <Link href="/dashboard/settings/security">
                    <Settings className="h-6 w-6 mb-1" />
                    <span>Security Settings</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center" asChild>
                  <Link href="/dashboard/settings/backup">
                    <FileText className="h-6 w-6 mb-1" />
                    <span>Backup & Restore</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center" asChild>
                  <Link href="/dashboard/settings/notifications">
                    <Settings className="h-6 w-6 mb-1" />
                    <span>Notification Settings</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
