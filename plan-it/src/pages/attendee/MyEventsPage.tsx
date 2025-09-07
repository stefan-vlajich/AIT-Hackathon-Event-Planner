import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { EventCard } from '@/components/events/EventCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Users, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

// Mock data for user's events
const mockMyEvents = {
  upcoming: [
    {
      id: 1,
      title: 'Tech Conference 2025',
      description: 'Join us for the biggest tech conference of the year featuring industry leaders.',
      eventDate: '2025-03-15',
      startTime: '9:00 AM',
      endTime: '6:00 PM',
      venueAddress: '123 Convention Center Dr',
      city: 'San Francisco',
      state: 'CA',
      categoryName: 'Technology',
      currentAttendeeCount: 450,
      maxAttendees: 500,
      eventImageURL: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
      organizationName: 'TechEvents Inc',
      registrationStatus: 'Approved',
      registrationDate: '2025-01-15'
    }
  ],
  past: [
    {
      id: 2,
      title: 'Art Gallery Opening',
      description: 'Experience contemporary art from local and international artists.',
      eventDate: '2025-01-20',
      startTime: '7:00 PM',
      endTime: '10:00 PM',
      venueAddress: '456 Art District Ave',
      city: 'Los Angeles',
      state: 'CA',
      categoryName: 'Arts & Culture',
      currentAttendeeCount: 100,
      maxAttendees: 100,
      eventImageURL: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      organizationName: 'Modern Art Gallery',
      registrationStatus: 'Attended',
      registrationDate: '2025-01-10'
    }
  ],
  pending: [
    {
      id: 3,
      title: 'Business Networking Mixer',
      description: 'Connect with entrepreneurs, business leaders, and innovators.',
      eventDate: '2025-03-25',
      startTime: '6:00 PM',
      endTime: '9:00 PM',
      venueAddress: '789 Business Plaza',
      city: 'New York',
      state: 'NY',
      categoryName: 'Business',
      currentAttendeeCount: 120,
      maxAttendees: 150,
      eventImageURL: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400',
      organizationName: 'NYC Business Network',
      registrationStatus: 'Pending',
      registrationDate: '2025-02-01'
    }
  ]
}

const statusConfig = {
  Approved: { color: 'bg-green-600', icon: CheckCircle, text: 'Approved' },
  Pending: { color: 'bg-yellow-600', icon: AlertCircle, text: 'Pending Approval' },
  Declined: { color: 'bg-red-600', icon: XCircle, text: 'Declined' },
  Attended: { color: 'bg-brand-green', icon: CheckCircle, text: 'Attended' }
}

export function MyEventsPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'pending'>('upcoming')

  const getCurrentEvents = () => {
    switch (activeTab) {
      case 'upcoming':
        return mockMyEvents.upcoming
      case 'past':
        return mockMyEvents.past
      case 'pending':
        return mockMyEvents.pending
      default:
        return []
    }
  }

  const getTabCount = (tab: string) => {
    switch (tab) {
      case 'upcoming':
        return mockMyEvents.upcoming.length
      case 'past':
        return mockMyEvents.past.length
      case 'pending':
        return mockMyEvents.pending.length
      default:
        return 0
    }
  }

  const renderEventCard = (event: any) => {
    const status = statusConfig[event.registrationStatus as keyof typeof statusConfig]
    const StatusIcon = status.icon

    return (
      <Link 
        key={event.id} 
        to={`/event/${event.id}`}
        className="block relative"
      >
        <EventCard
          event={event}
          linkTo={`/event/${event.id}`}
        />
        {/* Status Badge Overlay */}
        <div className="absolute top-3 left-3 z-10">
          <Badge className={`${status.color} text-white border-0`}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {status.text}
          </Badge>
        </div>
      </Link>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-arial-black text-4xl text-brand-green mb-2">
              My Events
            </h1>
            <p className="font-rubik text-gray-300">
              Track your event registrations and attendance
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-black/80 border-brand-green border">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Calendar className="w-8 h-8 text-brand-green mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {mockMyEvents.upcoming.length}
                    </p>
                    <p className="text-sm text-gray-400 font-rubik">Upcoming</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/80 border-gray-600 border">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <AlertCircle className="w-8 h-8 text-yellow-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {mockMyEvents.pending.length}
                    </p>
                    <p className="text-sm text-gray-400 font-rubik">Pending</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/80 border-gray-600 border">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {mockMyEvents.past.length}
                    </p>
                    <p className="text-sm text-gray-400 font-rubik">Attended</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/80 border-gray-600 border">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-blue-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {mockMyEvents.upcoming.length + mockMyEvents.past.length + mockMyEvents.pending.length}
                    </p>
                    <p className="text-sm text-gray-400 font-rubik">Total</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-8 bg-black/50 p-1 rounded-lg border border-gray-700">
            {[
              { key: 'upcoming', label: 'Upcoming Events' },
              { key: 'pending', label: 'Pending Approval' },
              { key: 'past', label: 'Event History' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex-1 px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'bg-brand-green text-black'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <span className="font-rubik">
                  {tab.label} ({getTabCount(tab.key)})
                </span>
              </button>
            ))}
          </div>

          {/* Events Content */}
          <div className="min-h-[400px]">
            {getCurrentEvents().length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {getCurrentEvents().map(renderEventCard)}
              </div>
            ) : (
              <div className="text-center py-16">
                <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="font-arial-black text-xl text-gray-400 mb-2">
                  No {activeTab} events
                </h3>
                <p className="font-rubik text-gray-500 mb-6">
                  {activeTab === 'upcoming' 
                    ? "You don't have any upcoming events. Explore and register for new events!"
                    : activeTab === 'pending'
                    ? "No events pending approval. Your registrations will appear here."
                    : "You haven't attended any events yet. Start exploring!"}
                </p>
                <Button
                  className="bg-brand-green hover:bg-green-400 text-black font-rubik"
                >
                  Browse Events
                </Button>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          {getCurrentEvents().length > 0 && (
            <div className="mt-12 text-center">
              <Card className="bg-black/80 border-gray-600 border inline-block">
                <CardContent className="p-6">
                  <h3 className="font-arial-black text-xl text-brand-green mb-4">
                    Quick Actions
                  </h3>
                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      className="bg-gray-900 border-gray-800 text-white hover:bg-gray-800 hover:text-brand-green"
                    >
                      Export Calendar
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-gray-900 border-gray-800 text-white hover:bg-gray-800 hover:text-brand-green"
                    >
                      Print Tickets
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-gray-900 border-gray-800 text-white hover:bg-gray-800 hover:text-brand-green"
                    >
                      Share Events
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}