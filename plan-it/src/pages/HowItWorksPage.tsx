import React from 'react'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Target, Handshake, PartyPopper, RefreshCw } from 'lucide-react'

export function HowItWorksPage() {
  const roles = [
    {
      title: "For Planners",
      icon: Target,
      description: "Start by creating your event in minutes. Add the details, set your ticketing options, and instantly open the doors to attendees. From your dashboard, you can track RSVPs, send updates, and manage communication all in one place. And when you need extra support—like a DJ, caterer, or photographer—you can connect directly with partners ready to bring your vision to life."
    },
    {
      title: "For Partners",
      icon: Handshake,
      description: "Opportunities shouldn't be hidden. With our platform, you can browse upcoming events that match your skills, submit proposals to planners, and showcase your portfolio. It's a direct line between your talent and the people who need it, helping you build your business while focusing on what you do best."
    },
    {
      title: "For Attendees",
      icon: PartyPopper,
      description: "Finding and joining great events should be effortless. Explore events by category, location, or date, then RSVP or buy tickets in just a few clicks. You'll receive real-time notifications about updates and announcements, so you're always in the loop. All that's left is to show up and make memories."
    }
  ]

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-black pb-16">
        <div className="w-full">
          <div className="text-left py-16 pl-8">
            <h1 className="font-arial-black text-5xl md:text-7xl lg:text-8xl font-black text-brand-green uppercase leading-tight tracking-tighter">
              HOW IT
              <br />
              WORKS
            </h1>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="relative py-20 overflow-hidden" style={{ backgroundColor: '#73F64B' }}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{ 
            backgroundImage: `radial-gradient(circle at 25% 25%, #000000 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, #000000 2px, transparent 2px)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-arial-black text-5xl md:text-7xl lg:text-8xl font-black text-black mb-8 leading-tight tracking-tighter">
              BRINGING
              <br />
              PEOPLE
              <br />
              TOGETHER
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="font-rubik text-lg md:text-xl text-black leading-relaxed">
                Bringing people together should feel simple. That's why we've designed a platform that connects planners, partners, and attendees in one seamless experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roles Section - Creative Layout */}
      <section className="relative py-32 bg-black overflow-hidden">
        {/* Diagonal Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #73F64B,
              #73F64B 10px,
              transparent 10px,
              transparent 20px
            )`
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-32">
            {roles.map((role, index) => (
              <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                {/* Icon Section with Creative Background */}
                <div className="w-1/2 flex justify-center">
                  <div className="relative">
                    {/* Outer Ring */}
                    <div className="w-48 h-48 rounded-full border-4 border-brand-green/30 flex items-center justify-center">
                      {/* Inner Circle */}
                      <div className="w-40 h-40 rounded-full flex items-center justify-center" style={{ backgroundColor: '#73F64B' }}>
                        {React.createElement(role.icon, { className: "w-20 h-20 text-black" })}
                      </div>
                    </div>
                    {/* Floating Elements */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-brand-green/20"></div>
                    <div className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full bg-brand-green/30"></div>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="w-1/2 px-12">
                  <div className="relative">
                    {/* Background Shape */}
                    <div className="absolute -inset-4 bg-brand-green/5 rounded-3xl transform rotate-1"></div>
                    <div className="relative bg-black/50 backdrop-blur-sm rounded-2xl p-8 border border-brand-green/20">
                      <h3 className="font-arial-black text-3xl md:text-4xl font-black text-brand-green mb-6 uppercase tracking-tighter">
                        {role.title}
                      </h3>
                      <p className="font-rubik text-base text-white leading-relaxed">
                        {role.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connection Flow - Creative Visual */}
      <section className="relative py-32 overflow-hidden" style={{ backgroundColor: '#73F64B' }}>
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-black/10"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-black/10"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-black/10"></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center px-6 lg:px-8">
          <h2 className="font-arial-black text-5xl md:text-7xl lg:text-8xl font-black text-black mb-16 leading-tight tracking-tighter">
            THE CYCLE
            <br />
            OF CONNECTION
          </h2>
          
          {/* Creative Flow Diagram */}
          <div className="relative max-w-4xl mx-auto mb-16">
            {/* Central Hub */}
            <div className="relative w-80 h-80 mx-auto">
              {/* Center Circle */}
              <div className="absolute inset-0 rounded-full border-8 border-black flex items-center justify-center bg-white shadow-2xl">
                <div className="text-center">
                  <RefreshCw className="w-16 h-16 text-black mb-4 mx-auto animate-spin" style={{ animationDuration: '8s' }} />
                  <p className="font-rubik font-bold text-black text-lg uppercase">Together</p>
                </div>
              </div>
              
              {/* Connection Lines */}
              <div className="absolute inset-0">
                <svg className="w-full h-full">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#73F64B" />
                      <stop offset="100%" stopColor="#000000" />
                    </linearGradient>
                  </defs>
                  <line x1="50%" y1="20%" x2="50%" y2="80%" stroke="url(#lineGradient)" strokeWidth="4" strokeDasharray="10,5" />
                  <line x1="20%" y1="50%" x2="80%" y2="50%" stroke="url(#lineGradient)" strokeWidth="4" strokeDasharray="10,5" />
                </svg>
              </div>
              
              {/* Role Circles with Creative Styling */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8">
                <div className="w-28 h-28 rounded-full bg-black flex items-center justify-center shadow-xl border-4 border-brand-green">
                  <div className="text-center text-white">
                    <Target className="w-8 h-8 text-white mb-2 mx-auto" />
                    <p className="font-rubik font-bold text-sm">Planners</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 transform translate-x-8 translate-y-8">
                <div className="w-28 h-28 rounded-full bg-black flex items-center justify-center shadow-xl border-4 border-brand-green">
                  <div className="text-center text-white">
                    <Handshake className="w-8 h-8 text-white mb-2 mx-auto" />
                    <p className="font-rubik font-bold text-sm">Partners</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-0 right-0 transform -translate-x-8 translate-y-8">
                <div className="w-28 h-28 rounded-full bg-black flex items-center justify-center shadow-xl border-4 border-brand-green">
                  <div className="text-center text-white">
                    <PartyPopper className="w-8 h-8 text-white mb-2 mx-auto" />
                    <p className="font-rubik font-bold text-sm">Attendees</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <p className="font-rubik text-xl text-black leading-relaxed">
              Together, these roles create a cycle of connection—planners host, partners contribute, and attendees engage. By uniting everyone in one place, we make it easier than ever to turn ideas into unforgettable experiences.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto text-center px-6 lg:px-8">
          <h2 className="font-arial-black text-5xl md:text-7xl lg:text-8xl font-black text-brand-green mb-12 leading-tight tracking-tighter">
            READY TO
            <br />
            GET STARTED?
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-black font-semibold px-16 py-6 text-xl rounded-none"
            >
              BROWSE EVENTS
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-black font-semibold px-16 py-6 text-xl rounded-none"
            >
              SIGN UP FREE
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
