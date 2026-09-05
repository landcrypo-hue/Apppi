"use client"

import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Zap, Droplet, Phone, Home, Building2, Coins, Wallet, Search, CheckCircle2 } from "lucide-react"
import { useState } from "react"
import { usePiAuth } from "@/components/pi-auth-provider"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { PiPaymentDialog } from "@/components/pi-payment-dialog"

export default function PaymentsPage() {
  const { isAuthenticated, user } = usePiAuth()
  const [selectedBill, setSelectedBill] = useState<string | null>(null)

  const bills = [
    { id: "1", type: "Electricity", icon: Zap, amount: "245.00", dueDate: "2024-01-20", status: "pending" },
    { id: "2", type: "Water", icon: Droplet, amount: "89.50", dueDate: "2024-01-22", status: "pending" },
    { id: "3", type: "Telecom", icon: Phone, amount: "320.00", dueDate: "2024-01-25", status: "pending" },
    { id: "4", type: "Syndic Fee", icon: Home, amount: "450.00", dueDate: "2024-02-01", status: "pending" },
    { id: "5", type: "Government Fee", icon: Building2, amount: "125.00", dueDate: "2024-01-28", status: "pending" },
  ]

  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false)

  const handlePayment = (billId: string) => {
    if (!isAuthenticated) {
      alert("Please login with Pi Network to make payments")
      return
    }
    setSelectedBill(billId)
    setPaymentDialogOpen(true)
  }

  const handlePaymentSuccess = (payment: any) => {
    console.log("[v0] Bill payment successful:", payment)
    const bill = bills.find(b => b.id === selectedBill)
    alert(`Payment successful! Transaction ID: ${payment.txid}\n\nYour ${bill?.type} bill has been paid.`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-6 pb-24">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Payments & Billing</h1>
          <p className="text-sm text-muted-foreground">Manage and pay your bills securely with Pi Network</p>
        </div>

        <Card className="p-4 mb-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border-yellow-200 dark:border-yellow-900">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-yellow-500 text-white">
              <Coins className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-lg text-yellow-900 dark:text-yellow-100">Pi Coin Payments</h2>
              <p className="text-sm text-yellow-800 dark:text-yellow-200 mt-1">
                All transactions on Eservices use Pi cryptocurrency for secure, fast, and low-cost payments
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
              <CheckCircle2 className="h-4 w-4" />
              <span>0.25 Pi service fee</span>
            </div>
            <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
              <CheckCircle2 className="h-4 w-4" />
              <span>Instant confirmation</span>
            </div>
            <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
              <CheckCircle2 className="h-4 w-4" />
              <span>Blockchain verified</span>
            </div>
            <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
              <CheckCircle2 className="h-4 w-4" />
              <span>Secure & encrypted</span>
            </div>
          </div>
        </Card>

        {!isAuthenticated && (
          <Alert className="mb-6">
            <Wallet className="h-4 w-4" />
            <AlertDescription>Login with Pi Network to make payments and access all features</AlertDescription>
          </Alert>
        )}

        {/* Search */}
        <div className="mb-6">
          <Label htmlFor="search">Search Bills</Label>
          <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="search" placeholder="Search by type or amount..." className="pl-9" />
          </div>
        </div>

        {/* Bills List */}
        <div className="space-y-3">
          <h2 className="font-semibold">Pending Bills</h2>
          {bills.map((bill) => (
            <Card key={bill.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <bill.icon className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold">{bill.type}</h3>
                      <p className="text-sm text-muted-foreground">
                        Due: {new Date(bill.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{bill.amount} MAD</div>
                      <div className="text-xs text-muted-foreground">+ 0.25 Pi fee</div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="w-full gap-2"
                    disabled={!isAuthenticated}
                    onClick={() => handlePayment(bill.id)}
                  >
                    <Coins className="mr-2 h-4 w-4" />
                    Pay with Pi Network
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Payment History - If authenticated */}
        {isAuthenticated && user && (
          <Card className="p-4 mt-6">
            <h2 className="font-semibold mb-3">Your Pi Wallet</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Connected Account:</span>
                <span className="font-medium">{user.username}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Status:</span>
                <span className="text-green-600 font-medium">Active</span>
              </div>
            </div>
          </Card>
        )}
      </main>
      <BottomNav />

      {/* Pi Payment Dialog */}
      {selectedBill && (
        <PiPaymentDialog
          open={paymentDialogOpen}
          onOpenChange={setPaymentDialogOpen}
          serviceType="bill-payment"
          serviceName={`${bills.find(b => b.id === selectedBill)?.type} Bill`}
          amount={0.25}
          metadata={{ 
            billId: selectedBill, 
            billType: bills.find(b => b.id === selectedBill)?.type,
            billAmount: bills.find(b => b.id === selectedBill)?.amount
          }}
          onSuccess={handlePaymentSuccess}
          onError={(error) => console.error("[v0] Payment error:", error)}
        />
      )}
    </div>
  )
}
