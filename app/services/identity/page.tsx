"use client"

import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Fingerprint, CreditCard, FileText, Upload, Lock, Eye } from "lucide-react"

export default function IdentityPage() {
  const documents = [
    { id: "1", name: "National ID (CIN)", type: "Identity", status: "verified", date: "2024-01-10" },
    { id: "2", name: "Passport", type: "Identity", status: "verified", date: "2024-01-08" },
    { id: "3", name: "Tax ID", type: "Tax", status: "pending", date: "2024-01-15" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-6 pb-24">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Identity Vault</h1>
          <p className="text-sm text-muted-foreground">Secure storage for your personal documents</p>
        </div>

        {/* Security Status */}
        <Card className="p-4 mb-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-green-500 text-white">
              <Shield className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-green-900 dark:text-green-100 mb-1">Protected & Encrypted</h3>
              <p className="text-sm text-green-800 dark:text-green-200 leading-relaxed">
                All documents are encrypted with AES-256. Two-factor authentication enabled. Your data is secure.
              </p>
            </div>
          </div>
        </Card>

        {/* Biometric Login */}
        <Card className="p-4 mb-6">
          <h2 className="font-semibold mb-3">Biometric Access</h2>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-auto flex-col gap-2 p-4 bg-transparent">
              <Fingerprint className="h-8 w-8" />
              <div className="text-xs">
                <div className="font-semibold">Fingerprint</div>
                <div className="text-green-600">Enabled</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-4 bg-transparent">
              <Eye className="h-8 w-8" />
              <div className="text-xs">
                <div className="font-semibold">Face ID</div>
                <div className="text-muted-foreground">Setup</div>
              </div>
            </Button>
          </div>
        </Card>

        {/* Stored Documents */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Stored Documents</h2>
            <Button size="sm" variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
          </div>
          {documents.map((doc) => (
            <Card key={doc.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600">
                  {doc.type === "Identity" ? <CreditCard className="h-6 w-6" /> : <FileText className="h-6 w-6" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold">{doc.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Uploaded: {new Date(doc.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant={doc.status === "verified" ? "default" : "secondary"}>
                      {doc.status === "verified" ? "Verified" : "Pending"}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Lock className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Security Features */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Security Features</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
              <span>End-to-end encryption (AES-256)</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
              <span>Multi-factor authentication (MFA)</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
              <span>Biometric access control</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
              <span>Audit logs and activity tracking</span>
            </li>
          </ul>
        </Card>
      </main>
      <BottomNav />
    </div>
  )
}
