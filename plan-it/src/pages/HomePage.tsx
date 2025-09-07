import { Navigation } from '@/components/layout/Navigation'
import { Hero } from '@/components/home/Hero'
import { HeroImageInstructions } from '@/components/home/HeroImageInstructions'

export function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <HeroImageInstructions />
    </div>
  )
}
