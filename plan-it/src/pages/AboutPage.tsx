import React from 'react'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { User, Code, Handshake, Star } from 'lucide-react'

export function AboutPage() {
  const teamMembers = [
    {
      firstName: "JAI",
      lastName: "BENIPAL",
      icon: User
    },
    {
      firstName: "CHRISTIAN",
      lastName: "BLANKENBACK", 
      icon: Code
    },
    {
      firstName: "SAM",
      lastName: "PERKINS",
      icon: Handshake
    },
    {
      firstName: "EASHAN",
      lastName: "UPPAL",
      icon: Star
    },
    {
      firstName: "STEFAN",
      lastName: "VLAJICH",
      icon: User
    }
  ]

  const stats = [
    { number: "10,000+", label: "Events Planned" },
    { number: "500+", label: "Trusted Partners" },
    { number: "50,000+", label: "Happy Customers" },
    { number: "95%", label: "Success Rate" }
  ]

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-black pb-16">
        <div className="w-full">
          <div className="text-left py-16 pl-8">
            <h1 className="font-arial-black text-5xl md:text-7xl lg:text-8xl font-black text-brand-green uppercase leading-tight tracking-tighter">
              ABOUT
              <br />
              PLAN-IT
            </h1>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="relative py-20 overflow-hidden" style={{ backgroundColor: '#73F64B' }}>
        {/* Creative Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{ 
            backgroundImage: `conic-gradient(from 0deg at 50% 50%, #000000, transparent, #000000, transparent)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-arial-black text-5xl md:text-7xl lg:text-8xl font-black text-black mb-8 leading-tight tracking-tighter">
              OUR STORY
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Background Shape */}
                <div className="absolute -inset-8 bg-black/5 rounded-3xl transform -rotate-1"></div>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-12 border border-black/20 shadow-xl">
                  <p className="font-rubik text-lg md:text-xl text-black leading-relaxed mb-8">
                    plan-it was born from the frustration of planning events the traditional way. Too many spreadsheets, 
                    endless phone calls, and the constant worry of missing important details. We believed there had to be 
                    a better way to bring people together and create memorable experiences.
                  </p>
                  <p className="font-rubik text-lg md:text-xl text-black leading-relaxed">
                    Today, we're proud to be the platform where events begin - connecting organizers with trusted partners, 
                    streamlining the planning process, and ensuring every celebration is exactly what you envisioned.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Creative Layout */}
      <section className="relative py-32 bg-black overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `linear-gradient(45deg, #73F64B 1px, transparent 1px),
                             linear-gradient(-45deg, #73F64B 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center px-6 lg:px-8">
          <h2 className="font-arial-black text-5xl md:text-7xl lg:text-8xl font-black text-brand-green mb-16 leading-tight tracking-tighter">
            MEET OUR TEAM
          </h2>
          
          {/* Team Grid */}
          <div className="grid grid-cols-5 gap-8 mt-16">
            {teamMembers.map((member, index) => (
              <div key={index} className="relative group">
                {/* Background Elements */}
                <div className="absolute -inset-2 bg-brand-green/10 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
                
                <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-brand-green/20 group-hover:shadow-brand-green/20 transition-shadow duration-300 h-full flex flex-col">
                  <div className="text-center flex flex-col h-full">
                    <div className="relative mx-auto mb-6 w-20 h-20">
                      <div className="w-20 h-20 rounded-full border-4 border-brand-green/30 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#73F64B' }}>
                          {React.createElement(member.icon, { className: "w-10 h-10 text-black" })}
                        </div>
                      </div>
                      {/* Floating Elements */}
                      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-brand-green/40"></div>
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-brand-green/30"></div>
                    </div>
                    <h3 className="text-black font-bold text-lg uppercase leading-tight flex-grow flex flex-col items-center justify-center">
                      <span>{member.firstName}</span>
                      <span>{member.lastName}</span>
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
