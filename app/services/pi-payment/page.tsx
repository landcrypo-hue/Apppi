"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { usePiAuth } from "@/contexts/pi-auth-context"
import { BACKEND_URLS } from "@/lib/system-config"
import { api } from "@/lib/api"
import {
  Coins,
  FileText,
  Building2,
  Home,
  Zap,
  Droplets,
  Phone,
  CheckCircle2,
  Loader2,
  XCircle,
  AlertTriangle,
  Receipt,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

// ─── Types ───────────────────────────────────────────────────────────────────

type PaymentStatus = "idle" | "creating" | "approving" | "completing" | "success" | "cancelled" | "error"

interface Service {
  id: string
  name: string
  description: string
  amount: number
  icon: React.ElementType
  category: string
  color: string
}

interface PaymentResult {
  paymentId: string
  txid?: string
  amount: number
  service: string
  timestamp: string
}

// ─── Service Catalog ──────────────────────────────────────────────────────────

const SERVICES: Service[] = [
  {
    id: "birth-certificate",
    name: "Birth Certificate",
    description: "Official birth certificate request",
    amount: 0.25,
    icon: FileText,
    category: "Documents",
    color: "blue",
  },
  {
    id: "residence-attestation",
    name: "Residence Attestation",
    description: "Proof of residence document",
    amount: 0.25,
    icon: Home,
    category: "Documents",
    color: "blue",
  },
  {
    id: "tax-statement",
    name: "Tax Statement",
    description: "Tax compliance certificate",
    amount: 0.25,
    icon: Receipt,
    category: "Documents",
    color: "blue",
  },
  {
    id: "company-rc",
    name: "Company RC Lookup",
    description: "Business registration (RC) info",
    amount: 0.25,
    icon: Building2,
    category: "Business",
    color: "purple",
  },
  {
    id: "electricity-bill",
    name: "Electricity Bill",
    description: "Pay your electricity bill",
    amount: 0.25,
    icon: Zap,
    category: "Utilities",
    color: "yellow",
  },
  {
    id: "water-bill",
    name: "Water Bill",
    description: "Pay your water bill",
    amount: 0.25,
    icon: Droplets,
    category: "Utilities",
    color: "cyan",
  },
  {
    id: "telecom-bill",
    name: "Telecom Bill",
    description: "Pay your phone / internet bill",
    amount: 0.25,
    icon: Phone,
    category: "Utilities",
    color: "green",
  },
  {
    id: "syndic-fees",
    name: "Syndic Fees",
    description: "Monthly syndic / residence fees",
    amount: 0.25,
    icon: Home,
    category: "Real Estate",
    color: "orange",
  },
]

const CATEGORIES = [...new Set(SERVICES.map((s) => s.category))]

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PiPaymentPage() {
  const { isAuthenticated, userData, piAccessToken } = usePiAuth()

  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [status, setStatus] = useState<PaymentStatus>("idle")
  const [result, setResult] = useState<PaymentResult | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>("All")

  // ── Payment Flow ─────────────────────────────────────────────────────────

  const handlePay = async (service: Service) => {
    if (!isAuthenticated) {
      alert("Please login with Pi Network first")
      return
    }

    if (typeof window === "undefined" || !window.Pi) {
      setErrorMsg("Pi SDK not available. Open this app in Pi Browser.")
      setStatus("error")
      return
    }

    setSelectedService(service)
    setStatus("creating")
    setErrorMsg(null)
    setResult(null)

    try {
      // ── Step 1: Create payment via Pi SDK (client side) ──────────────────
      const paymentData = {
        amount: service.amount,
        memo: `Eservices: ${service.name}`,
        metadata: {
          serviceId: service.id,
          serviceName: service.name,
          userId: userData?.id,
          timestamp: new Date().toISOString(),
        },
      }

      await new Promise<void>((resolve, reject) => {
        window.Pi.createPayment(paymentData, {
          // ── Step 2: Server Approval ──────────────────────────────────────
          onReadyForServerApproval: async (paymentId: string) => {
            setStatus("approving")
            try {
              await api.post(
                BACKEND_URLS.APPROVE_PAYMENT(paymentId),
                { paymentId },
                { headers: { Authorization: `Bearer ${piAccessToken}` } }
              )
            } catch (e: any) {
              reject(new Error(`Approval failed: ${e.message}`))
            }
          },

          // ── Step 3: Server Completion ────────────────────────────────────
          onReadyForServerCompletion: async (paymentId: string, txid: string) => {
            setStatus("completing")
            try {
              await api.post(
                BACKEND_URLS.COMPLETE_PAYMENT(paymentId),
                { paymentId, txid },
                { headers: { Authorization: `Bearer ${piAccessToken}` } }
              )

              setResult({
                paymentId,
                txid,
                amount: service.amount,
                service: service.name,
                timestamp: new Date().toLocaleString(),
              })
              setStatus("success")
              resolve()
            } catch (e: any) {
              reject(new Error(`Completion failed: ${e.message}`))
            }
          },

          onCancel: () => {
            setStatus("cancelled")
            resolve()
          },

          onError: (error: any) => {
            reject(new Error(error?.message || "Payment error"))
          },
        })
      })
    } catch (err: any) {
      setErrorMsg(err.message || "Payment failed")
      setStatus("error")
    }
  }

  const reset = () => {
    setStatus("idle")
    setErrorMsg(null)
    setResult(null)
    setSelectedService(null)
  }

  // ── Filtered list ─────────────────────────────────────────────────────────

  const filtered =
    activeCategory === "All"
      ? SERVICES
      : SERVICES.filter((s) => s.category === activeCategory)

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 py-6 pb-28 max-w-lg mx-auto">

        {/* Back */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4 hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Coins className="h-6 w-6 text-yellow-500" />
            Pi Payments
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Pay securely using Pi cryptocurrency. All services cost 0.25 Pi.
          </p>
        </div>

        {/* Auth gate */}
        {!isAuthenticated && (
          <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950/20 mb-6 p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-500 shrink-0" />
              <p className="text-sm text-orange-800 dark:text-orange-200">
                You must be logged in with Pi Network to make payments. Open this app inside Pi Browser.
              </p>
            </div>
          </Card>
        )}

        {/* User info bar */}
        {isAuthenticated && userData && (
          <Card className="mb-6 p-3 bg-primary/5 border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Coins className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">Pi Wallet</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">{userData.username}</p>
                <p className="text-xs text-muted-foreground">{userData.credits_balance} Pi credits</p>
              </div>
            </div>
          </Card>
        )}

        {/* ── Payment Status Overlay ── */}
        {status !== "idle" && (
          <Card className="mb-6 p-5">
            <div className="flex flex-col items-center gap-4 text-center">

              {/* Processing states */}
              {(status === "creating" || status === "approving" || status === "completing") && (
                <>
                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
                  <div>
                    <p className="font-semibold">
                      {status === "creating" && "Opening Pi payment..."}
                      {status === "approving" && "Approving transaction..."}
                      {status === "completing" && "Confirming on blockchain..."}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {status === "creating" && "Approve the payment in Pi Browser"}
                      {status === "approving" && "Server is approving your payment"}
                      {status === "completing" && "Recording transaction on Pi blockchain"}
                    </p>
                  </div>
                  {selectedService && (
                    <Badge variant="secondary" className="text-base px-4 py-1">
                      {selectedService.amount} Pi — {selectedService.name}
                    </Badge>
                  )}
                </>
              )}

              {/* Success */}
              {status === "success" && result && (
                <>
                  <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-950/30 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-green-700 dark:text-green-400">Payment Successful</p>
                    <p className="text-sm text-muted-foreground mt-1">{result.service}</p>
                  </div>
                  <div className="w-full bg-muted/50 rounded-lg p-4 space-y-2 text-left text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount</span>
                      <span className="font-bold text-yellow-600">{result.amount} Pi</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time</span>
                      <span>{result.timestamp}</span>
                    </div>
                    {result.txid && (
                      <div className="flex flex-col gap-1">
                        <span className="text-muted-foreground">Transaction ID</span>
                        <span className="font-mono text-xs break-all">{result.txid}</span>
                      </div>
                    )}
                  </div>
                  <Button onClick={reset} className="w-full">Make Another Payment</Button>
                </>
              )}

              {/* Cancelled */}
              {status === "cancelled" && (
                <>
                  <div className="h-16 w-16 rounded-full bg-yellow-100 dark:bg-yellow-950/30 flex items-center justify-center">
                    <AlertTriangle className="h-8 w-8 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-yellow-700 dark:text-yellow-400">Payment Cancelled</p>
                    <p className="text-sm text-muted-foreground mt-1">You cancelled the payment. No Pi was charged.</p>
                  </div>
                  <Button onClick={reset} variant="outline" className="w-full">Go Back</Button>
                </>
              )}

              {/* Error */}
              {status === "error" && (
                <>
                  <div className="h-16 w-16 rounded-full bg-red-100 dark:bg-red-950/30 flex items-center justify-center">
                    <XCircle className="h-8 w-8 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-red-700 dark:text-red-400">Payment Failed</p>
                    <p className="text-sm text-muted-foreground mt-1">{errorMsg}</p>
                  </div>
                  <Button onClick={reset} variant="outline" className="w-full">Try Again</Button>
                </>
              )}
            </div>
          </Card>
        )}

        {/* ── Service Catalog (only shown when idle) ── */}
        {status === "idle" && (
          <>
            {/* Category tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-4 no-scrollbar">
              {["All", ...CATEGORIES].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-muted-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Service cards */}
            <div className="space-y-3">
              {filtered.map((service) => {
                const Icon = service.icon
                return (
                  <Card
                    key={service.id}
                    className="p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="font-semibold text-sm">{service.name}</p>
                          <Badge variant="secondary" className="shrink-0 text-yellow-700 bg-yellow-50 dark:bg-yellow-950/30">
                            {service.amount} Pi
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">{service.description}</p>
                        <Button
                          size="sm"
                          className="w-full gap-2"
                          disabled={!isAuthenticated}
                          onClick={() => handlePay(service)}
                        >
                          <Coins className="h-4 w-4" />
                          Pay {service.amount} Pi
                        </Button>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>

            {/* Security note */}
            <Card className="mt-6 p-4 bg-muted/30">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p className="font-semibold text-foreground text-sm">Secure Pi Blockchain Payments</p>
                  <p>All transactions are processed on the Pi Network blockchain.</p>
                  <p>Payments are approved and completed via our secure backend server.</p>
                  <p>Transaction IDs are permanently recorded for your records.</p>
                </div>
              </div>
            </Card>
          </>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
