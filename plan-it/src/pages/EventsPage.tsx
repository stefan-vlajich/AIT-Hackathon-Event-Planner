import { Navigation } from '@/components/layout/Navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function EventsPage() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Conference 2025",
      date: "March 15, 2025",
      location: "San Francisco, CA",
      type: "Conference",
      attendees: 500,
      status: "Open"
    },
    {
      id: 2,
      title: "Music Festival",
      date: "April 20, 2025",
      location: "Austin, TX",
      type: "Festival",
      attendees: 2000,
      status: "Selling Fast"
    },
    {
      id: 3,
      title: "Business Networking",
      date: "May 5, 2025",
      location: "New York, NY",
      type: "Networking",
      attendees: 150,
      status: "VIP Only"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Page Header */}
      <div className="pt-20 pb-12 bg-gradient-to-r from-brand-green to-green-400">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-arial-black text-4xl md:text-6xl text-white mb-4">
              EVENTS
            </h1>
            <p className="font-rubik font-light text-xl text-white/90 max-w-2xl mx-auto">
              Discover amazing events and experiences waiting for you
            </p>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="font-rubik text-2xl font-semibold text-gray-800 mb-4">
            Upcoming Events
          </h2>
          <div className="flex gap-4 mb-6">
            <Button variant="default" className="bg-brand-green hover:bg-green-500">
              All Events
            </Button>
            <Button variant="outline">Conferences</Button>
            <Button variant="outline">Festivals</Button>
            <Button variant="outline">Networking</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge 
                    variant={event.status === 'Open' ? 'default' : event.status === 'Selling Fast' ? 'destructive' : 'secondary'}
                    className="text-xs"
                  >
                    {event.status}
                  </Badge>
                  <span className="text-sm text-gray-500 font-rubik">{event.type}</span>
                </div>
                <CardTitle className="font-rubik text-xl">{event.title}</CardTitle>
                <CardDescription className="font-rubik font-light">
                  {event.date} • {event.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 font-rubik">
                    {event.attendees} attendees expected
                  </span>
                  <Button size="sm" className="bg-brand-green hover:bg-green-500">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Create Event CTA */}
        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto bg-brand-green text-white">
            <CardContent className="p-8">
              <h3 className="font-rubik text-2xl font-semibold mb-4">
                Ready to create your own event?
              </h3>
              <p className="font-rubik font-light mb-6">
                Use our event planner to bring your vision to life
              </p>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brand-green">
                Start Planning
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
