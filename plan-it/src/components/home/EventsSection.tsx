import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function EventsSection() {
  const sampleEvents = [
    {
      id: 1,
      title: "Tech Innovation Summit",
      date: "Oct 15, 2025",
      location: "San Francisco, CA",
      category: "Technology",
      attendees: 250,
      description: "Join industry leaders for cutting-edge tech discussions and networking."
    },
    {
      id: 2,
      title: "Art & Culture Festival",
      date: "Oct 22, 2025",
      location: "New York, NY",
      category: "Arts",
      attendees: 500,
      description: "Celebrate creativity with local artists, live performances, and exhibitions."
    },
    {
      id: 3,
      title: "Startup Pitch Night",
      date: "Nov 5, 2025",
      location: "Austin, TX",
      category: "Business",
      attendees: 150,
      description: "Watch emerging startups pitch their ideas to top investors."
    },
    {
      id: 4,
      title: "Food & Wine Expo",
      date: "Nov 12, 2025",
      location: "Napa Valley, CA",
      category: "Food & Drink",
      attendees: 300,
      description: "Taste exceptional wines and gourmet cuisine from renowned chefs."
    },
    {
      id: 5,
      title: "Music & Beats Conference",
      date: "Nov 18, 2025",
      location: "Nashville, TN",
      category: "Music",
      attendees: 400,
      description: "Discover new sounds and connect with musicians from around the world."
    },
    {
      id: 6,
      title: "Wellness Retreat Weekend",
      date: "Dec 3, 2025",
      location: "Sedona, AZ",
      category: "Health",
      attendees: 100,
      description: "Rejuvenate your mind and body with yoga, meditation, and spa treatments."
    },
    {
      id: 7,
      title: "Gaming Convention",
      date: "Dec 10, 2025",
      location: "Los Angeles, CA",
      category: "Gaming",
      attendees: 800,
      description: "Experience the latest games, meet developers, and compete in tournaments."
    },
    {
      id: 8,
      title: "Environmental Action Summit",
      date: "Dec 15, 2025",
      location: "Seattle, WA",
      category: "Environment",
      attendees: 200,
      description: "Join the movement for sustainability and learn about green initiatives."
    }
  ]

  const categoryColors = {
    Technology: "bg-blue-100 text-blue-800",
    Arts: "bg-purple-100 text-purple-800",
    Business: "bg-green-100 text-green-800",
    "Food & Drink": "bg-orange-100 text-orange-800",
    Music: "bg-pink-100 text-pink-800",
    Health: "bg-emerald-100 text-emerald-800",
    Gaming: "bg-red-100 text-red-800",
    Environment: "bg-teal-100 text-teal-800"
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What's Going On
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover exciting events happening near you and connect with like-minded people
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={`${categoryColors[event.category as keyof typeof categoryColors]} border-0`}>
                    {event.category}
                  </Badge>
                  <span className="text-sm text-gray-500">{event.attendees} attending</span>
                </div>
                <CardTitle className="text-lg font-semibold line-clamp-2">{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-3 line-clamp-2">
                  {event.description}
                </CardDescription>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {event.date}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.location}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
