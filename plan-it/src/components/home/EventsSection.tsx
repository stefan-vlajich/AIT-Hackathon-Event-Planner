import { Button } from '@/components/ui/button'
import { useState, useEffect, useRef } from 'react'

export function EventsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])
  const sampleEvents = [
    {
      id: 1,
      artistName: "Tech Innovation Summit",
      date: "Oct 15, 2025",
      place: "San Francisco, CA"
    },
    {
      id: 2,
      artistName: "Art & Culture Festival",
      date: "Oct 22, 2025",
      place: "New York, NY"
    },
    {
      id: 3,
      artistName: "Startup Pitch Night",
      date: "Nov 5, 2025",
      place: "Austin, TX"
    },
    {
      id: 4,
      artistName: "Food & Wine Expo",
      date: "Nov 12, 2025",
      place: "Napa Valley, CA"
    },
    {
      id: 5,
      artistName: "Music & Beats Conference",
      date: "Nov 18, 2025",
      place: "Nashville, TN"
    },
    {
      id: 6,
      artistName: "Wellness Retreat Weekend",
      date: "Dec 3, 2025",
      place: "Sedona, AZ"
    },
    {
      id: 7,
      artistName: "Gaming Convention",
      date: "Dec 10, 2025",
      place: "Los Angeles, CA"
    },
    {
      id: 8,
      artistName: "Environmental Action Summit",
      date: "Dec 15, 2025",
      place: "Seattle, WA"
    }
  ]

  return (
    <section ref={sectionRef} className="bg-black pb-16 relative overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-20 h-20 border border-brand-green rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-20 left-20 w-16 h-16 border border-brand-green rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-1 h-32 bg-brand-green animate-pulse"></div>
      </div>

      <div className="w-full relative z-10">
        {/* Title with slide-in animation */}
        <div className="text-left py-16 pl-8">
          <h2 className={`font-arial-black text-6xl md:text-8xl lg:text-9xl font-black text-brand-green uppercase leading-tight tracking-tighter
                         transition-all duration-1000 ${
                           isVisible 
                             ? 'translate-x-0 opacity-100' 
                             : '-translate-x-20 opacity-0'
                         }`}>
            WHAT'S
            <br />
            GOING ON
          </h2>
        </div>

        <div className="px-8">
          {/* Events grid with staggered animations */}
          <div className="grid grid-cols-4 grid-rows-2 w-full h-full">
            {sampleEvents.map((event, index) => (
              <div 
                key={event.id} 
                className={`bg-white h-[36rem] border border-black transition-all duration-700 hover:scale-105 transform
                           ${isVisible 
                             ? 'translate-y-0 opacity-100' 
                             : 'translate-y-10 opacity-0'
                           }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* 40% - Image section */}
                <div className="h-2/5 bg-gray-300 flex items-center justify-center relative overflow-hidden group">
                  <div className="text-gray-500 text-sm font-medium z-10">
                    Image Placeholder
                  </div>
                  {/* Animated overlay on hover */}
                  <div className="absolute inset-0 bg-brand-green/20 transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                </div>
                
                {/* 60% - Green section with content */}
                <div className="h-3/5 p-8 flex flex-col justify-center items-center text-center hover:bg-opacity-90 transition-all duration-300" 
                     style={{ backgroundColor: '#73F64B' }}>
                  <div className="flex flex-col items-center space-y-8">
                    {/* Artist Name */}
                    <h3 className="text-black font-bold text-xl md:text-2xl leading-tight uppercase transform hover:scale-105 transition-transform duration-200">
                      {event.artistName}
                    </h3>
                    
                    {/* Date | Place */}
                    <p className="text-black text-base font-medium">
                      {event.date} | {event.place}
                    </p>
                    
                    {/* More Info Hyperlink */}
                    <a 
                      href="#"
                      className="text-black font-semibold text-base underline hover:no-underline transition-all duration-200 hover:scale-110 transform"
                    >
                      More Info
                    </a>
                    
                    {/* Buy Tickets Button */}
                    <div className="mt-6">
                      <Button 
                        size="lg"
                        variant="outline"
                        className="w-auto px-8 bg-transparent border-black text-black hover:bg-black hover:text-white font-semibold py-6 rounded-none transform hover:scale-110 transition-all duration-300"
                      >
                        Buy Tickets
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* All Shows Button with delayed animation */}
          <div className="flex justify-center mt-12">
            <Button 
              size="lg"
              variant="outline"
              className={`bg-transparent border-white text-white hover:bg-white hover:text-black font-semibold px-20 py-6 text-xl rounded-none
                         transform hover:scale-110 transition-all duration-300 ${
                           isVisible 
                             ? 'translate-y-0 opacity-100' 
                             : 'translate-y-8 opacity-0'
                         }`}
              style={{ transitionDelay: '800ms' }}
            >
              All Shows
            </Button>
          </div>
        </div>
      </div>

      {/* Custom slow spin animation */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </section>
  )
}
