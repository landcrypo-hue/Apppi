"use client"

import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  CreditCard,
  Bell,
  Lock,
  Languages,
  Moon,
  LogOut,
  ChevronRight,
  Fingerprint,
  Wallet,
  Settings,
} from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-24 pt-20">
        <div className="container max-w-2xl mx-auto px-4 py-6 space-y-6">
          {/* Profile Header */}
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-2xl font-bold">
                AB
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold">Ahmed Benali</h2>
                <p className="text-sm text-muted-foreground">ahmed.benali@email.com</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    CIN: AB123456
                  </Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Pi Wallet Balance */}
          <Card className="p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-[#FFC107] flex items-center justify-center">
                  <Wallet className="h-6 w-6 text-black" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pi Wallet Balance</p>
                  <p className="text-2xl font-bold">12.50 π</p>
                </div>
              </div>
              <Button size="sm">Add Funds</Button>
            </div>
          </Card>

          {/* Account Settings */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-muted-foreground px-2">Account Settings</h3>
            <Card className="divide-y">
              <Button variant="ghost" className="w-full justify-between h-auto py-4 px-4" asChild>
                <a href="/services/identity">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <div className="text-left">
                      <p className="font-medium text-sm">Identity Vault</p>
                      <p className="text-xs text-muted-foreground">Secure document storage</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </a>
              </Button>

              <Button variant="ghost" className="w-full justify-between h-auto py-4 px-4">
                <div className="flex items-center gap-3">
                  <Fingerprint className="h-5 w-5 text-muted-foreground" />
                  <div className="text-left">
                    <p className="font-medium text-sm">Biometric Login</p>
                    <p className="text-xs text-muted-foreground">Fingerprint & face recognition</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>

              <Button variant="ghost" className="w-full justify-between h-auto py-4 px-4" asChild>
                <a href="/services/pi-wallet">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div className="text-left">
                      <p className="font-medium text-sm">Payment Methods</p>
                      <p className="text-xs text-muted-foreground">Manage Pi & cards</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </a>
              </Button>
            </Card>
          </div>

          {/* Preferences */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-muted-foreground px-2">Preferences</h3>
            <Card className="divide-y">
              <Button variant="ghost" className="w-full justify-between h-auto py-4 px-4">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium text-sm">Notifications</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>

              <Button variant="ghost" className="w-full justify-between h-auto py-4 px-4">
                <div className="flex items-center gap-3">
                  <Languages className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium text-sm">Language</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">English</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </Button>

              <Button variant="ghost" className="w-full justify-between h-auto py-4 px-4">
                <div className="flex items-center gap-3">
                  <Moon className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium text-sm">Dark Mode</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Card>
          </div>

          {/* Security */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-muted-foreground px-2">Security</h3>
            <Card className="divide-y">
              <Button variant="ghost" className="w-full justify-between h-auto py-4 px-4">
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium text-sm">Change Password</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>

              <Button variant="ghost" className="w-full justify-between h-auto py-4 px-4">
                <div className="flex items-center gap-3">
                  <Settings className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium text-sm">Privacy Settings</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Card>
          </div>

          {/* Logout */}
          <Button variant="outline" className="w-full text-destructive bg-transparent" size="lg">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
