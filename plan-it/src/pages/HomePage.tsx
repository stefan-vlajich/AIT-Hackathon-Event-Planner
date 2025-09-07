import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/home/Hero'
import { EventsSection } from '@/components/home/EventsSection'
import { ExploreSection } from '@/components/home/ExploreSection'

// Animated section divider component
const AnimatedDivider = ({ variant = 'default' }: { variant?: 'default' | 'reverse' }) => {
  return (
    <div className="relative h-32 bg-black overflow-hidden">
      {/* Animated wave divider */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${variant === 'reverse' ? 'animate-pulse' : ''}`}>
          {/* Animated lines */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-green to-transparent animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-green to-transparent animate-pulse delay-1000"></div>
          
          {/* Moving dots */}
          <div className="absolute top-1/2 left-0 w-2 h-2 bg-brand-green rounded-full animate-bounce delay-200"></div>
          <div className="absolute top-1/2 right-0 w-2 h-2 bg-brand-green rounded-full animate-bounce delay-700"></div>
          
          {/* Diagonal animated lines */}
          <div className="absolute inset-0 overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-0.5 bg-brand-green transform rotate-2 origin-left 
                            ${variant === 'reverse' ? 'animate-pulse delay-300' : 'animate-pulse delay-500'}`}></div>
            <div className={`absolute bottom-0 right-0 w-full h-0.5 bg-brand-green transform -rotate-2 origin-right 
                            ${variant === 'reverse' ? 'animate-pulse delay-800' : 'animate-pulse delay-1200'}`}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <AnimatedDivider />
      <EventsSection />
      <AnimatedDivider variant="reverse" />
      <ExploreSection />
      <Footer />
    </div>
  )
}
