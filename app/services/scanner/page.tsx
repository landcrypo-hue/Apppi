"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, Camera, CheckCircle, Sparkles, Download, PenTool } from "lucide-react"

export default function ScannerPage() {
  const [scannedDoc, setScannedDoc] = useState<any>(null)

  const mockScan = () => {
    setScannedDoc({
      type: "CIN",
      data: {
        cin: "AB123456",
        firstName: "Ahmed",
        lastName: "Benali",
        birthDate: "01/01/1990",
        birthPlace: "Casablanca",
        address: "123 Rue Mohammed V, Casablanca",
        issueDate: "15/03/2020",
        expiryDate: "15/03/2030",
      },
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-24 pt-20">
        <div className="container max-w-2xl mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
              Document Scanner
              <Sparkles className="h-5 w-5 text-yellow-500" />
            </h1>
            <p className="text-muted-foreground text-sm">AI-powered OCR scanning with auto-fill & digital signatures</p>
          </div>

          <Tabs defaultValue="scan" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="scan">Scan</TabsTrigger>
              <TabsTrigger value="pdf">Generate PDF</TabsTrigger>
              <TabsTrigger value="sign">E-Sign</TabsTrigger>
            </TabsList>

            <TabsContent value="scan" className="space-y-4">
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Scan Document</h3>
                <div className="space-y-4">
                  <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Camera className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Scan with Camera</p>
                      <p className="text-sm text-muted-foreground">Capture CIN, passport, or any official document</p>
                    </div>
                    <Button onClick={mockScan} className="w-full">
                      <Camera className="h-4 w-4 mr-2" />
                      Open Camera
                    </Button>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full bg-transparent">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload from Device
                  </Button>
                </div>
              </Card>

              {scannedDoc && (
                <Card className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-semibold">Document Scanned</span>
                    </div>
                    <Badge>{scannedDoc.type}</Badge>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Extracted Information</h4>
                    <div className="grid gap-2 text-sm">
                      {Object.entries(scannedDoc.data).map(([key, value]) => (
                        <div key={key} className="flex justify-between p-2 bg-muted rounded">
                          <span className="text-muted-foreground capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}:
                          </span>
                          <span className="font-medium">{value as string}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <FileText className="h-4 w-4 mr-2" />
                      Auto-Fill Form
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Save Data
                    </Button>
                  </div>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="pdf" className="space-y-4">
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Generate PDF Document</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create professional PDF documents with digital stamps
                </p>
                <Button className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Create New PDF
                </Button>
              </Card>
            </TabsContent>

            <TabsContent value="sign" className="space-y-4">
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Electronic Signature</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Sign documents digitally with legally binding e-signatures
                </p>
                <Button className="w-full">
                  <PenTool className="h-4 w-4 mr-2" />
                  Sign Document
                </Button>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
