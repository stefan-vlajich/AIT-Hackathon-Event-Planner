import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/home/Hero'
import { EventsSection } from '@/components/home/EventsSection'
import { ExploreSection } from '@/components/home/ExploreSection'

export function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <EventsSection />
      <ExploreSection />
      <Footer />
    </div>
  )
}
