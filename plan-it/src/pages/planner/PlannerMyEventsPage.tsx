import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { EventCard } from '@/components/events/EventCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal
} from 'lucide-react'

// Mock data for planner's created events
const mockPlannerEvents = {
  draft: [
    {
      id: 101,
      title: 'Corporate Leadership Summit 2025',
      description: 'Annual leadership conference for Fortune 500 executives featuring keynote speakers and networking sessions.',
      eventDate: '2025-05-15',
      startTime: '8:00 AM',
      endTime: '6:00 PM',
      venueAddress: '123 Conference Center Dr',
      city: 'San Francisco',
      state: 'CA',
      categoryName: 'Corporate',
      currentAttendeeCount: 0,
      maxAttendees: 300,
      eventImageURL: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
      organizationName: 'Elite Event Planning Co.',
      eventStatus: 'Draft',
      registrationDeadline: '2025-05-01'
    }
  ],
  published: [
    {
      id: 102,
      title: 'Tech Innovation Gala 2025',
      description: 'Celebrating breakthrough innovations in technology with industry leaders and startup founders.',
      eventDate: '2025-04-20',
      startTime: '7:00 PM',
      endTime: '11:00 PM',
      venueAddress: '456 Innovation Hub',
      city: 'Palo Alto',
      state: 'CA',
      categoryName: 'Corporate',
      currentAttendeeCount: 125,
      maxAttendees: 200,
      eventImageURL: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400',
      organizationName: 'Elite Event Planning Co.',
      eventStatus: 'Published',
      registrationDeadline: '2025-04-10'
    },
    {
      id: 103,
      title: 'Sustainable Future Conference',
      description: 'Exploring sustainable business practices and environmental innovation.',
      eventDate: '2025-06-10',
      startTime: '9:00 AM',
      endTime: '5:00 PM',
      venueAddress: '789 Green Center',
      city: 'San Jose',
      state: 'CA',
      categoryName: 'Conference',
      currentAttendeeCount: 87,
      maxAttendees: 150,
      eventImageURL: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
      organizationName: 'Elite Event Planning Co.',
      eventStatus: 'Published',
      registrationDeadline: '2025-05-25'
    }
  ],
  completed: [
    {
      id: 104,
      title: 'Winter Charity Auction 2024',
      description: 'Annual charity fundraising auction supporting local community organizations.',
      eventDate: '2024-12-15',
      startTime: '6:00 PM',
      endTime: '10:00 PM',
      venueAddress: '321 Ballroom Ave',
      city: 'San Francisco',
      state: 'CA',
      categoryName: 'Social',
      currentAttendeeCount: 180,
      maxAttendees: 200,
      eventImageURL: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400',
      organizationName: 'Elite Event Planning Co.',
      eventStatus: 'Completed',
      registrationDeadline: '2024-12-01'
    }
  ]
}

const statusConfig = {
  Draft: {
    color: 'bg-gray-600 text-white',
    icon: Edit,
    text: 'Draft'
  },
  Published: {
    color: 'bg-green-600 text-white',
    icon: Eye,
    text: 'Published'
  },
  Completed: {
    color: 'bg-blue-600 text-white',
    icon: Calendar,
    text: 'Completed'
  },
  Cancelled: {
    color: 'bg-red-600 text-white',
    icon: Trash2,
    text: 'Cancelled'
  }
}

const tabs = [
  { id: 'published', label: 'Published', count: mockPlannerEvents.published.length },
  { id: 'draft', label: 'Drafts', count: mockPlannerEvents.draft.length },
  { id: 'completed', label: 'Completed', count: mockPlannerEvents.completed.length }
]

