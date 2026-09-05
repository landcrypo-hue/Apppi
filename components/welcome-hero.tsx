"use client"

import { usePiAuth } from "@/contexts/pi-auth-context"
import { Card, CardContent } from "@/components/ui/card"
import { Wallet, Shield, Zap, Globe, Loader2, Coins } from "lucide-react"

export function WelcomeHero() {
  const { isAuthenticated, authMessage, hasError, reinitialize } = usePiAuth()

  if (isAuthenticated) return null

  const isConnecting = !hasError

  return (
    <div className="container px-4 py-8">
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col items-center text-center gap-6">

            {/* Logo */}
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg">
              <span className="text-3xl font-bold">E</span>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Welcome to Eservices</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                All-in-one digital services platform powered exclusively by Pi Network
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full border text-sm">
                <Shield className="h-4 w-4 text-primary" />
                <span>Blockchain Secured</span>
              </div>
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full border text-sm">
                <Coins className="h-4 w-4 text-primary" />
                <span>0.25 Pi per Service</span>
              </div>
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full border text-sm">
                <Globe className="h-4 w-4 text-primary" />
                <span>EN / FR / AR</span>
              </div>
            </div>

            {/* Auth Status */}
            <div className="flex flex-col items-center gap-3 w-full max-w-md pt-2">
              <div className="w-full rounded-xl border bg-card p-4 flex flex-col items-center gap-3">
                <div className="flex items-center gap-3">
                  {isConnecting && !hasError ? (
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  ) : (
                    <Wallet className="h-6 w-6 text-primary" />
                  )}
                  <span className="font-medium text-sm">{authMessage}</span>
                </div>

                {hasError && (
                  <button
                    onClick={reinitialize}
                    className="w-full py-2 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <Wallet className="h-4 w-4" />
                    Retry Pi Network Login
                  </button>
                )}
              </div>

              {/* SDK Status indicator */}
              <div className="flex items-center gap-2 text-sm">
                <div className={`h-2 w-2 rounded-full ${hasError ? "bg-red-500" : "bg-yellow-500 animate-pulse"}`} />
                <span className="text-muted-foreground">
                  {hasError ? "Connection failed — open in Pi Browser" : "Connecting to Pi Network (Sandbox)..."}
                </span>
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl pt-4">
              {[
                {
                  icon: Coins,
                  title: "Pi Payments Only",
                  desc: "All transactions in Pi with transparent 0.25 Pi service fee",
                },
                {
                  icon: Shield,
                  title: "Decentralized & Secure",
                  desc: "Blockchain-verified transactions with Pi KYC integration",
                },
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  desc: "Complete services in under 90 seconds",
                },
                {
                  icon: Globe,
                  title: "Multilingual AI",
                  desc: "Smart support in English, French, and Arabic (Darija)",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-start gap-3 text-left p-4 rounded-lg bg-card/50 border"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{title}</h3>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground pt-2">
              New to Pi?{" "}
              <a
                href="https://minepi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Join Pi Community
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
