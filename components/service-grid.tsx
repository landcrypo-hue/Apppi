import { ServiceCard } from "@/components/service-card"
import { FileText, Building2, Home, MapPin, Phone, Shield, Briefcase, Search } from "lucide-react"

const services = [
  {
    icon: FileText,
    title: "Document Lookup",
    description: "Search and verify official documents",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    icon: Building2,
    title: "Administrative Guide",
    description: "Step-by-step administrative procedures",
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  },
  {
    icon: Home,
    title: "Real Estate Info",
    description: "Browse property and project details",
    color: "bg-green-500/10 text-green-600 dark:text-green-400",
  },
  {
    icon: Briefcase,
    title: "Business Registry",
    description: "Search companies and organizations",
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  },
  {
    icon: MapPin,
    title: "Location Services",
    description: "Find nearby offices and services",
    color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  },
  {
    icon: Phone,
    title: "Contact Verification",
    description: "Verify phone numbers and contacts",
    color: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  },
  {
    icon: Shield,
    title: "Security Services",
    description: "Identity verification and security",
    color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  },
  {
    icon: Search,
    title: "General Search",
    description: "Universal search across all services",
    color: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
  },
]

export function ServiceGrid() {
  return (
    <section className="container px-4 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Available Services</h2>
        <p className="text-sm text-muted-foreground">Access all your essential e-services in one place</p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </section>
  )
}
