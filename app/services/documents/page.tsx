"use client"

import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileText, Upload, Coins, Eye, Wallet } from "lucide-react"
import { useState } from "react"
import { PiPaymentDialog } from "@/components/pi-payment-dialog"
import { usePiAuth } from "@/components/pi-auth-provider"
import type { PiPayment } from "@/lib/pi-sdk"

export default function DocumentsPage() {
  const { isAuthenticated } = usePiAuth()
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<{ id: string; name: string } | null>(null)

  const documentTypes = [
    { id: "birth-certificate", name: "Birth Certificate", description: "Official birth certificate", fee: 0.25 },
    { id: "residence-attestation", name: "Residence Attestation", description: "Proof of residence", fee: 0.25 },
    { id: "tax-statement", name: "Tax Statement", description: "Tax compliance certificate", fee: 0.25 },
    { id: "criminal-record", name: "Criminal Record", description: "Criminal background check", fee: 0.25 },
    { id: "company-certificate", name: "Company Certificate", description: "Business registration (RC)", fee: 0.25 },
    { id: "ice-certificate", name: "ICE Certificate", description: "Common business ID", fee: 0.25 },
  ]

  const handleRequestDocument = (doc: { id: string; name: string }) => {
    if (!isAuthenticated) {
      alert("Please login with Pi Network to request documents")
      return
    }
    setSelectedDocument(doc)
    setPaymentDialogOpen(true)
  }

  const handlePaymentSuccess = (payment: PiPayment) => {
    console.log("[v0] Document payment successful:", payment)
    alert(`Document request submitted! Transaction ID: ${payment.txid}\n\nYour ${selectedDocument?.name} will be processed within 2-3 business days.`)
  }

  const handlePaymentError = (error: Error) => {
    console.error("[v0] Document payment failed:", error)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-6 pb-24">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Document Services</h1>
          <p className="text-sm text-muted-foreground">Request certificates and official documents</p>
        </div>

        {/* Info Card */}
        <Card className="p-4 mb-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-500 text-white">
              <Coins className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Pi Coin Payment</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                All document requests cost 0.25 Pi. Processing time: 2-3 business days. Track your requests in
                real-time.
              </p>
            </div>
          </div>
        </Card>

        {!isAuthenticated && (
          <Alert className="mb-6">
            <Wallet className="h-4 w-4" />
            <AlertDescription>Login with Pi Network to request documents and make secure payments</AlertDescription>
          </Alert>
        )}

        {/* Document Types */}
        <div className="space-y-3">
          <h2 className="font-semibold">Available Documents</h2>
          {documentTypes.map((doc) => (
            <Card key={doc.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold">{doc.name}</h3>
                      <p className="text-sm text-muted-foreground">{doc.description}</p>
                    </div>
                    <Badge variant="secondary" className="shrink-0">
                      {doc.fee} Pi
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1 gap-2"
                      onClick={() => handleRequestDocument(doc)}
                      disabled={!isAuthenticated}
                    >
                      <Coins className="h-4 w-4" />
                      Request with Pi
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Features */}
        <Card className="p-4 mt-6">
          <h3 className="font-semibold mb-3">Service Features</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              <span>OCR scanning for automatic form filling</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              <span>E-signature and digital stamps</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              <span>Secure cloud storage for your documents</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              <span>Real-time status tracking and notifications</span>
            </li>
          </ul>
        </Card>
      </main>
      <BottomNav />

      {/* Pi Payment Dialog */}
      {selectedDocument && (
        <PiPaymentDialog
          open={paymentDialogOpen}
          onOpenChange={setPaymentDialogOpen}
          serviceType="document-request"
          serviceName={selectedDocument.name}
          amount={0.25}
          metadata={{ documentId: selectedDocument.id, documentType: selectedDocument.name }}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
        />
      )}
    </div>
  )
}
