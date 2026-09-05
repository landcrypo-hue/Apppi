"use client"
import { Button } from "@/components/ui/button"
import { FileText, CreditCard, Home, User } from "lucide-react"

const featured = [
  {
    icon: FileText,
    title: "Request Document",
    description: "Certificates & Attestations",
    color: "bg-blue-500",
    href: "/services/documents",
  },
  {
    icon: CreditCard,
    title: "Pay Bills",
    description: "Utilities & Fees",
    color: "bg-green-500",
    href: "/services/payments",
  },
  {
    icon: Home,
    title: "Syndic Services",
    description: "Real Estate Management",
    color: "bg-orange-500",
    href: "/services/syndic",
  },
  {
    icon: User,
    title: "Identity Vault",
    description: "Secure Documents",
    color: "bg-purple-500",
    href: "/services/identity",
  },
]

export function FeaturedServices() {
  return (
    <section className="container px-4 py-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Quick Access</h2>
        <p className="text-sm text-muted-foreground">Most used services</p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {featured.map((service) => (
          <Button
            key={service.title}
            variant="outline"
            className="h-auto flex-col gap-3 p-4 hover:bg-accent bg-transparent"
            asChild
          >
            <a href={service.href}>
              <div className={`${service.color} p-3 rounded-lg text-white`}>
                <service.icon className="h-6 w-6" />
              </div>
              <div className="space-y-1 text-center">
                <div className="text-sm font-semibold">{service.title}</div>
                <div className="text-xs text-muted-foreground">{service.description}</div>
              </div>
            </a>
          </Button>
        ))}
      </div>
    </section>
  )
}
