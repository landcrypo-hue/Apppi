import { Card } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  color: string
}

export function ServiceCard({ icon: Icon, title, description, color }: ServiceCardProps) {
  return (
    <Card className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg hover:scale-105 active:scale-95">
      <div className="flex flex-col items-center gap-3 p-4 text-center">
        <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${color}`}>
          <Icon className="h-7 w-7" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-semibold leading-tight">{title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
        </div>
      </div>
    </Card>
  )
}
