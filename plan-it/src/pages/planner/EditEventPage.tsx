import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Calendar,
  ArrowLeft,
  Save,
  Eye,
  Trash2,
  Users,
  Clock,
  MapPin,
  Edit,
  AlertTriangle
} from 'lucide-react'

// This would be the same form as CreateEventPage but with pre-filled data
// For brevity, I'm creating a simplified version that shows the concept

// Mock event data (would come from API based on eventId)
const mockEventData = {
  101: {
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
    registrationDeadline: '2025-05-01',
    isPublic: true,
    requiresApproval: false
  },
  102: {
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
    registrationDeadline: '2025-04-10',
    isPublic: true,
    requiresApproval: false
  }
}

export function EditEventPage() {
  const navigate = useNavigate()
  const { eventId } = useParams<{ eventId: string }>()
  const [event, setEvent] = useState<any>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    // In a real app, fetch event data from API
    const eventData = mockEventData[eventId as keyof typeof mockEventData]
    if (eventData) {
      setEvent(eventData)
    } else {
      navigate('/planner/my-events')
    }
  }, [eventId, navigate])

  const handleSave = () => {
    // In a real app, this would update the event in the database
    console.log('Saving event changes:', event)
    navigate('/planner/my-events')
  }

  const handlePublish = () => {
    // In a real app, this would update event status to 'Published'
    console.log('Publishing event:', event)
    navigate('/planner/my-events')
  }

  const handleDelete = () => {
    // In a real app, this would delete the event
    console.log('Deleting event:', eventId)
    navigate('/planner/my-events')
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-green mx-auto mb-4"></div>
          <p className="text-gray-400 font-rubik">Loading event...</p>
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
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <Link to="/planner/my-events">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to My Events
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-arial-black text-4xl text-brand-green mb-2">
                  Edit Event
                </h1>
                <div className="flex items-center space-x-3">
                  <p className="font-rubik text-gray-300">
                    {event.title}
                  </p>
                  <Badge 
                    className={
                      event.eventStatus === 'Published' 
                        ? 'bg-green-600 text-white'
                        : event.eventStatus === 'Draft'
                        ? 'bg-yellow-600 text-white'
                        : 'bg-gray-600 text-white'
                    }
                  >
                    {event.eventStatus}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {event.eventStatus === 'Published' && (
                  <Link to={`/event/${event.id}`}>
                    <Button variant="outline" className="border-brand-green text-brand-green hover:bg-brand-green hover:text-black">
                      <Eye className="w-4 h-4 mr-2" />
                      View Live Event
                    </Button>
                  </Link>
                )}
                <Button
                  onClick={() => setShowDeleteConfirm(true)}
                  variant="outline"
                  className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Event
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-black/80 border-brand-green border">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-brand-green mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-white">{event.currentAttendeeCount}</p>
                    <p className="text-sm text-gray-400 font-rubik">Registered</p>
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
                      {Math.ceil((new Date(event.eventDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))}
                    </p>
                    <p className="text-sm text-gray-400 font-rubik">Days Until Event</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/80 border-gray-600 border">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Clock className="w-8 h-8 text-yellow-500 mr-3" />
                  <div>
                    <p className="text-lg font-bold text-white">{event.startTime}</p>
                    <p className="text-sm text-gray-400 font-rubik">Start Time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/80 border-gray-600 border">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <MapPin className="w-8 h-8 text-purple-500 mr-3" />
                  <div>
                    <p className="text-sm font-bold text-white line-clamp-1">{event.city}, {event.state}</p>
                    <p className="text-sm text-gray-400 font-rubik">Location</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notice for simplicity */}
          <Card className="bg-black/80 border-brand-green border mb-8">
            <CardContent className="p-8 text-center">
              <Edit className="w-16 h-16 text-brand-green mx-auto mb-4" />
              <h3 className="font-arial-black text-2xl text-white mb-4">
                Event Editor
              </h3>
              <p className="font-rubik text-gray-300 mb-6 max-w-2xl mx-auto">
                This would be the full event editing form (similar to the Create Event page) with all fields 
                pre-populated with the current event data. For demo purposes, we're showing the concept 
                with action buttons below.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-brand-green text-black hover:bg-green-400">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Event Details
                </Button>
                <Button variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Attendees
                </Button>
                <Button variant="outline" className="border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-700">
            <Link to="/planner/my-events">
              <Button variant="ghost" className="text-gray-400 hover:text-white">
                Back to My Events
              </Button>
            </Link>
            
            <div className="flex space-x-3">
              <Button
                onClick={handleSave}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              {event.eventStatus === 'Draft' && (
                <Button
                  onClick={handlePublish}
                  className="bg-brand-green text-black hover:bg-green-400"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Publish Event
                </Button>
              )}
            </div>
          </div>

          {/* Delete Confirmation Modal */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <Card className="bg-black/90 border-red-600 border max-w-md mx-4">
                <CardHeader>
                  <CardTitle className="font-arial-black text-red-400 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Delete Event
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    This action cannot be undone
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 font-rubik mb-6">
                    Are you sure you want to delete "{event.title}"? 
                    {event.currentAttendeeCount > 0 && (
                      <span className="text-red-400">
                        {' '}This event has {event.currentAttendeeCount} registered attendees.
                      </span>
                    )}
                  </p>
                  <div className="flex space-x-3">
                    <Button
                      onClick={() => setShowDeleteConfirm(false)}
                      variant="outline"
                      className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleDelete}
                      className="flex-1 bg-red-600 text-white hover:bg-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Event
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