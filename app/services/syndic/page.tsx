"use client"

import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wrench, Calendar, FileText, Vote, Bell, Coins } from "lucide-react"

export default function SyndicPage() {
  const services = [
    { icon: Wrench, title: "Request Repair", description: "Submit maintenance requests", color: "bg-orange-500" },
    { icon: Coins, title: "Pay Syndic Fees", description: "0.25 Pi per payment", color: "bg-green-500" },
    { icon: Calendar, title: "Book Common Areas", description: "Reserve facilities", color: "bg-blue-500" },
    { icon: Vote, title: "Online Voting", description: "Participate in decisions", color: "bg-purple-500" },
  ]

  const announcements = [
    { id: "1", title: "Building Maintenance Scheduled", date: "2024-01-25", type: "maintenance" },
    { id: "2", title: "General Assembly Meeting", date: "2024-02-01", type: "meeting" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-6 pb-24">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Syndic Services</h1>
          <p className="text-sm text-muted-foreground">Manage your real estate and building services</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {services.map((service) => (
            <Card key={service.title} className="p-4">
              <div className={`${service.color} p-3 rounded-lg text-white w-fit mb-3`}>
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-sm mb-1">{service.title}</h3>
              <p className="text-xs text-muted-foreground">{service.description}</p>
            </Card>
          ))}
        </div>

        {/* Announcements */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <h2 className="font-semibold">Announcements</h2>
          </div>
          {announcements.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{new Date(item.date).toLocaleDateString()}</p>
                </div>
                <Badge variant="secondary">{item.type}</Badge>
              </div>
            </Card>
          ))}
        </div>

        {/* Financial Transparency */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Financial Transparency</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-sm">Monthly Fees Collected</span>
              <span className="font-semibold">45,230 MAD</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-sm">Maintenance Budget</span>
              <span className="font-semibold">32,150 MAD</span>
            </div>
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              <FileText className="mr-2 h-4 w-4" />
              View Full Report
            </Button>
          </div>
        </Card>
      </main>
      <BottomNav />
    </div>
  )
}
