"use client"

import { usePiAuth } from "@/components/pi-auth-provider"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Wallet, X, RefreshCw } from "lucide-react"
import { useState } from "react"

export function AuthStatusBanner() {
  const { isAuthenticated, error, login, clearError } = usePiAuth()
  const [dismissed, setDismissed] = useState(false)

  // Don't show if authenticated or dismissed
  if (isAuthenticated || dismissed) return null

  if (error) {
    return (
      <div className="border-b bg-destructive/10">
        <div className="container px-4 py-3">
          <Alert variant="destructive" className="border-0 bg-transparent">
            <AlertDescription className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="font-semibold text-sm mb-1">Pi Network Connection Issue</p>
                  <pre className="text-xs whitespace-pre-wrap font-sans">{error}</pre>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    clearError()
                    setDismissed(true)
                  }}
                  className="shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Button size="sm" variant="outline" onClick={login}>
                  <Wallet className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    window.location.reload()
                  }}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Page
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  return (
    <div className="border-b bg-primary/5">
      <div className="container px-4 py-2">
        <Alert className="border-0 bg-transparent py-2">
          <AlertDescription className="flex items-center justify-between gap-4">
            <span className="text-sm">
              <strong>Welcome!</strong> Login with Pi Network to access all features including payments, documents, and
              personalized services.
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <Button size="sm" onClick={login}>
                <Wallet className="h-4 w-4 mr-2" />
                Login
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setDismissed(true)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
