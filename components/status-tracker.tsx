"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Clock, CheckCircle2, ChevronRight } from "lucide-react"

const requests = [
  {
    id: "REQ-2024-001",
    title: "Birth Certificate",
    status: "processing",
    date: "2024-01-15",
  },
  {
    id: "REQ-2024-002",
    title: "Residence Attestation",
    status: "ready",
    date: "2024-01-14",
  },
]

export function StatusTracker() {
  return (
    <section className="container px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">My Requests</h2>
          <p className="text-sm text-muted-foreground">Track your service requests</p>
        </div>
        <Button variant="ghost" size="sm">
          View All
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-3">
        {requests.map((request) => (
          <Card key={request.id} className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{request.title}</h3>
                    <p className="text-xs text-muted-foreground">{request.id}</p>
                  </div>
                  <Badge variant={request.status === "ready" ? "default" : "secondary"} className="shrink-0">
                    {request.status === "ready" ? (
                      <>
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        Ready
                      </>
                    ) : (
                      <>
                        <Clock className="mr-1 h-3 w-3" />
                        Processing
                      </>
                    )}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Requested: {new Date(request.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