export function PlannerMyEventsPage() {
  const [activeTab, setActiveTab] = useState('published')
  const [searchTerm, setSearchTerm] = useState('')

  const getCurrentEvents = () => {
    switch (activeTab) {
      case 'published':
        return mockPlannerEvents.published
      case 'draft':
        return mockPlannerEvents.draft
      case 'completed':
        return mockPlannerEvents.completed
      default:
        return []
    }
  }

  const getTabCount = (tab: string) => {
    switch (tab) {
      case 'published':
        return mockPlannerEvents.published.length
      case 'draft':
        return mockPlannerEvents.draft.length
      case 'completed':
        return mockPlannerEvents.completed.length
      default:
        return 0
    }
  }

  const filteredEvents = getCurrentEvents().filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const renderEventCard = (event: any) => {
    const status = statusConfig[event.eventStatus as keyof typeof statusConfig]
    const StatusIcon = status.icon

    return (
      <div key={event.id} className="relative">
        <Card className="bg-black/80 border-brand-green border hover:border-brand-green/80 transition-all duration-300 hover:shadow-lg hover:shadow-brand-green/20 cursor-pointer group">
          {/* Event Image */}
          {event.eventImageURL && (
            <div className="relative h-48 overflow-hidden rounded-t-lg">
              <img 
                src={event.eventImageURL} 
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <Badge 
                variant="secondary" 
                className="absolute top-3 right-3 bg-brand-green text-black font-medium"
              >
                {event.categoryName}
              </Badge>
            </div>
          )}
          
          <CardHeader className="pb-3">
            <Link 
              to={`/planner/event/${event.id}/edit`}
              className="block hover:no-underline"
            >
              <CardTitle className="text-xl font-arial-black text-brand-green hover:text-white transition-colors line-clamp-2 cursor-pointer">
                {event.title}
              </CardTitle>
            </Link>
            <p className="text-gray-300 text-sm font-rubik">{event.organizationName}</p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Description */}
            <p className="text-gray-400 text-sm line-clamp-2 font-rubik">
              {event.description}
            </p>
            
            {/* Event Details */}
            <div className="space-y-2">
              {/* Date and Time */}
              <div className="flex items-center text-gray-300 text-sm">
                <Calendar className="w-4 h-4 text-brand-green mr-2 flex-shrink-0" />
                <span className="font-rubik">
                  {new Date(event.eventDate).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
              
              {/* Time */}
              <div className="flex items-center text-gray-300 text-sm">
                <Clock className="w-4 h-4 text-brand-green mr-2 flex-shrink-0" />
                <span className="font-rubik">
                  {event.startTime} - {event.endTime}
                </span>
              </div>
              
              {/* Location */}
              {event.venueAddress && (
                <div className="flex items-center text-gray-300 text-sm">
                  <MapPin className="w-4 h-4 text-brand-green mr-2 flex-shrink-0" />
                  <span className="font-rubik line-clamp-1">
                    {event.venueAddress}, {event.city}, {event.state}
                  </span>
                </div>
              )}
              
              {/* Attendees */}
              <div className="flex items-center text-gray-300 text-sm">
                <Users className="w-4 h-4 text-brand-green mr-2 flex-shrink-0" />
                <span className="font-rubik">
                  {event.currentAttendeeCount} 
                  {event.maxAttendees && ` / ${event.maxAttendees}`} attendees
                </span>
              </div>
            </div>
            
            {/* Actions */}
            <div className="pt-2 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Link 
                    to={`/planner/event/${event.id}/edit`}
                    className="text-brand-green text-sm font-medium font-rubik hover:text-green-400"
                  >
                    Edit Event →
                  </Link>
                </div>
                <div className="flex items-center space-x-2">
                  {event.eventStatus === 'Published' && (
                    <Link to={`/event/${event.id}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-brand-green text-brand-green hover:bg-brand-green hover:text-black text-xs"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Status Badge Overlay */}
        <div className="absolute top-3 left-3 z-10">
          <Badge className={`${status.color} text-white border-0`}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {status.text}
          </Badge>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="font-arial-black text-4xl text-brand-green mb-2">
                My Events
              </h1>
              <p className="font-rubik text-gray-300">
                Manage all your created events
              </p>
            </div>
            
            <Link to="/planner/create-event">
              <Button className="bg-brand-green text-black hover:bg-green-400 font-medium">
                <Plus className="w-4 h-4 mr-2" />
                Create New Event
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-black/80 border-brand-green border">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Calendar className="w-8 h-8 text-brand-green mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {mockPlannerEvents.published.length + mockPlannerEvents.draft.length + mockPlannerEvents.completed.length}
                    </p>
                    <p className="text-sm text-gray-400 font-rubik">Total Events</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/80 border-gray-600 border">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Eye className="w-8 h-8 text-green-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-white">{mockPlannerEvents.published.length}</p>
                    <p className="text-sm text-gray-400 font-rubik">Published</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/80 border-gray-600 border">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Edit className="w-8 h-8 text-yellow-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-white">{mockPlannerEvents.draft.length}</p>
                    <p className="text-sm text-gray-400 font-rubik">Drafts</p>
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
                      {mockPlannerEvents.published.reduce((sum, event) => sum + event.currentAttendeeCount, 0) + 
                       mockPlannerEvents.completed.reduce((sum, event) => sum + event.currentAttendeeCount, 0)}
                    </p>
                    <p className="text-sm text-gray-400 font-rubik">Total Attendees</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-black/80 border-gray-600 text-white placeholder:text-gray-400 focus:border-brand-green"
              />
            </div>
            <Button 
              variant="outline" 
              className="bg-gray-900 border-gray-800 text-white hover:bg-gray-800 hover:text-brand-green"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button
              variant="outline"
              className="bg-gray-900 border-gray-800 text-white hover:bg-gray-800 hover:text-brand-green"
            >
              View
            </Button>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="flex space-x-1 bg-black/40 p-1 rounded-lg">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-brand-green text-black'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <span className="font-rubik">
                    {tab.label} ({getTabCount(tab.id)})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Events Content */}
          <div className="min-h-[400px]">
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredEvents.map(renderEventCard)}
              </div>
            ) : (
              <div className="text-center py-16">
                <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="font-arial-black text-xl text-gray-400 mb-2">
                  {searchTerm ? 'No events found' : `No ${activeTab} events yet`}
                </h3>
                <p className="font-rubik text-gray-500 mb-4">
                  {searchTerm 
                    ? 'Try adjusting your search terms'
                    : activeTab === 'draft'
                    ? 'Create your first draft event to get started'
                    : activeTab === 'published'
                    ? 'Publish your first event to start accepting registrations'
                    : 'Your completed events will appear here'
                  }
                </p>
                {!searchTerm && activeTab !== 'completed' && (
                  <Link to="/planner/create-event">
                    <Button className="bg-brand-green text-black hover:bg-green-400">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Event
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}