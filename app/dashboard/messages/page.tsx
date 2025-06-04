"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth-context"
import { Search, Send, Plus } from "lucide-react"

export default function MessagesPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [currentChat, setCurrentChat] = useState<string | null>("1")
  const [messageText, setMessageText] = useState("")

  // Mock data for contacts
  const contacts = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      role: "Professor",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Please remember to submit your research paper outline by Friday.",
      time: "2h ago",
      unread: true,
    },
    {
      id: "2",
      name: "Prof. Michael Chen",
      role: "Professor",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Office hours are canceled tomorrow. Please email me if you need assistance.",
      time: "Yesterday",
      unread: false,
    },
    {
      id: "3",
      name: "Emily Johnson",
      role: "Student",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Thanks for the help with the assignment!",
      time: "2 days ago",
      unread: false,
    },
    {
      id: "4",
      name: "John Smith",
      role: "Student",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "I have a question about the research paper requirements.",
      time: "3 days ago",
      unread: false,
    },
  ]

  // Mock data for messages
  const messages = {
    "1": [
      {
        id: "1",
        sender: "Dr. Sarah Johnson",
        senderId: "1",
        content: "Hello! I wanted to remind you about the upcoming research paper deadline.",
        time: "2 days ago",
        isMe: false,
      },
      {
        id: "2",
        sender: "Me",
        senderId: user?.uid || "",
        content: "Thank you for the reminder. I'm working on it now.",
        time: "2 days ago",
        isMe: true,
      },
      {
        id: "3",
        sender: "Dr. Sarah Johnson",
        senderId: "1",
        content: "Great! Let me know if you have any questions about the requirements.",
        time: "2 days ago",
        isMe: false,
      },
      {
        id: "4",
        sender: "Me",
        senderId: user?.uid || "",
        content: "Actually, I was wondering about the page limit. Is it still 10 pages?",
        time: "2 days ago",
        isMe: true,
      },
      {
        id: "5",
        sender: "Dr. Sarah Johnson",
        senderId: "1",
        content: "Yes, the page limit is 10 pages, not including references and appendices.",
        time: "2 days ago",
        isMe: false,
      },
      {
        id: "6",
        sender: "Dr. Sarah Johnson",
        senderId: "1",
        content: "Please remember to submit your research paper outline by Friday.",
        time: "2h ago",
        isMe: false,
      },
    ],
    "2": [
      {
        id: "1",
        sender: "Prof. Michael Chen",
        senderId: "2",
        content: "Hello everyone, I wanted to let you know that office hours are canceled tomorrow.",
        time: "Yesterday",
        isMe: false,
      },
      {
        id: "2",
        sender: "Me",
        senderId: user?.uid || "",
        content: "Thanks for letting us know. Will you be available by email?",
        time: "Yesterday",
        isMe: true,
      },
      {
        id: "3",
        sender: "Prof. Michael Chen",
        senderId: "2",
        content: "Yes, I'll be checking emails throughout the day. Feel free to reach out if you need assistance.",
        time: "Yesterday",
        isMe: false,
      },
    ],
  }

  // Filter contacts based on search query
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSendMessage = () => {
    if (!messageText.trim() || !currentChat) return

    // In a real app, you would send the message to the server here
    // For now, we'll just clear the input
    setMessageText("")
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
        <p className="text-muted-foreground">Communicate with students, faculty, and staff.</p>
      </div>

      <div className="grid h-[calc(100vh-13rem)] grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        <Card className="col-span-1">
          <CardHeader className="p-4">
            <div className="flex items-center justify-between">
              <CardTitle>Conversations</CardTitle>
              <Button size="icon" variant="ghost">
                <Plus className="h-4 w-4" />
                <span className="sr-only">New Conversation</span>
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search messages..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="all" className="w-full">
              <div className="px-4">
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="unread" className="flex-1">
                    Unread
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="all" className="m-0">
                <ScrollArea className="h-[calc(100vh-22rem)]">
                  <div className="divide-y">
                    {filteredContacts.map((contact) => (
                      <div
                        key={contact.id}
                        className={`flex cursor-pointer items-center gap-4 p-4 transition-colors hover:bg-muted/50 ${
                          currentChat === contact.id ? "bg-muted" : ""
                        }`}
                        onClick={() => setCurrentChat(contact.id)}
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                          <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium leading-none">{contact.name}</p>
                            <p className="text-xs text-muted-foreground">{contact.time}</p>
                          </div>
                          <p className="text-xs text-muted-foreground">{contact.role}</p>
                          <p className="line-clamp-1 text-xs">{contact.lastMessage}</p>
                        </div>
                        {contact.unread && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="unread" className="m-0">
                <ScrollArea className="h-[calc(100vh-22rem)]">
                  <div className="divide-y">
                    {filteredContacts
                      .filter((contact) => contact.unread)
                      .map((contact) => (
                        <div
                          key={contact.id}
                          className={`flex cursor-pointer items-center gap-4 p-4 transition-colors hover:bg-muted/50 ${
                            currentChat === contact.id ? "bg-muted" : ""
                          }`}
                          onClick={() => setCurrentChat(contact.id)}
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                            <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium leading-none">{contact.name}</p>
                              <p className="text-xs text-muted-foreground">{contact.time}</p>
                            </div>
                            <p className="text-xs text-muted-foreground">{contact.role}</p>
                            <p className="line-clamp-1 text-xs">{contact.lastMessage}</p>
                          </div>
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                        </div>
                      ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          {currentChat ? (
            <>
              <CardHeader className="flex flex-row items-center gap-4 p-4">
                {contacts.find((c) => c.id === currentChat) && (
                  <>
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={contacts.find((c) => c.id === currentChat)?.avatar || "/placeholder.svg"}
                        alt={contacts.find((c) => c.id === currentChat)?.name}
                      />
                      <AvatarFallback>
                        {getInitials(contacts.find((c) => c.id === currentChat)?.name || "")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{contacts.find((c) => c.id === currentChat)?.name}</CardTitle>
                      <CardDescription>{contacts.find((c) => c.id === currentChat)?.role}</CardDescription>
                    </div>
                  </>
                )}
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-26rem)]">
                  <div className="flex flex-col gap-4 p-4">
                    {messages[currentChat as keyof typeof messages]?.map((message) => (
                      <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.isMe ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="mt-1 text-right text-xs opacity-70">{message.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="p-4">
                <form
                  className="flex w-full items-center gap-2"
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSendMessage()
                  }}
                >
                  <Input
                    placeholder="Type your message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                  />
                  <Button type="submit" size="icon" disabled={!messageText.trim()}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </form>
              </CardFooter>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center p-8">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <Send className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No conversation selected</h3>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                Select a conversation from the list to start messaging.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
