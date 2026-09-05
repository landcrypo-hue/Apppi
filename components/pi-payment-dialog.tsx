"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Coins, CheckCircle2, XCircle, AlertTriangle } from "lucide-react"
import { createPiPayment, type PiPayment } from "@/lib/pi-sdk"
import { usePiAuth } from "./pi-auth-provider"

interface PiPaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  serviceType: string
  serviceName: string
  amount?: number
  metadata?: Record<string, any>
  onSuccess?: (payment: PiPayment) => void
  onError?: (error: Error) => void
}

export function PiPaymentDialog({
  open,
  onOpenChange,
  serviceType,
  serviceName,
  amount = 0.25,
  metadata = {},
  onSuccess,
  onError,
}: PiPaymentDialogProps) {
  const { isAuthenticated, user } = usePiAuth()
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error" | "cancelled">("idle")
  const [error, setError] = useState<string | null>(null)
  const [payment, setPayment] = useState<PiPayment | null>(null)

  const handlePayment = async () => {
    if (!isAuthenticated) {
      setError("Please login with Pi Network first")
      setStatus("error")
      return
    }

    setStatus("processing")
    setError(null)

    try {
      const result = await createPiPayment(serviceType, amount, {
        ...metadata,
        serviceName,
        userId: user?.uid,
      })

      setPayment(result)

      if (result.status === "completed") {
        setStatus("success")
        onSuccess?.(result)
      } else if (result.status === "cancelled") {
        setStatus("cancelled")
      } else {
        setStatus("error")
        setError("Payment was not completed")
      }
    } catch (err: any) {
      console.error("[v0] Payment error:", err)
      setStatus("error")
      setError(err.message || "Payment failed")
      onError?.(err)
    }
  }

  const handleClose = () => {
    setStatus("idle")
    setError(null)
    setPayment(null)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-yellow-500" />
            Pi Network Payment
          </DialogTitle>
          <DialogDescription>Secure payment with Pi cryptocurrency</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Service Details */}
          <div className="rounded-lg border p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Service:</span>
              <span className="font-medium">{serviceName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Amount:</span>
              <span className="font-bold text-lg text-yellow-600">{amount} Pi</span>
            </div>
            {user && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Account:</span>
                <span className="font-medium">{user.username}</span>
              </div>
            )}
          </div>

          {/* Status Messages */}
          {status === "processing" && (
            <Alert>
              <Loader2 className="h-4 w-4 animate-spin" />
              <AlertDescription>Processing payment... Please approve in Pi Browser.</AlertDescription>
            </Alert>
          )}

          {status === "success" && payment && (
            <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                Payment completed successfully!
                {payment.txid && (
                  <div className="text-xs mt-1 font-mono">TX: {payment.txid.slice(0, 16)}...</div>
                )}
              </AlertDescription>
            </Alert>
          )}

          {status === "cancelled" && (
            <Alert className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                Payment was cancelled. You can try again.
              </AlertDescription>
            </Alert>
          )}

          {status === "error" && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>{error || "Payment failed. Please try again."}</AlertDescription>
            </Alert>
          )}

          {/* Information */}
          {status === "idle" && (
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Secure blockchain transaction
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Instant confirmation
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                No additional fees
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          {status === "idle" && (
            <>
              <Button variant="outline" onClick={handleClose} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button onClick={handlePayment} disabled={!isAuthenticated} className="w-full sm:w-auto gap-2">
                <Coins className="h-4 w-4" />
                Pay {amount} Pi
              </Button>
            </>
          )}

          {status === "processing" && (
            <Button disabled className="w-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </Button>
          )}

          {(status === "success" || status === "cancelled" || status === "error") && (
            <Button onClick={handleClose} className="w-full">
              {status === "success" ? "Done" : "Close"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
