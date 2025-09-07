import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { EventCard } from '@/components/events/EventCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, Calendar, MapPin, Users } from 'lucide-react'

// Mock data - replace with real API data
const mockEvents = [
  {
    id: 1,
    title: 'Tech Conference 2025',
    description: 'Join us for the biggest tech conference of the year featuring industry leaders, innovative workshops, and networking opportunities.',
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
    organizationName: 'TechEvents Inc'
  },
  {
    id: 2,
    title: 'Art Gallery Opening',
    description: 'Experience contemporary art from local and international artists in this exclusive gallery opening.',
    eventDate: '2025-03-20',
    startTime: '7:00 PM',
    endTime: '10:00 PM',
    venueAddress: '456 Art District Ave',
    city: 'Los Angeles',
    state: 'CA',
    categoryName: 'Arts & Culture',
    currentAttendeeCount: 75,
    maxAttendees: 100,
    eventImageURL: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    organizationName: 'Modern Art Gallery'
  },
  {
    id: 3,
    title: 'Business Networking Mixer',
    description: 'Connect with entrepreneurs, business leaders, and innovators in this monthly networking event.',
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
    organizationName: 'NYC Business Network'
  }
]

const categories = ['All', 'Technology', 'Business', 'Arts & Culture', 'Food & Drink', 'Sports', 'Music']

export function AttendeeEventsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('date')

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || event.categoryName === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-arial-black text-4xl text-brand-green mb-2">
              Discover Events
            </h1>
            <p className="font-rubik text-gray-300">
              Find and join amazing events in your area
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-black/80 border-gray-600 text-white placeholder-gray-400 focus:border-brand-green"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  className={selectedCategory === category 
                    ? "bg-brand-green text-black hover:bg-green-400" 
                    : "border-gray-600 text-gray-300 hover:bg-gray-700"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Sort and Stats */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="font-rubik text-gray-300 text-sm">
                  {filteredEvents.length} events found
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-black/80 border-gray-600 text-white text-sm rounded-md px-3 py-1"
                >
                  <option value="date">Sort by Date</option>
                  <option value="title">Sort by Title</option>
                  <option value="attendees">Sort by Popularity</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  More Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredEvents.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="font-arial-black text-xl text-gray-400 mb-2">
                No events found
              </h3>
              <p className="font-rubik text-gray-500 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                }}
                variant="outline"
                className="border-brand-green text-brand-green hover:bg-brand-green hover:text-black"
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Featured Section */}
          <div className="mt-16">
            <h2 className="font-arial-black text-2xl text-brand-green mb-6">
              Trending Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockEvents.slice(0, 3).map(event => (
                <EventCard
                  key={`trending-${event.id}`}
                  event={event}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}