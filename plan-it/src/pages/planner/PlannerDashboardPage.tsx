import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Calendar,
  Users,
  TrendingUp,
  DollarSign,
  Clock,
  MapPin,
  Star,
  Plus,
  ArrowRight,
  AlertCircle,
  CheckCircle
} from 'lucide-react'

// Mock analytics data
const mockDashboardData = {
  totalEvents: 47,
  activeEvents: 8,
  totalAttendees: 3420,
  averageRating: 4.8,
  monthlyGrowth: 23,
  revenueThisMonth: 125000,
  upcomingEvents: [
    {
      id: 102,
      title: 'Tech Innovation Gala 2025',
      date: '2025-04-20',
      time: '7:00 PM',
      location: 'Palo Alto, CA',
      attendees: 125,
      maxAttendees: 200,
      status: 'Published'
    },
    {
      id: 103,
      title: 'Sustainable Future Conference',
      date: '2025-06-10',
      time: '9:00 AM',
      location: 'San Jose, CA',
      attendees: 87,
      maxAttendees: 150,
      status: 'Published'
    },
    {
      id: 101,
      title: 'Corporate Leadership Summit 2025',
      date: '2025-05-15',
      time: '8:00 AM',
      location: 'San Francisco, CA',
      attendees: 0,
      maxAttendees: 300,
      status: 'Draft'
    }
  ],
  recentActivity: [
    {
      id: 1,
      type: 'registration',
      message: 'John Smith registered for Tech Innovation Gala 2025',
      time: '2 hours ago',
      icon: Users
    },
    {
      id: 2,
      type: 'partner_request',
      message: 'New catering proposal received for Corporate Leadership Summit',
      time: '4 hours ago',
      icon: AlertCircle
    },
    {
      id: 3,
      type: 'event_published',
      message: 'Sustainable Future Conference was published',
      time: '1 day ago',
      icon: CheckCircle
    },
    {
      id: 4,
      type: 'registration',
      message: 'Sarah Johnson registered for Sustainable Future Conference',
      time: '2 days ago',
      icon: Users
    }
  ],
  partnerRequests: [
    {
      id: 1,
      eventTitle: 'Tech Innovation Gala 2025',
      partnerName: 'Gourmet Catering Co.',
      serviceType: 'Catering',
      status: 'Pending',
      requestDate: '2025-01-15'
    },
    {
      id: 2,
      eventTitle: 'Corporate Leadership Summit 2025',
      partnerName: 'Elite Photography Studio',
      serviceType: 'Photography',
      status: 'Pending',
      requestDate: '2025-01-14'
    }
  ],
  monthlyStats: [
    { month: 'Jan', events: 4, attendees: 320 },
    { month: 'Feb', events: 6, attendees: 480 },
    { month: 'Mar', events: 8, attendees: 640 },
    { month: 'Apr', events: 5, attendees: 400 },
    { month: 'May', events: 7, attendees: 560 },
    { month: 'Jun', events: 9, attendees: 720 }
  ]
}

