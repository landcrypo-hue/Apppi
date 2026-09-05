"use client"

import { Menu, Globe, Wallet, UserCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePiAuth } from "@/contexts/pi-auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function Header() {
  const { isAuthenticated, userData, reinitialize } = usePiAuth()
  const [language, setLanguage] = useState<"en" | "fr" | "ar">("en")
  const router = useRouter()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground">
              <span className="text-lg font-bold">E</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold leading-none">Eservices</h1>
              <span className="text-xs text-muted-foreground">Pi Powered</span>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Language picker */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Language</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("fr")}>Francais</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("ar")}>العربية (Darija)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Auth state */}
          {isAuthenticated && userData ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Wallet className="h-4 w-4 text-primary" />
                  <span className="hidden sm:inline">{userData.username}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>Pi Network Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground">Username</span>
                    <span className="font-medium">{userData.username}</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground">Pi Credits</span>
                    <span className="font-bold text-primary">{userData.credits_balance} Pi</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  <UserCircle className="h-4 w-4 mr-2" />
                  View Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/services/pi-wallet")}>
                  <Wallet className="h-4 w-4 mr-2" />
                  Pi Wallet
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button size="sm" onClick={reinitialize} className="gap-2">
              <Wallet className="h-4 w-4" />
              <span>Login with Pi</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
