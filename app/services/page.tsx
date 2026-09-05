"use client"

import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Card } from "@/components/ui/card"
import {
  FileText,
  CreditCard,
  Building2,
  Shield,
  Home,
  Scan,
  UserCheck,
  Wallet,
  ClipboardList,
  HelpCircle,
} from "lucide-react"
import Link from "next/link"

const allServices = [
  {
    title: "Document Requests",
    description: "Certificates, attestations & official documents",
    icon: FileText,
    href: "/services/documents",
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Payments & Billing",
    description: "Pay bills, fees & services with Pi or cards",
    icon: CreditCard,
    href: "/services/payments",
    color: "from-green-500 to-green-600",
  },
  {
    title: "Company Lookup",
    description: "Search RC, ICE, dirigeants & tax status",
    icon: Building2,
    href: "/services/company-lookup",
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Identity Vault",
    description: "Secure storage for CIN, passport & IDs",
    icon: Shield,
    href: "/services/identity",
    color: "from-red-500 to-red-600",
  },
  {
    title: "Real Estate & Syndic",
    description: "Property services, repairs & fees",
    icon: Home,
    href: "/services/syndic",
    color: "from-orange-500 to-orange-600",
  },
  {
    title: "Document Scanner",
    description: "OCR scan, auto-fill & digital signatures",
    icon: Scan,
    href: "/services/scanner",
    color: "from-teal-500 to-teal-600",
  },
  {
    title: "Contact Verification",
    description: "Verify phone numbers & addresses",
    icon: UserCheck,
    href: "/services/verification",
    color: "from-indigo-500 to-indigo-600",
  },
  {
    title: "Pi Wallet",
    description: "Manage your Pi coins & transactions",
    icon: Wallet,
    href: "/services/pi-wallet",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    title: "My Requests",
    description: "Track status of all your requests",
    icon: ClipboardList,
    href: "/services/requests",
    color: "from-pink-500 to-pink-600",
  },
  {
    title: "Support & Help",
    description: "Live chat, tickets & FAQs",
    icon: HelpCircle,
    href: "/services/support",
    color: "from-cyan-500 to-cyan-600",
  },
]

export default function AllServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-24 pt-20">
        <div className="container max-w-2xl mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">All Services</h1>
            <p className="text-muted-foreground">Access all available e-services in one place</p>
          </div>

          <div className="grid gap-4">
            {allServices.map((service) => {
              const Icon = service.icon
              return (
                <Link key={service.title} href={service.href}>
                  <Card className="p-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${service.color} text-white`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm mb-1">{service.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{service.description}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
