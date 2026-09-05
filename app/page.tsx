import { Header } from "@/components/header"
import { ServiceGrid } from "@/components/service-grid"
import { AIAssistant } from "@/components/ai-assistant"
import { QuickActions } from "@/components/quick-actions"
import { FeaturedServices } from "@/components/featured-services"
import { StatusTracker } from "@/components/status-tracker"
import { BottomNav } from "@/components/bottom-nav"
import { ErrorBoundary } from "@/components/error-boundary"
import { WelcomeHero } from "@/components/welcome-hero"
import { PiStatusDisplay } from "@/components/pi-status-display"
export default function HomePage() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container px-4 pt-4">
          <PiStatusDisplay />
        </div>
        <WelcomeHero />
        <main className="pb-24">
          <QuickActions />
          <FeaturedServices />
          <ServiceGrid />
          <StatusTracker />
        </main>
        <BottomNav />
        <AIAssistant />
      </div>
    </ErrorBoundary>
  )
}
