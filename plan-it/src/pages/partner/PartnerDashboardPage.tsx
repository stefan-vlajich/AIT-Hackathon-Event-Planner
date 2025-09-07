import { useState } from 'react'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { ServiceRequestCard } from '@/components/partner/ServiceRequestCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Bell, CheckCircle, Clock, DollarSign, TrendingUp, AlertTriangle,
  Calendar, Users, Star, Award, Briefcase, ChartBar
} from 'lucide-react'

// Mock data for service requests
const mockServiceRequests = {
  pending: [
    {
      id: 1,
      eventId: 1,
      eventTitle: 'Corporate Annual Meeting 2025',
      eventDate: '2025-04-15',
      eventLocation: 'San Jose, CA',
      serviceType: 'Event Photography',
      serviceDescription: 'Full-day photography coverage including keynote presentations, networking sessions, and awards ceremony. Need high-resolution images for marketing use.',
      estimatedBudget: 3500,
      status: 'Requested' as const,
      requestedAt: '2025-02-15',
      responseDeadline: '2025-03-01',
      plannerName: 'Sarah Johnson',
      plannerOrganization: 'Tech Solutions Inc',
      eventAttendees: 200
    },
    {
      id: 2,
      eventId: 3,
      eventTitle: 'Tech Startup Launch Event',
      eventDate: '2025-05-10',
      eventLocation: 'San Francisco, CA',
      serviceType: 'Event Photography',
      serviceDescription: 'Product launch event photography with live social media posting capabilities. Fast turnaround required for same-day marketing.',
      estimatedBudget: 2800,
      status: 'Requested' as const,
      requestedAt: '2025-02-18',
      responseDeadline: '2025-03-15',
      plannerName: 'Mike Chen',
      plannerOrganization: 'Startup Accelerator',
      eventAttendees: 180
    }
  ],
  active: [
    {
      id: 3,
      eventId: 2,
      eventTitle: 'Summer Wedding Reception',
      eventDate: '2025-06-20',
      eventLocation: 'Napa, CA',
      serviceType: 'Wedding Photography',
      serviceDescription: 'Complete wedding photography package including ceremony, reception, and portrait sessions. Deliver edited gallery within 2 weeks.',
      estimatedBudget: 4500,
      status: 'Confirmed' as const,
      requestedAt: '2025-01-20',
      responseDeadline: '2025-04-01',
      plannerName: 'Emily Davis',
      plannerOrganization: 'Dream Weddings',
      eventAttendees: 120
    }
  ],
  completed: [
    {
      id: 4,
      eventId: 4,
      eventTitle: 'Holiday Corporate Party',
      eventDate: '2024-12-15',
      eventLocation: 'Oakland, CA',
      serviceType: 'Event Photography',
      serviceDescription: 'Holiday party photography with instant photo printing station for guests.',
      estimatedBudget: 2200,
      status: 'Confirmed' as const,
      requestedAt: '2024-11-01',
      plannerName: 'David Wilson',
      plannerOrganization: 'Global Corp',
      eventAttendees: 150
    }
  ]
}

