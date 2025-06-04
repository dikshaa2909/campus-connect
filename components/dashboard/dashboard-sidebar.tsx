"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  Calendar,
  FileText,
  GraduationCap,
  Home,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function DashboardSidebar() {
  const { user } = useAuth()
  const pathname = usePathname()

  // Define navigation items based on user role
  const getNavItems = () => {
    const commonItems = [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Profile",
        href: "/dashboard/profile",
        icon: Users,
      },
      {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
      },
    ]

    const studentItems = [
      {
        title: "Courses",
        href: "/dashboard/courses",
        icon: BookOpen,
      },
      {
        title: "Assignments",
        href: "/dashboard/assignments",
        icon: FileText,
      },
      {
        title: "Schedule",
        href: "/dashboard/schedule",
        icon: Calendar,
      },
      {
        title: "Grades",
        href: "/dashboard/grades",
        icon: GraduationCap,
      },
    ]

    const facultyItems = [
      {
        title: "My Courses",
        href: "/dashboard/courses",
        icon: BookOpen,
      },
      {
        title: "Assignments",
        href: "/dashboard/assignments",
        icon: FileText,
      },
      {
        title: "Schedule",
        href: "/dashboard/schedule",
        icon: Calendar,
      },
      {
        title: "Students",
        href: "/dashboard/students",
        icon: Users,
      },
    ]

    const adminItems = [
      {
        title: "Users",
        href: "/dashboard/users",
        icon: Users,
      },
      {
        title: "Courses",
        href: "/dashboard/courses",
        icon: BookOpen,
      },
      {
        title: "Departments",
        href: "/dashboard/departments",
        icon: Home,
      },
      {
        title: "Reports",
        href: "/dashboard/reports",
        icon: FileText,
      },
    ]

    switch (user?.role) {
      case "student":
        return [...commonItems, ...studentItems]
      case "faculty":
        return [...commonItems, ...facultyItems]
      case "admin":
        return [...commonItems, ...adminItems]
      default:
        return commonItems
    }
  }

  const navItems = getNavItems()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex h-14 items-center px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Campus Connect
            </span>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Communication</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/messages"} tooltip="Messages">
                  <Link href="/dashboard/messages">
                    <MessageSquare className="h-5 w-5" />
                    <span>Messages</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 text-xs text-muted-foreground">
          <p>Campus Connect v1.0.0</p>
          <p>© {new Date().getFullYear()} All rights reserved</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
