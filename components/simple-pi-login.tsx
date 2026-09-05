"use client"

import { useState } from "react"
import { usePiAuth } from "@/components/pi-auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Wallet, Loader2, AlertCircle } from "lucide-react"

export function SimplePiLogin() {
  const { login, isLoading, sdkAvailable, error, clearError } = usePiAuth()
  const [localError, setLocalError] = useState<string | null>(null)

  const handleLogin = async () => {
    setLocalError(null)
    clearError()
    try {
      await login()
    } catch (err: any) {
      setLocalError(err?.message || "Login failed")
    }
  }

  const displayError = error || localError

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg">
            <Wallet className="h-8 w-8" />
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">Login with Pi Network</h2>
            <p className="text-sm text-muted-foreground">Access all Eservices features with your Pi account</p>
          </div>

          {displayError && (
            <div className="w-full p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{displayError}</p>
            </div>
          )}

          <Button size="lg" className="w-full gap-2" onClick={handleLogin} disabled={isLoading || !sdkAvailable}>
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Authenticating...
              </>
            ) : (
              <>
                <Wallet className="h-5 w-5" />
                Login with Pi
              </>
            )}
          </Button>

          <div className="flex items-center gap-2 text-sm">
            <div className={`h-2 w-2 rounded-full ${sdkAvailable ? "bg-green-500" : "bg-yellow-500"} animate-pulse`} />
            <span className="text-muted-foreground">
              {sdkAvailable ? "Pi SDK Ready (Testnet)" : "Initializing Pi SDK..."}
            </span>
          </div>

          {!sdkAvailable && (
            <p className="text-xs text-center text-muted-foreground max-w-sm">
              Please ensure you're using the Pi Browser app for the best experience.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
