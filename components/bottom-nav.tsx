"use client"

import { Home, FileText, CreditCard, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-4">
        <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto py-2" asChild>
          <a href="/">
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </a>
        </Button>
        <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto py-2" asChild>
          <a href="/services/documents">
            <FileText className="h-5 w-5" />
            <span className="text-xs">Documents</span>
          </a>
        </Button>
        <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto py-2" asChild>
          <a href="/services/payments">
            <CreditCard className="h-5 w-5" />
            <span className="text-xs">Payments</span>
          </a>
        </Button>
        <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto py-2" asChild>
          <a href="/profile">
            <User className="h-5 w-5" />
            <span className="text-xs">Profile</span>
          </a>
        </Button>
        <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto py-2" asChild>
          <a href="/services">
            <Menu className="h-5 w-5" />
            <span className="text-xs">Services</span>
          </a>
        </Button>
      </div>
    </nav>
  )
}
