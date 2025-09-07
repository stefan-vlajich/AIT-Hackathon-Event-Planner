import React from "react"
import { motion } from "framer-motion"
import { Navigation } from "@/components/layout/Navigation"
import { Footer } from "@/components/layout/Footer"
import { User, Code, Handshake, Star } from "lucide-react"

export function AboutPage() {
  const teamMembers = [
    { firstName: "JAI", lastName: "BENIPAL", icon: User },
    { firstName: "CHRISTIAN", lastName: "BLANKENBACK", icon: Code },
    { firstName: "SAM", lastName: "PERKINS", icon: Handshake },
    { firstName: "EASHAN", lastName: "UPPAL", icon: Star },
    { firstName: "STEFAN", lastName: "VLAJICH", icon: User },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-black pb-16">
        <motion.div
          className="w-full text-left py-16 pl-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-arial-black text-5xl md:text-7xl lg:text-8xl font-black text-brand-green uppercase leading-tight tracking-tighter">
            ABOUT
            <br />
            PLAN-IT
          </h1>
        </motion.div>
      </section>

      {/* Story Section */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ backgroundColor: "#73F64B" }}
      >
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-arial-black text-5xl md:text-7xl lg:text-8xl font-black text-black mb-8 leading-tight tracking-tighter">
              OUR STORY
            </h2>
            <motion.div
              className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-12 border border-black/20 shadow-xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="font-rubik text-lg md:text-xl text-black leading-relaxed mb-8">
                plan-it was born from the frustration of planning events the
                traditional way. Too many spreadsheets, endless phone calls, and
                the constant worry of missing important details...
              </p>
              <p className="font-rubik text-lg md:text-xl text-black leading-relaxed">
                Today, we're proud to be the platform where events begin...
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-32 bg-black overflow-hidden">
        <div className="relative max-w-7xl mx-auto text-center px-6 lg:px-8">
          <motion.h2
            className="font-arial-black text-5xl md:text-7xl lg:text-8xl font-black text-brand-green mb-16 leading-tight tracking-tighter"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            MEET OUR TEAM
          </motion.h2>

          {/* Team Grid */}
          <div className="grid grid-cols-5 gap-8 mt-16">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-brand-green/20 h-full flex flex-col">
                  <div className="text-center flex flex-col h-full">
                    <div className="relative mx-auto mb-6 w-20 h-20">
                      <div className="w-20 h-20 rounded-full border-4 border-brand-green/30 flex items-center justify-center">
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "#73F64B" }}
                        >
                          {React.createElement(member.icon, {
                            className: "w-10 h-10 text-black",
                          })}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-black font-bold text-lg uppercase leading-tight">
                      <span className="block">{member.firstName}</span>
                      <span className="block">{member.lastName}</span>
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
