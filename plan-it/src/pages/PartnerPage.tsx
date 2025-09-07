import { Navigation } from '@/components/layout/Navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function PartnerPage() {
  const partnerCategories = [
    {
      category: "Venues",
      icon: "🏛️",
      description: "Premium event spaces and unique locations",
      partners: ["Grand Hotel", "Convention Center", "Rooftop Gardens", "Historic Manor"]
    },
    {
      category: "Catering",
      icon: "🍽️",
      description: "Professional catering services for any event size",
      partners: ["Gourmet Catering Co.", "Fresh Bites", "Elegant Events", "Local Flavors"]
    },
    {
      category: "Entertainment",
      icon: "🎵",
      description: "Musicians, DJs, and performers to elevate your event",
      partners: ["DJ Masters", "Live Band Co.", "Comedy Central", "Dance Troupes"]
    },
    {
      category: "Photography",
      icon: "📸",
      description: "Capture every moment with professional photographers",
      partners: ["Moment Capture", "Event Lens", "Perfect Shots", "Memory Makers"]
    },
    {
      category: "Decorations",
      icon: "🎨",
      description: "Transform your space with stunning decorations",
      partners: ["Bloom Designs", "Event Styling", "Festive Decor", "Theme Masters"]
    },
    {
      category: "Transportation",
      icon: "🚐",
      description: "Reliable transportation solutions for your guests",
      partners: ["Luxury Rides", "Group Transit", "Event Shuttles", "VIP Transport"]
    }
  ]

  const featuredPartners = [
    {
      name: "Elegant Venues Co.",
      category: "Venues",
      rating: 4.9,
      projects: 150,
      speciality: "Luxury wedding venues"
    },
    {
      name: "Gourmet Masters",
      category: "Catering", 
      rating: 4.8,
      projects: 300,
      speciality: "Corporate events"
    },
    {
      name: "Sound & Vision",
      category: "Entertainment",
      rating: 4.9,
      projects: 200,
      speciality: "Live music & AV"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Page Header */}
      <div className="pt-20 pb-12 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-arial-black text-4xl md:text-6xl text-white mb-4">
              PARTNERS
            </h1>
            <p className="font-rubik font-light text-xl text-white/90 max-w-2xl mx-auto">
              Connect with trusted vendors and service providers for your perfect event
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        
        {/* Featured Partners */}
        <div className="mb-12">
          <h2 className="font-rubik text-3xl font-semibold text-gray-800 mb-6 text-center">
            Featured Partners
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPartners.map((partner, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow bg-white">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="font-rubik text-xl">{partner.name}</CardTitle>
                      <CardDescription className="font-rubik font-light">
                        {partner.speciality}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {partner.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-500">★</span>
                      <span className="font-rubik font-medium">{partner.rating}</span>
                    </div>
                    <span className="text-sm text-gray-600 font-rubik">
                      {partner.projects} projects completed
                    </span>
                  </div>
                  <Button className="w-full bg-brand-green hover:bg-green-500 font-rubik">
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Partner Categories */}
        <div>
          <h2 className="font-rubik text-3xl font-semibold text-gray-800 mb-6 text-center">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <CardTitle className="font-rubik text-xl">{category.category}</CardTitle>
                  <CardDescription className="font-rubik font-light">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm font-rubik font-medium text-gray-700">Featured Partners:</p>
                    <div className="flex flex-wrap gap-1">
                      {category.partners.slice(0, 3).map((partner, pIndex) => (
                        <Badge key={pIndex} variant="outline" className="text-xs font-rubik">
                          {partner}
                        </Badge>
                      ))}
                      {category.partners.length > 3 && (
                        <Badge variant="secondary" className="text-xs font-rubik">
                          +{category.partners.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full font-rubik group-hover:bg-brand-green group-hover:text-white group-hover:border-brand-green">
                    Browse {category.category}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Become a Partner CTA */}
        <div className="mt-16 text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-brand-green to-green-400 text-white">
            <CardContent className="p-12">
              <h3 className="font-rubik text-3xl font-semibold mb-4">
                Want to become a partner?
              </h3>
              <p className="font-rubik font-light text-lg mb-8 max-w-2xl mx-auto">
                Join our network of trusted event professionals and grow your business with plan-it
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brand-green font-rubik">
                  Learn More
                </Button>
                <Button variant="secondary" size="lg" className="bg-white text-brand-green hover:bg-gray-100 font-rubik">
                  Apply Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
