import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Calendar,
  Users,
  Building2,
  Star,
  Phone,
  Mail,
  FileText
} from 'lucide-react'

// Mock data for partner requests
const mockPartnerRequests = [
  {
    id: 1,
    eventId: 102,
    eventTitle: 'Tech Innovation Gala 2025',
    eventDate: '2025-04-20',
    partnerName: 'Gourmet Catering Co.',
    partnerEmail: 'contact@gourmetcatering.com',
    partnerPhone: '+1 (555) 123-4567',
    serviceType: 'Catering',
    status: 'Pending',
    requestDate: '2025-01-15',
    estimatedCost: 8500,
    serviceDescription: 'Full-service catering for 200 guests including appetizers, main course, desserts, and beverages. Premium menu with dietary accommodations.',
    partnerRating: 4.8,
    completedEvents: 47,
    partnerImage: 'https://images.unsplash.com/photo-1577308856961-8e1c1b3c6029?w=400'
  },
  {
    id: 2,
    eventId: 101,
    eventTitle: 'Corporate Leadership Summit 2025',
    eventDate: '2025-05-15',
    partnerName: 'Elite Photography Studio',
    partnerEmail: 'booking@elitephoto.com',
    partnerPhone: '+1 (555) 987-6543',
    serviceType: 'Photography',
    status: 'Pending',
    requestDate: '2025-01-14',
    estimatedCost: 3200,
    serviceDescription: 'Professional event photography covering keynote sessions, networking, and awards ceremony. Includes edited digital gallery and print rights.',
    partnerRating: 4.9,
    completedEvents: 73,
    partnerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
  },
  {
    id: 3,
    eventId: 103,
    eventTitle: 'Sustainable Future Conference',
    eventDate: '2025-06-10',
    partnerName: 'Green Event Solutions',
    partnerEmail: 'hello@greeneventsolutions.com',
    partnerPhone: '+1 (555) 456-7890',
    serviceType: 'Decorations',
    status: 'Approved',
    requestDate: '2025-01-10',
    approvedDate: '2025-01-12',
    estimatedCost: 4800,
    serviceDescription: 'Eco-friendly event decorations including sustainable floral arrangements, recycled signage, and energy-efficient lighting.',
    partnerRating: 4.7,
    completedEvents: 32,
    partnerImage: 'https://images.unsplash.com/photo-1494790108755-2616b7ad2080?w=400'
  },
  {
    id: 4,
    eventId: 102,
    eventTitle: 'Tech Innovation Gala 2025',
    eventDate: '2025-04-20',
    partnerName: 'Premier DJ Services',
    partnerEmail: 'events@premierdj.com',
    partnerPhone: '+1 (555) 234-5678',
    serviceType: 'DJ',
    status: 'Declined',
    requestDate: '2025-01-08',
    declinedDate: '2025-01-09',
    estimatedCost: 1800,
    serviceDescription: 'Professional DJ services for cocktail hour and after-dinner entertainment with premium sound system.',
    partnerRating: 4.6,
    completedEvents: 28,
    partnerImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    declineReason: 'Schedule conflict with another event'
  }
]

const statusConfig = {
  Pending: {
    color: 'bg-yellow-600 text-white',
    icon: Clock,
    text: 'Pending Review'
  },
  Approved: {
    color: 'bg-green-600 text-white',
    icon: CheckCircle,
    text: 'Approved'
  },
  Declined: {
    color: 'bg-red-600 text-white',
    icon: XCircle,
    text: 'Declined'
  }
}

const tabs = [
  { id: 'pending', label: 'Pending', count: mockPartnerRequests.filter(r => r.status === 'Pending').length },
  { id: 'approved', label: 'Approved', count: mockPartnerRequests.filter(r => r.status === 'Approved').length },
  { id: 'declined', label: 'Declined', count: mockPartnerRequests.filter(r => r.status === 'Declined').length },
  { id: 'all', label: 'All Requests', count: mockPartnerRequests.length }
]

