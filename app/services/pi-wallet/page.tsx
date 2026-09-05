"use client"

import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, ArrowUpRight, ArrowDownLeft, TrendingUp, History, Plus, Send } from "lucide-react"

const transactions = [
  { id: 1, type: "debit", amount: 0.25, service: "Document Request", date: "2025-01-15", status: "completed" },
  { id: 2, type: "credit", amount: 10.0, service: "Wallet Top-up", date: "2025-01-14", status: "completed" },
  { id: 3, type: "debit", amount: 0.25, service: "Company Lookup", date: "2025-01-13", status: "completed" },
  { id: 4, type: "debit", amount: 0.25, service: "Certificate Request", date: "2025-01-12", status: "completed" },
  { id: 5, type: "credit", amount: 5.0, service: "Wallet Top-up", date: "2025-01-10", status: "completed" },
]

export default function PiWalletPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-24 pt-20">
        <div className="container max-w-2xl mx-auto px-4 py-6 space-y-6">
          {/* Wallet Balance */}
          <Card className="p-6 bg-gradient-to-br from-yellow-500 via-yellow-600 to-orange-600 text-white border-0">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  <span className="text-sm font-medium">Pi Wallet</span>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  Active
                </Badge>
              </div>

              <div>
                <p className="text-sm opacity-90 mb-1">Available Balance</p>
                <h2 className="text-4xl font-bold">12.50 π</h2>
                <p className="text-sm opacity-90 mt-1">≈ $37.50 USD</p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button className="flex-1 bg-white text-black hover:bg-white/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Funds
                </Button>
                <Button variant="outline" className="flex-1 border-white text-white hover:bg-white/10 bg-transparent">
                  <Send className="h-4 w-4 mr-2" />
                  Send Pi
                </Button>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  <ArrowDownLeft className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Received</p>
                  <p className="font-bold">15.00 π</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                  <ArrowUpRight className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Spent</p>
                  <p className="font-bold">2.50 π</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Transaction History */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold flex items-center gap-2">
                <History className="h-4 w-4" />
                Transaction History
              </h3>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>

            <Card className="divide-y">
              {transactions.map((tx) => (
                <div key={tx.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        tx.type === "credit" ? "bg-green-100 dark:bg-green-900/20" : "bg-red-100 dark:bg-red-900/20"
                      }`}
                    >
                      {tx.type === "credit" ? (
                        <ArrowDownLeft className="h-5 w-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5 text-red-600 dark:text-red-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{tx.service}</p>
                      <p className="text-xs text-muted-foreground">{tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-bold text-sm ${
                        tx.type === "credit" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {tx.type === "credit" ? "+" : "-"}
                      {tx.amount} π
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {tx.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </Card>
          </div>

          {/* Info Card */}
          <Card className="p-4 bg-primary/5 border-primary/20">
            <div className="flex gap-3">
              <TrendingUp className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Pi Payment Benefits</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Instant transactions with no delays</li>
                  <li>• Low fees (0.25 π per service)</li>
                  <li>• Secure blockchain technology</li>
                  <li>• Easy top-up and withdrawals</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
