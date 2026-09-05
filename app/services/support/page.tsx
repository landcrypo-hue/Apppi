"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Ticket, HelpCircle, Send, Phone, Mail, Clock } from "lucide-react"

const faqs = [
  {
    question: "How do I request a certificate?",
    answer:
      "Go to 'Document Requests', select the certificate type, upload required documents, and pay 0.25 Pi. Processing takes 2-3 business days.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept Pi Coin (0.25 Pi per service), credit cards, and bank transfers. All transactions are secure and encrypted.",
  },
  {
    question: "How do I track my request status?",
    answer:
      "Visit 'My Requests' to see all your service requests and their current status. You'll receive notifications for updates.",
  },
  {
    question: "Is my personal data secure?",
    answer:
      "Yes! We use bank-level encryption, secure cloud storage, and comply with all data protection regulations. Your documents are safe with us.",
  },
]

export default function SupportPage() {
  const [ticket, setTicket] = useState({ subject: "", message: "" })

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-24 pt-20">
        <div className="container max-w-2xl mx-auto px-4 py-6 space-y-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Support & Help</h1>
            <p className="text-muted-foreground text-sm">We're here to help you with any questions or issues</p>
          </div>

          {/* Quick Contact */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="text-center space-y-2">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Live Chat</p>
                  <p className="text-xs text-muted-foreground">Online now</p>
                </div>
                <Button size="sm" className="w-full">
                  Start Chat
                </Button>
              </div>
            </Card>

            <Card className="p-4">
              <div className="text-center space-y-2">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                  <Phone className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Call Us</p>
                  <p className="text-xs text-muted-foreground">9AM - 6PM</p>
                </div>
                <Button size="sm" variant="outline" className="w-full bg-transparent">
                  Call Now
                </Button>
              </div>
            </Card>
          </div>

          <Tabs defaultValue="faq" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="ticket">New Ticket</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            <TabsContent value="faq" className="space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Frequently Asked Questions</h3>
              </div>
              {faqs.map((faq, idx) => (
                <Card key={idx} className="p-4">
                  <h4 className="font-semibold text-sm mb-2">{faq.question}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="ticket" className="space-y-4">
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Ticket className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Create Support Ticket</h3>
                </div>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject</label>
                    <Input
                      placeholder="Brief description of your issue..."
                      value={ticket.subject}
                      onChange={(e) => setTicket({ ...ticket, subject: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <Textarea
                      placeholder="Describe your issue in detail..."
                      rows={5}
                      value={ticket.message}
                      onChange={(e) => setTicket({ ...ticket, message: e.target.value })}
                    />
                  </div>
                  <Button className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Submit Ticket
                  </Button>
                </form>
              </Card>

              <Card className="p-4 bg-muted">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-medium text-sm">Response Time</p>
                    <p className="text-xs text-muted-foreground">
                      We typically respond within 2-4 hours during business hours. You'll receive updates via email and
                      in-app notifications.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4">
              <Card className="p-6 space-y-4">
                <h3 className="font-semibold">Contact Information</h3>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">+212 5 22 123 456</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">support@eservices.ma</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Business Hours</p>
                      <p className="text-sm text-muted-foreground">Mon-Fri: 9AM - 6PM</p>
                      <p className="text-sm text-muted-foreground">Sat: 9AM - 2PM</p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