export function PlannerPartnersPage() {
  const [activeTab, setActiveTab] = useState('pending')
  const [searchTerm, setSearchTerm] = useState('')

  const getCurrentRequests = () => {
    let filtered = mockPartnerRequests
    
    if (activeTab !== 'all') {
      filtered = filtered.filter(request => 
        request.status.toLowerCase() === activeTab
      )
    }

    if (searchTerm) {
      filtered = filtered.filter(request =>
        request.partnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.serviceType.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered
  }

  const handleApprove = (requestId: number) => {
    // In a real app, this would make an API call
    console.log('Approving request:', requestId)
  }

  const handleDecline = (requestId: number) => {
    // In a real app, this would make an API call
    console.log('Declining request:', requestId)
  }

  const renderRequestCard = (request: any) => {
    const status = statusConfig[request.status as keyof typeof statusConfig]
    const StatusIcon = status.icon

    return (
      <Card key={request.id} className="bg-black/80 border-brand-green border hover:border-brand-green/80 transition-all duration-300">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={request.partnerImage} />
                <AvatarFallback className="bg-brand-green text-black font-bold">
                  {request.partnerName.split(' ').map((n: string) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-xl font-arial-black text-brand-green">
                  {request.partnerName}
                </CardTitle>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline" className="border-brand-green text-brand-green text-xs">
                    {request.serviceType}
                  </Badge>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span>{request.partnerRating} ({request.completedEvents} events)</span>
                  </div>
                </div>
              </div>
            </div>
            <Badge className={`${status.color} border-0`}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {status.text}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Event Details */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-arial-black text-white">Event Request</h4>
              <Link 
                to={`/planner/event/${request.eventId}/edit`}
                className="text-brand-green hover:text-green-400 text-sm font-rubik"
              >
                View Event →
              </Link>
            </div>
            <p className="font-rubik text-brand-green font-medium mb-2">
              {request.eventTitle}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-300">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 text-brand-green mr-2" />
                {new Date(request.eventDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
              <div className="flex items-center">
                <DollarSign className="w-4 h-4 text-brand-green mr-2" />
                Estimated: ${request.estimatedCost.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Service Description */}
          <div>
            <h5 className="font-arial-black text-white mb-2 flex items-center">
              <FileText className="w-4 h-4 text-brand-green mr-2" />
              Service Details
            </h5>
            <p className="text-gray-300 text-sm font-rubik leading-relaxed">
              {request.serviceDescription}
            </p>
          </div>

          {/* Partner Contact */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h5 className="font-arial-black text-white mb-3">Contact Information</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 text-brand-green mr-2" />
                <a href={`mailto:${request.partnerEmail}`} className="hover:text-brand-green">
                  {request.partnerEmail}
                </a>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="w-4 h-4 text-brand-green mr-2" />
                <a href={`tel:${request.partnerPhone}`} className="hover:text-brand-green">
                  {request.partnerPhone}
                </a>
              </div>
            </div>
          </div>

          {/* Request Info */}
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>
              Requested on {new Date(request.requestDate).toLocaleDateString()}
            </span>
            {request.status === 'Approved' && request.approvedDate && (
              <span className="text-green-500">
                Approved on {new Date(request.approvedDate).toLocaleDateString()}
              </span>
            )}
            {request.status === 'Declined' && request.declinedDate && (
              <span className="text-red-500">
                Declined on {new Date(request.declinedDate).toLocaleDateString()}
              </span>
            )}
          </div>

          {/* Decline Reason */}
          {request.status === 'Declined' && request.declineReason && (
            <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-3">
              <p className="text-red-300 text-sm font-rubik">
                <strong>Decline Reason:</strong> {request.declineReason}
              </p>
            </div>
          )}

          {/* Actions */}
          {request.status === 'Pending' && (
            <div className="flex space-x-3 pt-4 border-t border-gray-700">
              <Button
                onClick={() => handleApprove(request.id)}
                className="flex-1 bg-brand-green text-black hover:bg-green-400"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve Request
              </Button>
              <Button
                onClick={() => handleDecline(request.id)}
                variant="outline"
                className="flex-1 border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Decline
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
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
              Partner Requests
            </h1>
            <p className="font-rubik text-gray-300">
              Manage service provider requests for your events
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-black/80 border-brand-green border">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Clock className="w-8 h-8 text-yellow-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {mockPartnerRequests.filter(r => r.status === 'Pending').length}
                    </p>
                    <p className="text-sm text-gray-400 font-rubik">Pending Review</p>
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
                      {mockPartnerRequests.filter(r => r.status === 'Approved').length}
                    </p>
                    <p className="text-sm text-gray-400 font-rubik">Approved</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/80 border-gray-600 border">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <XCircle className="w-8 h-8 text-red-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {mockPartnerRequests.filter(r => r.status === 'Declined').length}
                    </p>
                    <p className="text-sm text-gray-400 font-rubik">Declined</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/80 border-gray-600 border">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="w-8 h-8 text-green-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-white">
                      ${mockPartnerRequests
                        .filter(r => r.status === 'Approved')
                        .reduce((sum, r) => sum + r.estimatedCost, 0)
                        .toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-400 font-rubik">Approved Value</p>
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
                placeholder="Search partners, events, or services..."
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
                    {tab.label} ({tab.count})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Requests Content */}
          <div className="min-h-[400px]">
            {getCurrentRequests().length > 0 ? (
              <div className="space-y-6">
                {getCurrentRequests().map(renderRequestCard)}
              </div>
            ) : (
              <div className="text-center py-16">
                <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="font-arial-black text-xl text-gray-400 mb-2">
                  {searchTerm ? 'No requests found' : `No ${activeTab} requests`}
                </h3>
                <p className="font-rubik text-gray-500 mb-4">
                  {searchTerm 
                    ? 'Try adjusting your search terms'
                    : activeTab === 'pending'
                    ? 'New partner requests will appear here when service providers apply to work on your events'
                    : activeTab === 'approved'
                    ? 'Approved partner requests will be shown here'
                    : 'Declined requests will be listed here'
                  }
                </p>
                {!searchTerm && activeTab === 'pending' && (
                  <Link to="/planner/create-event">
                    <Button className="bg-brand-green text-black hover:bg-green-400">
                      Create Event to Attract Partners
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