import React from "react"
import { Navigation } from "@/components/layout/Navigation"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Target, Handshake, PartyPopper, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"

export function HowItWorksPage() {
  const roles = [
    { title: "For Planners", icon: Target, description: "Start by creating your event in minutes..." },
    { title: "For Partners", icon: Handshake, description: "Opportunities shouldn't be hidden..." },
    { title: "For Attendees", icon: PartyPopper, description: "Finding and joining great events should be effortless..." }
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-black pb-16">
        <motion.div 
          className="text-left py-16 pl-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-arial-black text-5xl md:text-7xl lg:text-8xl font-black text-brand-green uppercase leading-tight tracking-tighter">
            HOW IT <br /> WORKS
          </h1>
        </motion.div>
      </section>

      {/* Introduction Section */}
      <section className="relative py-20 overflow-hidden" style={{ backgroundColor: "#73F64B" }}>
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-arial-black text-5xl md:text-7xl lg:text-8xl font-black text-black mb-8 leading-tight tracking-tighter">
              BRINGING <br /> PEOPLE <br /> TOGETHER
            </h2>
            <p className="font-rubik text-lg md:text-xl text-black leading-relaxed max-w-4xl mx-auto">
              Bringing people together should feel simple. That’s why we’ve designed a platform...
            </p>
          </motion.div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="relative py-32 bg-black overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 space-y-32">
          {roles.map((role, index) => (
            <motion.div
              key={index}
              className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Icon */}
              <div className="w-1/2 flex justify-center">
                <div className="relative">
                  <div className="w-48 h-48 rounded-full border-4 border-brand-green/30 flex items-center justify-center">
                    <div className="w-40 h-40 rounded-full flex items-center justify-center" style={{ backgroundColor: "#73F64B" }}>
                      {React.createElement(role.icon, { className: "w-20 h-20 text-black" })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="w-1/2 px-12">
                <div className="relative bg-black/50 backdrop-blur-sm rounded-2xl p-8 border border-brand-green/20">
                  <h3 className="font-arial-black text-3xl md:text-4xl font-black text-brand-green mb-6 uppercase tracking-tighter">
                    {role.title}
                  </h3>
                  <p className="font-rubik text-base text-white leading-relaxed">
                    {role.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Cycle Section */}
      <section className="relative py-32 overflow-hidden" style={{ backgroundColor: "#73F64B" }}>
        <motion.div
          className="relative max-w-6xl mx-auto text-center px-6 lg:px-8"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-arial-black text-5xl md:text-7xl lg:text-8xl font-black text-black mb-16">
            THE CYCLE <br /> OF CONNECTION
          </h2>
          {/* existing cycle diagram here */}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-black text-center">
        <motion.h2 
          className="font-arial-black text-5xl md:text-7xl lg:text-8xl font-black text-brand-green mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          READY TO <br /> GET STARTED?
        </motion.h2>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button className="bg-transparent border-white text-white hover:bg-white hover:text-black font-semibold px-16 py-6 text-xl rounded-none">
              BROWSE EVENTS
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button className="bg-transparent border-white text-white hover:bg-white hover:text-black font-semibold px-16 py-6 text-xl rounded-none">
              SIGN UP FREE
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
