"use client"

import { useState } from "react"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/auth-context"

export default function SchedulePage() {
  const { user } = useAuth()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("week")

  // Helper functions for date manipulation
  const getDayName = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "short" })
  }

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long" })
  }

  const getDayNumber = (date: Date) => {
    return date.getDate()
  }

  const addDays = (date: Date, days: number) => {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  const getWeekDays = () => {
    const today = new Date(currentDate)
    const day = today.getDay()
    const diff = today.getDate() - day + (day === 0 ? -6 : 1) // Adjust when day is Sunday
    const monday = new Date(today.setDate(diff))

    const weekDays = []
    for (let i = 0; i < 7; i++) {
      weekDays.push(addDays(monday, i))
    }

    return weekDays
  }

  const weekDays = getWeekDays()

  // Mock data for schedule
  const events = [
    {
      id: "1",
      title: "Calculus II",
      type: "class",
      day: "Monday",
      startTime: "10:00 AM",
      endTime: "11:30 AM",
      location: "Science Building, Room 302",
      instructor: "Prof. Michael Chen",
    },
    {
      id: "2",
      title: "Chemistry Lab",
      type: "lab",
      day: "Monday",
      startTime: "2:00 PM",
      endTime: "4:00 PM",
      location: "Chemistry Lab, Room 105",
      instructor: "Dr. Robert Williams",
    },
    {
      id: "3",
      title: "Introduction to Psychology",
      type: "class",
      day: "Tuesday",
      startTime: "9:00 AM",
      endTime: "10:30 AM",
      location: "Science Building, Room 201",
      instructor: "Dr. Sarah Johnson",
    },
    {
      id: "4",
      title: "Office Hours",
      type: "office-hours",
      day: "Tuesday",
      startTime: "1:00 PM",
      endTime: "3:00 PM",
      location: "Faculty Office, Room 205",
      instructor: "Dr. Sarah Johnson",
    },
    {
      id: "5",
      title: "World History",
      type: "class",
      day: "Wednesday",
      startTime: "11:00 AM",
      endTime: "12:30 PM",
      location: "Humanities Building, Room 205",
      instructor: "Prof. Emily Davis",
    },
    {
      id: "6",
      title: "Calculus II",
      type: "class",
      day: "Wednesday",
      startTime: "10:00 AM",
      endTime: "11:30 AM",
      location: "Science Building, Room 302",
      instructor: "Prof. Michael Chen",
    },
    {
      id: "7",
      title: "Introduction to Psychology",
      type: "class",
      day: "Thursday",
      startTime: "9:00 AM",
      endTime: "10:30 AM",
      location: "Science Building, Room 201",
      instructor: "Dr. Sarah Johnson",
    },
    {
      id: "8",
      title: "Chemistry Lab",
      type: "lab",
      day: "Friday",
      startTime: "2:00 PM",
      endTime: "4:00 PM",
      location: "Chemistry Lab, Room 105",
      instructor: "Dr. Robert Williams",
    },
    {
      id: "9",
      title: "World History",
      type: "class",
      day: "Friday",
      startTime: "11:00 AM",
      endTime: "12:30 PM",
      location: "Humanities Building, Room 205",
      instructor: "Prof. Emily Davis",
    },
  ]

  // Helper function to get events for a specific day
  const getEventsForDay = (dayName: string) => {
    return events.filter((event) => event.day === dayName)
  }

  // Navigation functions
  const goToPreviousPeriod = () => {
    const newDate = new Date(currentDate)
    if (viewMode === "day") {
      newDate.setDate(newDate.getDate() - 1)
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() - 7)
    } else if (viewMode === "month") {
      newDate.setMonth(newDate.getMonth() - 1)
    }
    setCurrentDate(newDate)
  }

  const goToNextPeriod = () => {
    const newDate = new Date(currentDate)
    if (viewMode === "day") {
      newDate.setDate(newDate.getDate() + 1)
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() + 7)
    } else if (viewMode === "month") {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Schedule</h2>
          <p className="text-muted-foreground">View and manage your academic or teaching schedule.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
          <Button variant="outline" size="icon" onClick={goToPreviousPeriod}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Button>
          <Button variant="outline" size="icon" onClick={goToNextPeriod}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </Button>
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">
              {viewMode === "day"
                ? currentDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                : viewMode === "week"
                  ? `${getMonthName(weekDays[0])} ${getDayNumber(weekDays[0])} - ${getMonthName(weekDays[6])} ${getDayNumber(weekDays[6])}, ${weekDays[0].getFullYear()}`
                  : `${getMonthName(currentDate)} ${currentDate.getFullYear()}`}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Select value={viewMode} onValueChange={(value) => setViewMode(value as "day" | "week" | "month")}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Day View</SelectItem>
            <SelectItem value="week">Week View</SelectItem>
            <SelectItem value="month">Month View</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {viewMode === "week" && (
        <div className="grid grid-cols-7 gap-4">
          {weekDays.map((day, index) => {
            const dayName = day.toLocaleDateString("en-US", { weekday: "long" })
            const dayEvents = getEventsForDay(dayName)
            const isToday = new Date().toDateString() === day.toDateString()

            return (
              <div key={index} className="flex flex-col gap-2">
                <div
                  className={`text-center p-2 rounded-md ${isToday ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                >
                  <div className="text-sm font-medium">{getDayName(day)}</div>
                  <div className="text-2xl font-bold">{getDayNumber(day)}</div>
                </div>
                <div className="space-y-2">
                  {dayEvents.length === 0 ? (
                    <div className="rounded-md border border-dashed p-4 text-center text-sm text-muted-foreground">
                      No events
                    </div>
                  ) : (
                    dayEvents.map((event) => (
                      <Card
                        key={event.id}
                        className={`
                        ${
                          event.type === "class"
                            ? "border-l-4 border-l-blue-500"
                            : event.type === "lab"
                              ? "border-l-4 border-l-green-500"
                              : "border-l-4 border-l-purple-500"
                        }
                      `}
                      >
                        <CardContent className="p-3">
                          <div className="font-medium">{event.title}</div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>
                              {event.startTime} - {event.endTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{event.location}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {viewMode === "day" && (
        <Card>
          <CardHeader>
            <CardTitle>
              {currentDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </CardTitle>
            <CardDescription>Your schedule for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getEventsForDay(currentDate.toLocaleDateString("en-US", { weekday: "long" })).length === 0 ? (
                <div className="rounded-md border border-dashed p-8 text-center">
                  <h3 className="text-lg font-semibold">No events scheduled</h3>
                  <p className="text-sm text-muted-foreground mt-1">Enjoy your free day!</p>
                </div>
              ) : (
                getEventsForDay(currentDate.toLocaleDateString("en-US", { weekday: "long" }))
                  .sort((a, b) => {
                    const aTime = new Date(`01/01/2023 ${a.startTime}`).getTime()
                    const bTime = new Date(`01/01/2023 ${b.startTime}`).getTime()
                    return aTime - bTime
                  })
                  .map((event) => (
                    <Card
                      key={event.id}
                      className={`
                      ${
                        event.type === "class"
                          ? "border-l-4 border-l-blue-500"
                          : event.type === "lab"
                            ? "border-l-4 border-l-green-500"
                            : "border-l-4 border-l-purple-500"
                      }
                    `}
                    >
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">{event.title}</h3>
                            <p className="text-sm text-muted-foreground">{event.instructor}</p>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {event.startTime} - {event.endTime}
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{event.location}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {viewMode === "month" && (
        <Card>
          <CardHeader>
            <CardTitle>
              {getMonthName(currentDate)} {currentDate.getFullYear()}
            </CardTitle>
            <CardDescription>Monthly calendar view</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 text-center">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="p-2 font-medium">
                  {day}
                </div>
              ))}
              {Array.from({ length: 35 }).map((_, index) => {
                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
                const firstDayOfMonth = date.getDay()
                const day = index - firstDayOfMonth + 1
                const currentMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
                const isCurrentMonth = currentMonthDate.getMonth() === currentDate.getMonth()
                const isToday = new Date().toDateString() === currentMonthDate.toDateString()
                const dayName = currentMonthDate.toLocaleDateString("en-US", { weekday: "long" })
                const hasEvents = getEventsForDay(dayName).length > 0 && isCurrentMonth

                return (
                  <div
                    key={index}
                    className={`
                      p-2 min-h-[80px] border rounded-md
                      ${isCurrentMonth ? "" : "text-muted-foreground bg-muted/30"}
                      ${isToday ? "bg-primary/10 border-primary" : ""}
                    `}
                  >
                    <div className="text-right font-medium">{isCurrentMonth ? day : ""}</div>
                    {hasEvents && (
                      <div className="mt-1">
                        {getEventsForDay(dayName)
                          .slice(0, 2)
                          .map((event, i) => (
                            <div
                              key={i}
                              className={`
                              text-xs truncate rounded px-1 py-0.5 mt-0.5
                              ${
                                event.type === "class"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                  : event.type === "lab"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                    : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                              }
                            `}
                            >
                              {event.startTime} {event.title}
                            </div>
                          ))}
                        {getEventsForDay(dayName).length > 2 && (
                          <div className="text-xs text-center mt-0.5 text-muted-foreground">
                            +{getEventsForDay(dayName).length - 2} more
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
