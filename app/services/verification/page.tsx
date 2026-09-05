"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { UserCheck, Phone, MapPin, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { PiPaymentModal } from "@/components/pi-payment-modal"

export default function VerificationPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [address, setAddress] = useState("")
  const [showPayment, setShowPayment] = useState(false)
  const [verificationType, setVerificationType] = useState<"phone" | "address">("phone")
  const [verificationResult, setVerificationResult] = useState<any>(null)

  const handleVerify = (type: "phone" | "address") => {
    setVerificationType(type)
    setShowPayment(true)
  }

  const handlePaymentSuccess = () => {
    // Mock verification result
    if (verificationType === "phone") {
      setVerificationResult({
        type: "phone",
        number: phoneNumber,
        status: "verified",
        carrier: "Maroc Telecom",
        type_detail: "Mobile",
        country: "Morocco",
        valid: true,
      })
    } else {
      setVerificationResult({
        type: "address",
        address: address,
        status: "verified",
        city: "Casablanca",
        postal: "20000",
        valid: true,
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-24 pt-20">
        <div className="container max-w-2xl mx-auto px-4 py-6 space-y-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Contact Verification</h1>
            <p className="text-muted-foreground text-sm">Verify phone numbers and addresses instantly</p>
          </div>

          <Tabs defaultValue="phone" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="phone">Phone Number</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>

            <TabsContent value="phone" className="space-y-4">
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Verify Phone Number</h3>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input
                      placeholder="+212 6XX XXX XXX"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <Button className="w-full" onClick={() => handleVerify("phone")} disabled={!phoneNumber}>
                    <UserCheck className="h-4 w-4 mr-2" />
                    Verify Number (0.25 π)
                  </Button>
                </div>
              </Card>

              {verificationResult?.type === "phone" && (
                <Card className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Verification Result</h3>
                      {verificationResult.valid ? (
                        <Badge className="bg-green-500">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="destructive">
                          <XCircle className="h-3 w-3 mr-1" />
                          Invalid
                        </Badge>
                      )}
                    </div>

                    <div className="grid gap-2 text-sm">
                      <div className="flex justify-between p-2 bg-muted rounded">
                        <span className="text-muted-foreground">Number:</span>
                        <span className="font-medium">{verificationResult.number}</span>
                      </div>
                      <div className="flex justify-between p-2 bg-muted rounded">
                        <span className="text-muted-foreground">Carrier:</span>
                        <span className="font-medium">{verificationResult.carrier}</span>
                      </div>
                      <div className="flex justify-between p-2 bg-muted rounded">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="font-medium">{verificationResult.type_detail}</span>
                      </div>
                      <div className="flex justify-between p-2 bg-muted rounded">
                        <span className="text-muted-foreground">Country:</span>
                        <span className="font-medium">{verificationResult.country}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="address" className="space-y-4">
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Verify Address</h3>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Address</label>
                    <Input
                      placeholder="Enter complete address..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <Button className="w-full" onClick={() => handleVerify("address")} disabled={!address}>
                    <UserCheck className="h-4 w-4 mr-2" />
                    Verify Address (0.25 π)
                  </Button>
                </div>
              </Card>

              {verificationResult?.type === "address" && (
                <Card className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Verification Result</h3>
                      {verificationResult.valid ? (
                        <Badge className="bg-green-500">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="destructive">
                          <XCircle className="h-3 w-3 mr-1" />
                          Invalid
                        </Badge>
                      )}
                    </div>

                    <div className="grid gap-2 text-sm">
                      <div className="flex justify-between p-2 bg-muted rounded">
                        <span className="text-muted-foreground">Address:</span>
                        <span className="font-medium text-right">{verificationResult.address}</span>
                      </div>
                      <div className="flex justify-between p-2 bg-muted rounded">
                        <span className="text-muted-foreground">City:</span>
                        <span className="font-medium">{verificationResult.city}</span>
                      </div>
                      <div className="flex justify-between p-2 bg-muted rounded">
                        <span className="text-muted-foreground">Postal Code:</span>
                        <span className="font-medium">{verificationResult.postal}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          <Card className="p-4 bg-muted">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-medium text-sm">Verification Benefits</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Instant verification results</li>
                  <li>• Carrier and location information</li>
                  <li>• Fraud prevention and security</li>
                  <li>• Compliant with data protection laws</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </main>
      <BottomNav />

      <PiPaymentModal
        open={showPayment}
        onOpenChange={setShowPayment}
        serviceName={verificationType === "phone" ? "Phone Verification" : "Address Verification"}
        amount={0.25}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  )
}
