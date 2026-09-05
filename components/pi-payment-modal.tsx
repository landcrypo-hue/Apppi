"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Coins, CheckCircle2, Loader2 } from "lucide-react"

interface PiPaymentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  serviceName: string
  amount?: number
  onSuccess?: () => void
}

export function PiPaymentModal({ open, onOpenChange, serviceName, amount = 0.25, onSuccess }: PiPaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handlePayWithPi = async () => {
    setIsProcessing(true)

    // Simulate Pi Network payment integration
    // In production, this would integrate with Pi SDK
    try {
      // Mock payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsProcessing(false)
      setIsSuccess(true)

      setTimeout(() => {
        onSuccess?.()
        onOpenChange(false)
        setIsSuccess(false)
      }, 2000)
    } catch (error) {
      setIsProcessing(false)
      console.error("Payment failed:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-[#FFC107]" />
            Pay with Pi
          </DialogTitle>
          <DialogDescription>Complete your payment securely using Pi Network</DialogDescription>
        </DialogHeader>

        {!isSuccess ? (
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Service</span>
                <span className="font-medium">{serviceName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Amount</span>
                <div className="flex items-center gap-1">
                  <Coins className="h-4 w-4 text-[#FFC107]" />
                  <span className="font-bold text-lg">{amount} π</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 p-3 bg-[#FFC107]/10 rounded-lg border border-[#FFC107]/20">
              <p className="text-sm font-medium">Payment Details</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Secure Pi Network transaction</li>
                <li>• Instant confirmation</li>
                <li>• No additional fees</li>
                <li>• Receipt sent to your account</li>
              </ul>
            </div>

            <Button
              onClick={handlePayWithPi}
              disabled={isProcessing}
              className="w-full bg-[#FFC107] text-black hover:bg-[#FFB300]"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <Coins className="mr-2 h-4 w-4" />
                  Pay {amount} π Now
                </>
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By proceeding, you agree to the Pi Network payment terms
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-semibold">Payment Successful!</h3>
              <p className="text-sm text-muted-foreground">Your transaction has been completed</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
