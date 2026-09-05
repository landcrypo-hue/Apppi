"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Building2, FileText, User, MapPin, Phone, Mail, CheckCircle, AlertCircle } from "lucide-react"
import { PiPaymentModal } from "@/components/pi-payment-modal"

export default function CompanyLookupPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState<"rc" | "ice">("rc")
  const [showPayment, setShowPayment] = useState(false)
  const [searchResult, setSearchResult] = useState<any>(null)

  const handleSearch = () => {
    setShowPayment(true)
  }

  const handlePaymentSuccess = () => {
    // Mock company data
    setSearchResult({
      rc: "123456",
      ice: "001234567890123",
      companyName: "TechCorp Solutions SARL",
      legalForm: "SARL",
      status: "Active",
      capital: "100,000 MAD",
      address: "123 Boulevard Mohammed V, Casablanca",
      city: "Casablanca",
      founded: "2020",
      activity: "Information Technology Services",
      taxStatus: "Regular",
      dirigeants: [
        { name: "Ahmed Benali", role: "Gérant", cin: "AB123456" },
        { name: "Sarah Alami", role: "Co-Gérant", cin: "CD789012" },
      ],
      phone: "+212 5 22 123 456",
      email: "contact@techcorp.ma",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-24 pt-20">
        <div className="container max-w-2xl mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Company Lookup</h1>
            <p className="text-muted-foreground text-sm">Search company information by RC or ICE number</p>
          </div>

          <Card className="p-6 mb-6">
            <Tabs value={searchType} onValueChange={(v) => setSearchType(v as "rc" | "ice")}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="rc">RC Number</TabsTrigger>
                <TabsTrigger value="ice">ICE Number</TabsTrigger>
              </TabsList>

              <TabsContent value="rc" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Registre de Commerce (RC)</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter RC number..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button onClick={handleSearch} disabled={!searchQuery}>
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ice" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Identifiant Commun de l'Entreprise (ICE)</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter ICE number..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      maxLength={15}
                    />
                    <Button onClick={handleSearch} disabled={!searchQuery}>
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground flex items-center gap-2">
                <AlertCircle className="h-3 w-3" />
                Search fee: 0.25 Pi per lookup
              </p>
            </div>
          </Card>

          {searchResult && (
            <Card className="p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-1">{searchResult.companyName}</h2>
                  <div className="flex items-center gap-2">
                    <Badge variant={searchResult.status === "Active" ? "default" : "secondary"}>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {searchResult.status}
                    </Badge>
                    <Badge variant="outline">{searchResult.legalForm}</Badge>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Company Information
                  </h3>
                  <div className="grid gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">RC:</span>
                      <span className="font-medium">{searchResult.rc}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ICE:</span>
                      <span className="font-medium">{searchResult.ice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Capital:</span>
                      <span className="font-medium">{searchResult.capital}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Founded:</span>
                      <span className="font-medium">{searchResult.founded}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax Status:</span>
                      <Badge variant="outline" className="text-xs">
                        {searchResult.taxStatus}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Business Activity
                  </h3>
                  <p className="text-sm text-muted-foreground">{searchResult.activity}</p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Address
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {searchResult.address}
                    <br />
                    {searchResult.city}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Dirigeants (Managers)
                  </h3>
                  <div className="space-y-2">
                    {searchResult.dirigeants.map((dirigeant: any, idx: number) => (
                      <Card key={idx} className="p-3 bg-muted">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-sm">{dirigeant.name}</p>
                            <p className="text-xs text-muted-foreground">{dirigeant.role}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            CIN: {dirigeant.cin}
                          </Badge>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-sm">Contact Information</h3>
                  <div className="grid gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{searchResult.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{searchResult.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full bg-transparent">
                <FileText className="h-4 w-4 mr-2" />
                Download Full Report (PDF)
              </Button>
            </Card>
          )}
        </div>
      </main>
      <BottomNav />

      <PiPaymentModal
        open={showPayment}
        onOpenChange={setShowPayment}
        serviceName="Company Lookup"
        amount={0.25}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  )
}
