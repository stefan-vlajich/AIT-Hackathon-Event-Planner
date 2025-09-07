import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { EventCard } from '@/components/events/EventCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, Filter, Calendar, MapPin, DollarSign, Briefcase, Clock } from 'lucide-react'

// Mock data for events that need partner services
const mockPartnerEvents = [
  {
    id: 1,
    title: 'Corporate Annual Meeting 2025',
    description: 'Large corporate event requiring photography services for keynote presentations, networking sessions, and awards ceremony.',
    eventDate: '2025-04-15',
    startTime: '8:00 AM',
    endTime: '6:00 PM',
    venueAddress: '789 Business Center Dr',
    city: 'San Jose',
    state: 'CA',
    categoryName: 'Corporate',
    currentAttendeeCount: 200,
    maxAttendees: 250,
    eventImageURL: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400',
    organizationName: 'Tech Solutions Inc',
    servicesNeeded: ['Photography', 'Catering', 'AV Equipment'],
    estimatedBudget: 15000,
    responseDeadline: '2025-03-01',
    priority: 'High'
  },
  {
    id: 2,
    title: 'Summer Wedding Reception',
    description: 'Elegant outdoor wedding reception requiring comprehensive photography coverage, floral arrangements, and catering services.',
    eventDate: '2025-06-20',
    startTime: '4:00 PM',
    endTime: '11:00 PM',
    venueAddress: '456 Garden Estate Way',
    city: 'Napa',
    state: 'CA',
    categoryName: 'Wedding',
    currentAttendeeCount: 120,
    maxAttendees: 150,
    eventImageURL: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400',
    organizationName: 'Dream Weddings',
    servicesNeeded: ['Photography', 'Flowers', 'Catering'],
    estimatedBudget: 25000,
    responseDeadline: '2025-04-01',
    priority: 'Medium'
  },
  {
    id: 3,
    title: 'Tech Startup Launch Event',
    description: 'High-energy product launch event needing professional photography, live streaming setup, and premium catering.',
    eventDate: '2025-05-10',
    startTime: '6:00 PM',
    endTime: '10:00 PM',
    venueAddress: '123 Innovation Hub',
    city: 'San Francisco',
    state: 'CA',
    categoryName: 'Business',
    currentAttendeeCount: 180,
    maxAttendees: 200,
    eventImageURL: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
    organizationName: 'Startup Accelerator',
    servicesNeeded: ['Photography', 'AV Equipment', 'Catering'],
    estimatedBudget: 12000,
    responseDeadline: '2025-03-15',
    priority: 'High'
  }
]

const serviceTypes = ['All', 'Photography', 'Catering', 'Flowers', 'DJ', 'Venue', 'Decorations', 'Transportation', 'AV Equipment']
const budgetRanges = ['Any Budget', '$1,000 - $5,000', '$5,000 - $15,000', '$15,000 - $30,000', '$30,000+']