export function PlannerDashboardPage() {
  const [timeFilter, setTimeFilter] = useState('thisMonth')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-600'
      case 'Draft': return 'bg-yellow-600'
      case 'Pending': return 'bg-orange-600'
      default: return 'bg-gray-600'
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'registration': return Users
      case 'partner_request': return AlertCircle
      case 'event_published': return CheckCircle
      default: return Calendar
    }
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
                Dashboard
              </h1>
              <p className="font-rubik text-gray-300">
                Overview of your event planning organization
              </p>
            </div>
            
            <div className="flex space-x-3">
              <Link to="/planner/create-event">
                <Button className="bg-brand-green text-black hover:bg-green-400 font-medium">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              </Link>
              <Link to="/planner/my-events">
                <Button
                  variant="outline"
                  className="bg-gray-900 border-gray-800 text-white hover:bg-gray-800 hover:text-brand-green"
                >
                  View All Events
                </Button>
              </Link>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-black/80 border-brand-green border">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Calendar className="w-8 h-8 text-brand-green mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-white">{mockDashboardData.totalEvents}</p>
                    <p className="text-sm text-gray-400 font-rubik">Total Events</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-green-500 font-medium">
                    {mockDashboardData.activeEvents} active
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/80 border-gray-600 border">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-blue-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-white">{mockDashboardData.totalAttendees.toLocaleString()}</p>
                    <p className="text-sm text-gray-400 font-rubik">Total Attendees</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">
                    +{mockDashboardData.monthlyGrowth}% this month
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/80 border-gray-600 border">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Star className="w-8 h-8 text-yellow-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-white">{mockDashboardData.averageRating}</p>
                    <p className="text-sm text-gray-400 font-rubik">Avg Rating</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-yellow-500 font-medium">
                    Excellent rating
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/80 border-gray-600 border">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="w-8 h-8 text-green-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-white">
                      ${mockDashboardData.revenueThisMonth.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-400 font-rubik">This Month</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">
                    +15% vs last month
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Upcoming Events */}
            <Card className="bg-black/80 border-brand-green border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-arial-black text-brand-green">
                    Upcoming Events
                  </CardTitle>
                  <Link to="/planner/my-events">
                    <Button variant="ghost" size="sm" className="text-brand-green hover:text-green-400">
                      View All
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
                <CardDescription className="text-gray-400 font-rubik">
                  Your next events requiring attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockDashboardData.upcomingEvents.map(event => (
                    <div key={event.id} className="flex items-start space-x-4 p-4 rounded-lg bg-gray-800/50">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <p className="font-arial-black text-white text-sm truncate">
                            {event.title}
                          </p>
                          <Badge className={`${getStatusColor(event.status)} text-white text-xs`}>
                            {event.status}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center text-gray-400 text-xs">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(event.date).toLocaleDateString()} at {event.time}
                          </div>
                          <div className="flex items-center text-gray-400 text-xs">
                            <MapPin className="w-3 h-3 mr-1" />
                            {event.location}
                          </div>
                          <div className="flex items-center text-gray-400 text-xs">
                            <Users className="w-3 h-3 mr-1" />
                            {event.attendees} / {event.maxAttendees} registered
                          </div>
                        </div>
                      </div>
                      <Link to={`/planner/event/${event.id}/edit`}>
                        <Button variant="ghost" size="sm" className="text-brand-green hover:text-green-400">
                          Edit
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-black/80 border-gray-600 border">
              <CardHeader>
                <CardTitle className="font-arial-black text-white">Recent Activity</CardTitle>
                <CardDescription className="text-gray-400 font-rubik">
                  Latest updates across your events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockDashboardData.recentActivity.map(activity => {
                    const IconComponent = getActivityIcon(activity.type)
                    return (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-brand-green/20 flex items-center justify-center">
                            <IconComponent className="w-4 h-4 text-brand-green" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white font-rubik">
                            {activity.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Partner Requests */}
          <Card className="bg-black/80 border-gray-600 border mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-arial-black text-white">
                    Pending Partner Requests
                  </CardTitle>
                  <CardDescription className="text-gray-400 font-rubik">
                    Service providers requesting to work on your events
                  </CardDescription>
                </div>
                <Link to="/planner/partners">
                  <Button
                    variant="outline"
                    className="bg-gray-900 border-gray-800 text-white hover:bg-gray-800 hover:text-brand-green"
                  >
                    View All Requests
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {mockDashboardData.partnerRequests.length > 0 ? (
                <div className="space-y-4">
                  {mockDashboardData.partnerRequests.map(request => (
                    <div key={request.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <p className="font-arial-black text-white">
                            {request.partnerName}
                          </p>
                          <Badge variant="outline" className="border-brand-green text-brand-green">
                            {request.serviceType}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400 font-rubik">
                          Requesting services for {request.eventTitle}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Requested {new Date(request.requestDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="bg-brand-green text-black hover:bg-green-400"
                        >
                          Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 font-rubik">No pending partner requests</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-black/80 border-brand-green border">
            <CardHeader>
              <CardTitle className="font-arial-black text-brand-green">
                Quick Actions
              </CardTitle>
              <CardDescription className="text-gray-400 font-rubik">
                Common tasks to manage your events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/planner/create-event">
                  <Button className="w-full bg-brand-green text-black hover:bg-green-400 h-20 flex-col">
                    <Plus className="w-6 h-6 mb-2" />
                    <span className="font-rubik">Create New Event</span>
                  </Button>
                </Link>
                <Link to="/planner/my-events">
                  <Button variant="outline" className="w-full bg-gray-900 border-gray-800 text-white hover:bg-gray-800 hover:text-brand-green h-20 flex-col">
                    <Calendar className="w-6 h-6 mb-2" />
                    <span className="font-rubik">Manage Events</span>
                  </Button>
                </Link>
                <Link to="/planner/partners">
                  <Button variant="outline" className="w-full bg-gray-900 border-gray-800 text-white hover:bg-gray-800 hover:text-brand-green h-20 flex-col">
                    <Users className="w-6 h-6 mb-2" />
                    <span className="font-rubik">Partner Requests</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}