export function PartnerDashboardPage() {
  const [activeTab, setActiveTab] = useState<'pending' | 'active' | 'completed'>('pending')
  const [notifications] = useState([
    { id: 1, message: 'New service request for Tech Startup Launch Event', type: 'new_request', time: '2 hours ago' },
    { id: 2, message: 'Response deadline approaching for Corporate Meeting', type: 'deadline', time: '1 day ago' },
    { id: 3, message: 'Payment received for Holiday Corporate Party', type: 'payment', time: '3 days ago' }
  ])

  const handleRequestResponse = (requestId: number, response: 'approve' | 'decline') => {
    console.log(`${response} request ${requestId}`)
    // TODO: Implement API call to respond to service request
  }

  const getCurrentRequests = () => {
    switch (activeTab) {
      case 'pending':
        return mockServiceRequests.pending
      case 'active':
        return mockServiceRequests.active
      case 'completed':
        return mockServiceRequests.completed
      default:
        return []
    }
  }

  const getTotalEarnings = () => {
    return [...mockServiceRequests.active, ...mockServiceRequests.completed]
      .reduce((sum, request) => sum + (request.estimatedBudget || 0), 0)
  }

  const getTabCount = (tab: string) => {
    switch (tab) {
      case 'pending':
        return mockServiceRequests.pending.length
      case 'active':
        return mockServiceRequests.active.length
      case 'completed':
        return mockServiceRequests.completed.length
      default:
        return 0
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="font-arial-black text-4xl text-brand-green mb-2">
                  Partner Dashboard
                </h1>
                <p className="font-rubik text-gray-300">
                  Manage your service requests and track your business performance
                </p>
              </div>
              
              {/* Notifications */}
              <div className="relative">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-brand-green text-brand-green hover:bg-brand-green hover:text-black"
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications ({notifications.length})
                </Button>
              </div>
            </div>
          </div>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-black/80 border-brand-green border">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Clock className="w-8 h-8 text-brand-green mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-white">{mockServiceRequests.pending.length}</p>
                    <p className="text-sm text-gray-400 font-rubik">Pending Requests</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/80 border-gray-600 border">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Briefcase className="w-8 h-8 text-blue-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-white">{mockServiceRequests.active.length}</p>
                    <p className="text-sm text-gray-400 font-rubik">Active Projects</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/80 border-gray-600 border">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="w-8 h-8 text-green-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-white">${getTotalEarnings().toLocaleString()}</p>
                    <p className="text-sm text-gray-400 font-rubik">Total Earnings</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/80 border-gray-600 border">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Star className="w-8 h-8 text-yellow-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-white">4.8</p>
                    <p className="text-sm text-gray-400 font-rubik">Avg Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Recent Notifications */}
              {notifications.length > 0 && (
                <Card className="bg-black/80 border-yellow-600 border mb-8">
                  <CardHeader>
                    <CardTitle className="text-xl font-arial-black text-yellow-400 flex items-center">
                      <Bell className="w-5 h-5 mr-2" />
                      Recent Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {notifications.slice(0, 3).map(notification => (
                        <div key={notification.id} className="flex items-start space-x-3 p-3 bg-gray-800/50 rounded-lg">
                          <div className="w-2 h-2 bg-brand-green rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1">
                            <p className="font-rubik text-gray-300 text-sm">{notification.message}</p>
                            <p className="font-rubik text-gray-500 text-xs mt-1">{notification.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Service Requests */}
              <Card className="bg-black/80 border-brand-green border">
                <CardHeader>
                  <CardTitle className="text-2xl font-arial-black text-brand-green">
                    Service Requests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Tab Navigation */}
                  <div className="flex space-x-1 mb-6 bg-black/50 p-1 rounded-lg border border-gray-700">
                    {[
                      { key: 'pending', label: 'Pending Response', icon: Clock },
                      { key: 'active', label: 'Active Projects', icon: CheckCircle },
                      { key: 'completed', label: 'Completed', icon: Award }
                    ].map(tab => {
                      const IconComponent = tab.icon
                      return (
                        <button
                          key={tab.key}
                          onClick={() => setActiveTab(tab.key as any)}
                          className={`flex-1 flex items-center justify-center px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
                            activeTab === tab.key
                              ? 'bg-brand-green text-black'
                              : 'text-gray-300 hover:text-white hover:bg-gray-700'
                          }`}
                        >
                          <IconComponent className="w-4 h-4 mr-2" />
                          <span className="font-rubik">
                            {tab.label} ({getTabCount(tab.key)})
                          </span>
                        </button>
                      )
                    })}
                  </div>

                  {/* Request Cards */}
                  <div className="space-y-6">
                    {getCurrentRequests().length > 0 ? (
                      getCurrentRequests().map(request => (
                        <ServiceRequestCard
                          key={request.id}
                          request={request}
                          onRespond={activeTab === 'pending' ? handleRequestResponse : undefined}
                        />
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                          {activeTab === 'pending' && <Clock className="w-8 h-8 text-gray-400" />}
                          {activeTab === 'active' && <CheckCircle className="w-8 h-8 text-gray-400" />}
                          {activeTab === 'completed' && <Award className="w-8 h-8 text-gray-400" />}
                        </div>
                        <h3 className="font-arial-black text-xl text-gray-400 mb-2">
                          No {activeTab} requests
                        </h3>
                        <p className="font-rubik text-gray-500 mb-6">
                          {activeTab === 'pending' 
                            ? "You don't have any pending requests. Check available events to find new opportunities!"
                            : activeTab === 'active'
                            ? "No active projects at the moment. Once you accept requests, they'll appear here."
                            : "Your completed projects will appear here."}
                        </p>
                        {activeTab === 'pending' && (
                          <Button
                            className="bg-brand-green hover:bg-green-400 text-black font-rubik"
                          >
                            Browse Available Events
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card className="bg-black/80 border-brand-green border">
                <CardHeader>
                  <CardTitle className="text-lg font-arial-black text-brand-green">
                    This Month
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <TrendingUp className="w-5 h-5 text-brand-green mr-2" />
                      <span className="font-rubik text-gray-300 text-sm">New Requests</span>
                    </div>
                    <Badge className="bg-brand-green text-black font-bold">
                      {mockServiceRequests.pending.length}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      <span className="font-rubik text-gray-300 text-sm">Completed</span>
                    </div>
                    <span className="font-rubik text-white font-medium">
                      {mockServiceRequests.completed.length}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <DollarSign className="w-5 h-5 text-green-500 mr-2" />
                      <span className="font-rubik text-gray-300 text-sm">Revenue</span>
                    </div>
                    <span className="font-rubik text-white font-medium">
                      $6,700
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card className="bg-black/80 border-gray-600 border">
                <CardHeader>
                  <CardTitle className="text-lg font-arial-black text-brand-green">
                    Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-rubik text-gray-300 text-sm">Response Rate</span>
                    <span className="font-rubik text-white">100%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-rubik text-gray-300 text-sm">On-time Delivery</span>
                    <span className="font-rubik text-white">98%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-rubik text-gray-300 text-sm">Client Satisfaction</span>
                    <span className="font-rubik text-white">4.8/5</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-black/80 border-gray-600 border">
                <CardHeader>
                  <CardTitle className="text-lg font-arial-black text-brand-green">
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full border-brand-green text-brand-green hover:bg-brand-green hover:text-black"
                  >
                    <ChartBar className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Browse Events
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Manage Calendar
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}