export function PartnerEventsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedService, setSelectedService] = useState('All')
  const [selectedBudget, setSelectedBudget] = useState('Any Budget')
  const [sortBy, setSortBy] = useState('deadline')

  const filteredEvents = mockPartnerEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesService = selectedService === 'All' || event.servicesNeeded.includes(selectedService)
    return matchesSearch && matchesService
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-600'
      case 'Medium': return 'bg-yellow-600'
      case 'Low': return 'bg-green-600'
      default: return 'bg-gray-600'
    }
  }

  const getDaysUntilDeadline = (deadline: string) => {
    return Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-arial-black text-4xl text-brand-green mb-2">
              Available Events
            </h1>
            <p className="font-rubik text-gray-300">
              Find events that need your services and submit proposals
            </p>
          </div>

          {/* Opportunity Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-black/80 border-brand-green border">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Briefcase className="w-8 h-8 text-brand-green mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-white">{filteredEvents.length}</p>
                    <p className="text-sm text-gray-400 font-rubik">Open Opportunities</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/80 border-gray-600 border">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="w-8 h-8 text-yellow-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-white">
                      ${mockPartnerEvents.reduce((sum, event) => sum + event.estimatedBudget, 0).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-400 font-rubik">Total Value</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/80 border-gray-600 border">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Clock className="w-8 h-8 text-orange-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {mockPartnerEvents.filter(event => getDaysUntilDeadline(event.responseDeadline) <= 7).length}
                    </p>
                    <p className="text-sm text-gray-400 font-rubik">Urgent (≤7 days)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/80 border-gray-600 border">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Calendar className="w-8 h-8 text-blue-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {mockPartnerEvents.filter(event => event.priority === 'High').length}
                    </p>
                    <p className="text-sm text-gray-400 font-rubik">High Priority</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search events by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-black/80 border-gray-600 text-white placeholder-gray-400 focus:border-brand-green"
              />
            </div>

            {/* Service Filter */}
            <div className="flex flex-wrap gap-2">
              <span className="font-rubik text-gray-300 text-sm flex items-center mr-4">
                Services needed:
              </span>
              {serviceTypes.map(service => (
                <Button
                  key={service}
                  onClick={() => setSelectedService(service)}
                  variant={selectedService === service ? "default" : "outline"}
                  size="sm"
                  className={selectedService === service 
                    ? "bg-brand-green text-black hover:bg-green-400" 
                    : "border-gray-600 text-gray-300 hover:bg-gray-700"
                  }
                >
                  {service}
                </Button>
              ))}
            </div>

            {/* Additional Filters */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="font-rubik text-gray-300 text-sm">
                  {filteredEvents.length} opportunities found
                </span>
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="bg-black/80 border-gray-600 text-white text-sm rounded-md px-3 py-1"
                >
                  {budgetRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-black/80 border-gray-600 text-white text-sm rounded-md px-3 py-1"
                >
                  <option value="deadline">Sort by Deadline</option>
                  <option value="budget">Sort by Budget</option>
                  <option value="priority">Sort by Priority</option>
                  <option value="date">Sort by Event Date</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Advanced Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredEvents.map(event => {
                const daysUntilDeadline = getDaysUntilDeadline(event.responseDeadline)
                
                return (
                  <Link 
                    key={event.id} 
                    to={`/partner/event/${event.id}`}
                    className="block relative"
                  >
                    {/* Enhanced Event Card with Partner-specific Info */}
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
                          
                          {/* Priority & Deadline Badges */}
                          <div className="absolute top-3 left-3 flex space-x-2">
                            <Badge className={`${getPriorityColor(event.priority)} text-white border-0`}>
                              {event.priority} Priority
                            </Badge>
                            {daysUntilDeadline <= 7 && (
                              <Badge className="bg-orange-600 text-white border-0">
                                {daysUntilDeadline}d left
                              </Badge>
                            )}
                          </div>
                          
                          <Badge variant="secondary" className="absolute top-3 right-3 bg-brand-green text-black font-medium">
                            {event.categoryName}
                          </Badge>
                        </div>
                      )}
                      
                      <CardHeader className="pb-3">
                        <CardTitle className="text-xl font-arial-black text-brand-green group-hover:text-white transition-colors line-clamp-2 cursor-pointer">
                          {event.title}
                        </CardTitle>
                        <p className="text-gray-300 text-sm font-rubik">{event.organizationName}</p>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        {/* Description */}
                        <p className="text-gray-400 text-sm line-clamp-2 font-rubik">
                          {event.description}
                        </p>
                        
                        {/* Services Needed */}
                        <div>
                          <p className="text-brand-green text-sm font-medium font-rubik mb-2">Services Needed:</p>
                          <div className="flex flex-wrap gap-1">
                            {event.servicesNeeded.map(service => (
                              <Badge key={service} variant="outline" className="border-brand-green text-brand-green text-xs">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        {/* Event Details */}
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-300 text-sm">
                            <Calendar className="w-4 h-4 text-brand-green mr-2 flex-shrink-0" />
                            <span className="font-rubik">
                              {new Date(event.eventDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })} • {event.startTime} - {event.endTime}
                            </span>
                          </div>
                          
                          <div className="flex items-center text-gray-300 text-sm">
                            <MapPin className="w-4 h-4 text-brand-green mr-2 flex-shrink-0" />
                            <span className="font-rubik line-clamp-1">
                              {event.city}, {event.state}
                            </span>
                          </div>
                          
                          <div className="flex items-center text-gray-300 text-sm">
                            <DollarSign className="w-4 h-4 text-brand-green mr-2 flex-shrink-0" />
                            <span className="font-rubik">
                              ${event.estimatedBudget.toLocaleString()} estimated budget
                            </span>
                          </div>

                          <div className="flex items-center text-gray-300 text-sm">
                            <Clock className="w-4 h-4 text-brand-green mr-2 flex-shrink-0" />
                            <span className="font-rubik">
                              Response needed by {new Date(event.responseDeadline).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        
                        {/* Action */}
                        <div className="pt-2 border-t border-gray-700">
                          <div className="flex items-center justify-between">
                            <span className="text-brand-green text-sm font-medium font-rubik">
                              Submit Proposal →
                            </span>
                            <Badge className="bg-brand-green/20 text-brand-green border-brand-green text-xs">
                              Open
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="font-arial-black text-xl text-gray-400 mb-2">
                No opportunities found
              </h3>
              <p className="font-rubik text-gray-500 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedService('All')
                  setSelectedBudget('Any Budget')
                }}
                variant="outline"
                className="border-brand-green text-brand-green hover:bg-brand-green hover:text-black"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}