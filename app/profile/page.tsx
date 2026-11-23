"use client";

import React from "react";
import { usePiAuth } from "@/contexts/pi-auth-context";
import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Wallet, ShieldCheck, LogOut, RefreshCw } from "lucide-react";

export default function ProfilePage() {
  const {
    isAuthenticated,
    authMessage,
    hasError,
    userData,
    error,
    reinitialize,
    logout,
  } = usePiAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pb-24 pt-20">
        <div className="container max-w-2xl mx-auto px-4 py-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Profile</h1>
            <Badge variant={isAuthenticated ? "default" : "secondary"}>
              {isAuthenticated ? "Connected" : "Guest"}
            </Badge>
          </div>

          {!isAuthenticated || !userData ? (
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-6 w-6 text-primary" />
                <div>
                  <h2 className="font-semibold text-lg">Pi Network Session</h2>
                  <p className="text-sm text-muted-foreground">
                    Not authenticated with Pi Network.
                  </p>
                </div>
              </div>

              {(error || hasError || authMessage) && (
                <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                  {error || authMessage}
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <Button onClick={() => void reinitialize()} className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Connect with Pi
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="p-6 space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">@{userData.username}</h2>
                    <p className="text-xs text-muted-foreground">
                      ID: {userData.id}
                    </p>
                  </div>
                </div>
                <Badge className="gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Authenticated
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-lg border p-4 space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Wallet className="h-4 w-4" />
                    <span>Credits Balance</span>
                  </div>
                  <p className="text-lg font-semibold">
                    {userData.credits_balance} Pi
                  </p>
                </div>

                <div className="rounded-lg border p-4 space-y-1">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <p className="text-lg font-semibold">
                    {authMessage || `Connected as @${userData.username}`}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => void reinitialize()}
                  className="gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh Session
                </Button>
                <Button
                  variant="destructive"
                  onClick={logout}
                  className="gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  LogOut
                </Button>
              </div>
            </Card>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
