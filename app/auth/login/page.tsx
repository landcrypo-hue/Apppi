"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { usePiAuth } from "@/components/pi-auth-provider"
import { Wallet, Shield, ArrowLeft, AlertCircle, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function LoginPage() {
  const { isAuthenticated, login, error, isLoading, sdkAvailable } = usePiAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Button variant="ghost" size="sm" className="absolute top-4 left-4" onClick={() => router.push("/")}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Button>

      <div className="w-full max-w-md space-y-4">
        <div className="text-center space-y-2">
          <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <span className="text-3xl font-bold">E</span>
          </div>
          <h1 className="text-3xl font-bold">Welcome to Eservices</h1>
          <p className="text-muted-foreground">Secure, fast, and trusted digital services</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Authentication Error</AlertTitle>
            <AlertDescription className="whitespace-pre-wrap">{error}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Login to Your Account</CardTitle>
            <CardDescription>
              Eservices requires Pi Network authentication for secure access to all features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={login}
              disabled={isLoading || !sdkAvailable}
              className="w-full h-14 text-lg gap-3 bg-gradient-to-r from-primary to-accent"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin" />
                  Authenticating with Pi Network...
                </>
              ) : (
                <>
                  <Wallet className="h-6 w-6" />
                  Login with Pi Network
                </>
              )}
            </Button>

            {/* SDK Status */}
            <div className="flex items-center justify-center gap-2 text-sm py-2">
              <div
                className={`h-2 w-2 rounded-full ${sdkAvailable ? "bg-green-500 animate-pulse" : "bg-yellow-500 animate-pulse"}`}
              />
              <span className="text-muted-foreground">
                {sdkAvailable ? "Pi Network Connected (Sandbox Mode)" : "Connecting to Pi Network..."}
              </span>
            </div>

            {/* Security Info */}
            <div className="flex items-start gap-3 text-sm text-muted-foreground pt-4 pb-2 border-t">
              <Shield className="h-5 w-5 shrink-0 mt-0.5 text-primary" />
              <div className="space-y-1">
                <p className="font-medium text-foreground">Why Pi Network?</p>
                <ul className="space-y-1 text-xs leading-relaxed">
                  <li>• Blockchain-verified identity protection</li>
                  <li>• Secure cryptocurrency payments (0.25 Pi per service)</li>
                  <li>• GDPR & PCI DSS Level 1 compliant</li>
                  <li>• No passwords to remember or manage</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          Don't have a Pi account?{" "}
          <a
            href="https://minepi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Join Pi Network
          </a>
        </p>
      </div>
    </div>
  )
}
