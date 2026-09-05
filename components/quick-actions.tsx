import { Search, Bell, User } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function QuickActions() {
  return (
    <section className="container px-4 py-6">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder="Search services, documents, or get help..." className="h-12 pl-10 pr-4" />
        </div>
        <div className="flex items-center gap-3">
          <Card className="flex flex-1 items-center gap-3 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <User className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">Welcome back</p>
              <p className="text-xs text-muted-foreground truncate">Access your services</p>
            </div>
          </Card>
          <Button size="icon" variant="outline" className="h-14 w-14 shrink-0 bg-transparent">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
