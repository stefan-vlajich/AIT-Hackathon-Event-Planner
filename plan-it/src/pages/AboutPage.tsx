import { Navigation } from '@/components/layout/Navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function AboutPage() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "10+ years in event management, passionate about creating memorable experiences",
      emoji: "👩‍💼"
    },
    {
      name: "Michael Chen", 
      role: "Head of Technology",
      bio: "Full-stack developer with expertise in building scalable event platforms",
      emoji: "👨‍💻"
    },
    {
      name: "Emily Rodriguez",
      role: "Partner Relations",
      bio: "Connecting event organizers with the best vendors and service providers",
      emoji: "🤝"
    },
    {
      name: "David Kim",
      role: "Customer Success",
      bio: "Ensuring every event planned through our platform exceeds expectations",
      emoji: "⭐"
    }
  ]

  const values = [
    {
      title: "Innovation",
      description: "We continuously evolve our platform to meet changing event needs",
      icon: "💡"
    },
    {
      title: "Quality",
      description: "Every partner is vetted to ensure exceptional service quality",
      icon: "✨"
    },
    {
      title: "Community",
      description: "Building connections between event organizers and trusted vendors",
      icon: "🌟"
    },
    {
      title: "Simplicity",
      description: "Making event planning accessible and enjoyable for everyone",
      icon: "🎯"
    }
  ]

  const stats = [
    { number: "10,000+", label: "Events Planned" },
    { number: "500+", label: "Trusted Partners" },
    { number: "50,000+", label: "Happy Customers" },
    { number: "95%", label: "Success Rate" }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Page Header */}
      <div className="pt-20 pb-12 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-arial-black text-4xl md:text-6xl text-white mb-4">
              ABOUT
            </h1>
            <p className="font-rubik font-light text-xl text-white/90 max-w-3xl mx-auto">
              We're on a mission to make event planning simple, enjoyable, and successful for everyone
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        
        {/* Our Story */}
        <div className="mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-rubik text-3xl font-semibold text-gray-800 mb-6">
              Our Story
            </h2>
            <p className="font-rubik font-light text-lg text-gray-600 mb-8 leading-relaxed">
              plan-it was born from the frustration of planning events the traditional way. Too many spreadsheets, 
              endless phone calls, and the constant worry of missing important details. We believed there had to be 
              a better way to bring people together and create memorable experiences.
            </p>
            <p className="font-rubik font-light text-lg text-gray-600 leading-relaxed">
              Today, we're proud to be the platform where events begin - connecting organizers with trusted partners, 
              streamlining the planning process, and ensuring every celebration is exactly what you envisioned.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-arial-black text-3xl md:text-4xl text-brand-green mb-2">
                  {stat.number}
                </div>
                <div className="font-rubik text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="font-rubik text-3xl font-semibold text-gray-800 mb-8 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-4xl mb-3">{value.icon}</div>
                  <CardTitle className="font-rubik text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-rubik font-light text-gray-600">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="font-rubik text-3xl font-semibold text-gray-800 mb-8 text-center">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-5xl mb-3">{member.emoji}</div>
                  <CardTitle className="font-rubik text-lg">{member.name}</CardTitle>
                  <CardDescription className="font-rubik font-medium text-brand-green">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-rubik font-light text-sm text-gray-600">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-brand-green to-green-400 text-white">
            <CardContent className="p-12">
              <h3 className="font-rubik text-3xl font-semibold mb-4">
                Ready to plan your next event?
              </h3>
              <p className="font-rubik font-light text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of successful event organizers who trust plan-it to bring their visions to life
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brand-green font-rubik">
                  Start Planning
                </Button>
                <Button variant="secondary" size="lg" className="bg-white text-brand-green hover:bg-gray-100 font-rubik">
                  Contact Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
