"use client"

import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Clock, CheckCircle, AlertCircle, MessageSquare, Download, Eye } from "lucide-react"

const requests = [
  {
    id: "REQ-2025-001",
    type: "Birth Certificate",
    status: "completed",
    date: "2025-01-15",
    completedDate: "2025-01-17",
    fee: "0.25 π",
  },
  {
    id: "REQ-2025-002",
    type: "Company RC Lookup",
    status: "in-progress",
    date: "2025-01-18",
    estimatedCompletion: "2025-01-20",
    fee: "0.25 π",
  },
  {
    id: "REQ-2025-003",
    type: "Residence Certificate",
    status: "pending",
    date: "2025-01-20",
    estimatedCompletion: "2025-01-23",
    fee: "0.25 π",
  },
  {
    id: "REQ-2025-004",
    type: "Tax Certificate",
    status: "completed",
    date: "2025-01-10",
    completedDate: "2025-01-12",
    fee: "0.25 π",
  },
]

export default function RequestsPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        )
      case "in-progress":
        return (
          <Badge className="bg-blue-500">
            <Clock className="h-3 w-3 mr-1" />
            In Progress
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary">
            <AlertCircle className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const activeRequests = requests.filter((r) => r.status !== "completed")
  const completedRequests = requests.filter((r) => r.status === "completed")

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-24 pt-20">
        <div className="container max-w-2xl mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">My Requests</h1>
            <p className="text-muted-foreground text-sm">Track the status of all your service requests</p>
          </div>

          <Tabs defaultValue="active" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="active">Active ({activeRequests.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedRequests.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-3">
              {activeRequests.length === 0 ? (
                <Card className="p-8 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No active requests</p>
                </Card>
              ) : (
                activeRequests.map((request) => (
                  <Card key={request.id} className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <h3 className="font-semibold text-sm">{request.type}</h3>
                          </div>
                          <p className="text-xs text-muted-foreground">ID: {request.id}</p>
                        </div>
                        {getStatusBadge(request.status)}
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <p className="text-muted-foreground">Submitted</p>
                          <p className="font-medium">{request.date}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Est. Completion</p>
                          <p className="font-medium">{request.estimatedCompletion}</p>
                        </div>
                      </div>

                      {request.status === "in-progress" && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">60%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: "60%" }} />
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Chat
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-3">
              {completedRequests.map((request) => (
                <Card key={request.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <h3 className="font-semibold text-sm">{request.type}</h3>
                        </div>
                        <p className="text-xs text-muted-foreground">ID: {request.id}</p>
                      </div>
                      {getStatusBadge(request.status)}
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="text-muted-foreground">Submitted</p>
                        <p className="font-medium">{request.date}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Completed</p>
                        <p className="font-medium">{request.completedDate}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
