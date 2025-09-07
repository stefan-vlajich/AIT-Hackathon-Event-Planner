import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function HowItWorksPage() {
  const steps = [
    {
      id: 1,
      title: "Discover Events",
      description: "Browse through thousands of events happening in your area. Filter by category, date, location, and more to find exactly what you're looking for.",
      icon: "🔍"
    },
    {
      id: 2,
      title: "Join the Community",
      description: "Create your account to unlock personalized recommendations, save favorite events, and connect with other event-goers.",
      icon: "👥"
    },
    {
      id: 3,
      title: "Get Your Tickets",
      description: "Secure your spot with our easy and safe ticketing system. Multiple payment options and instant confirmation.",
      icon: "🎫"
    },
    {
      id: 4,
      title: "Attend & Enjoy",
      description: "Show up and have an amazing time! Share your experience and discover new events through our community.",
      icon: "🎉"
    }
  ]

  const features = [
    {
      title: "Event Discovery",
      description: "Advanced search and filtering to find events that match your interests and schedule.",
      icon: "🎯"
    },
    {
      title: "Safe Ticketing",
      description: "Secure payment processing and verified event organizers for your peace of mind.",
      icon: "🔒"
    },
    {
      title: "Community Reviews",
      description: "Read reviews from other attendees to make informed decisions about events.",
      icon: "⭐"
    },
    {
      title: "Personalized Feed",
      description: "Get recommendations based on your preferences and past event attendance.",
      icon: "📱"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-brand-green to-emerald-600">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h1 className="font-arial-black text-5xl md:text-7xl font-black text-white mb-6">
            HOW IT WORKS
          </h1>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto">
            Discover, connect, and experience amazing events in just a few simple steps
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get Started in 4 Easy Steps
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From discovery to attendance, we've made the entire process simple and enjoyable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-brand-green/30 transform translate-x-1/2 z-0"></div>
                )}
                
                <Card className="relative z-10 text-center border-2 border-brand-green/20 hover:border-brand-green/50 transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 mx-auto bg-brand-green rounded-full flex items-center justify-center text-3xl mb-4">
                      {step.icon}
                    </div>
                    <div className="w-8 h-8 mx-auto bg-brand-green rounded-full flex items-center justify-center text-white font-bold text-sm mb-4">
                      {step.id}
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Plan It?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We've built the features you need to make event discovery and attendance seamless
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center text-3xl mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-4xl md:text-6xl font-bold text-brand-green mb-6">
            READY TO GET STARTED?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Join thousands of event-goers who have discovered amazing experiences through Plan It
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-brand-green text-white hover:bg-green-500 font-semibold px-8 py-3"
              asChild
            >
              <a href="/events">Browse Events</a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-3"
              asChild
            >
              <a href="/signup">Sign Up Free</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
