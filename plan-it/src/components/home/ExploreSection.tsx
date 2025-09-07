import { Button } from '@/components/ui/button'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

export function ExploreSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden" style={{ backgroundColor: '#73F64B' }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        {/* Floating geometric shapes */}
        <div className="absolute top-10 left-10 w-12 h-12 border-2 border-black rotate-45 animate-bounce delay-300"></div>
        <div className="absolute top-20 right-20 w-8 h-8 bg-black rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-1 bg-black animate-pulse delay-500"></div>
        <div className="absolute bottom-10 right-1/3 w-10 h-10 border-2 border-black rounded-full animate-spin delay-2000"></div>
        
        {/* Diagonal animated lines */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-black/30 transform rotate-1 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-full h-0.5 bg-black/30 transform -rotate-1 animate-pulse delay-1500"></div>
      </div>

      <div className="max-w-6xl mx-auto text-center px-6 lg:px-8 relative z-10">
        {/* Animated title with typewriter effect */}
        <h2 className={`font-arial-black text-6xl md:text-8xl lg:text-9xl font-black text-black mb-12 leading-tight tracking-tighter
                       transition-all duration-1200 ${
                         isVisible 
                           ? 'translate-y-0 opacity-100 scale-100' 
                           : 'translate-y-12 opacity-0 scale-95'
                       }`}>
          <span className={`inline-block transition-all duration-800 ${isVisible ? 'animate-[gentleBounce_3s_ease-in-out_forwards]' : ''}`}>
            Explore
          </span>
          <br />
          <span className={`inline-block transition-all duration-800 delay-300 ${isVisible ? 'animate-[gentleBounce_3s_ease-in-out_forwards]' : ''}`}>
            Events That
          </span>
          <br />
          <span className={`inline-block transition-all duration-800 delay-600 ${isVisible ? 'animate-[gentleBounce_3s_ease-in-out_forwards]' : ''}`}>
            Inspire
          </span>
        </h2>
        
        {/* CTA Button with pulse animation */}
        <div className="flex justify-center">
          <Button 
            size="lg" 
            variant="outline"
            className={`bg-transparent border-black text-black hover:bg-black hover:text-white font-semibold px-16 py-6 text-xl rounded-none
                       transform transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-black/30
                       ${isVisible 
                         ? 'translate-y-0 opacity-100 animate-pulse' 
                         : 'translate-y-8 opacity-0'
                       }`}
            style={{ transitionDelay: '900ms' }}
            asChild
          >
            <Link to="/signup">SIGN UP</Link>
          </Button>
        </div>

        {/* Floating call-to-action elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-1/4 left-1/4 transform transition-all duration-1000 ${
            isVisible ? 'translate-x-2 translate-y-2 opacity-30' : 'translate-x-0 translate-y-0 opacity-0'
          }`}>
            <div className="w-4 h-4 bg-black rounded-full animate-ping delay-2000"></div>
          </div>
          <div className={`absolute bottom-1/4 right-1/4 transform transition-all duration-1000 ${
            isVisible ? '-translate-x-3 -translate-y-1 opacity-30' : 'translate-x-0 translate-y-0 opacity-0'
          }`}>
            <div className="w-3 h-3 bg-black rotate-45 animate-spin delay-1500" style={{ animationDuration: '4s' }}></div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes gentleBounce {
          0% {
            transform: translateY(0);
          }
          10% {
            transform: translateY(-15px);
          }
          20% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-10px);
          }
          40% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
          60% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
