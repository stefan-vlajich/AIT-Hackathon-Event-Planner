import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Calendar, Clock, MapPin, Users, Star, Share2, BookmarkPlus,
  ArrowLeft, CheckCircle, AlertTriangle, Info, Phone, Mail, Globe
} from 'lucide-react'

// Mock event data - replace with actual API call
const mockEventDetail = {
  id: 1,
  title: 'Tech Conference 2025',
  description: 'Join us for the biggest tech conference of the year featuring industry leaders, innovative workshops, and networking opportunities. This comprehensive event will cover the latest trends in artificial intelligence, blockchain technology, cloud computing, and digital transformation.',
  eventDate: '2025-03-15',
  startTime: '9:00 AM',
  endTime: '6:00 PM',
  venueAddress: '123 Convention Center Dr',
  city: 'San Francisco',
  state: 'CA',
  categoryName: 'Technology',
  currentAttendeeCount: 450,
  maxAttendees: 500,
  eventImageURL: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
  organizationName: 'TechEvents Inc',
  organizationLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100',
  organizationWebsite: 'https://techevents.com',
  organizationPhone: '+1 (555) 123-4567',
  organizationEmail: 'contact@techevents.com',
  registrationDeadline: '2025-03-10',
  requiresApproval: false,
  isPublic: true,
  eventStatus: 'Published',
  rating: 4.8,
  totalRatings: 127,
  agenda: [
    { time: '9:00 AM', activity: 'Registration & Welcome Coffee' },
    { time: '10:00 AM', activity: 'Keynote: The Future of AI in Business' },
    { time: '11:30 AM', activity: 'Panel: Emerging Technologies' },
    { time: '1:00 PM', activity: 'Lunch & Networking' },
    { time: '2:30 PM', activity: 'Workshop: Building Scalable Applications' },
    { time: '4:00 PM', activity: 'Startup Pitch Competition' },
    { time: '5:30 PM', activity: 'Closing Remarks & Next Steps' }
  ],
  speakers: [
    { name: 'Dr. Sarah Johnson', role: 'AI Research Director', company: 'Google', avatar: null },
    { name: 'Mike Chen', role: 'CTO', company: 'Microsoft', avatar: null },
    { name: 'Lisa Rodriguez', role: 'VP Engineering', company: 'Netflix', avatar: null }
  ]
}

export function EventDetailPage() {
  const { eventId } = useParams()
  const [isRegistered, setIsRegistered] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [registrationStatus, setRegistrationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleRegistration = async () => {
    setRegistrationStatus('loading')
    try {
      // TODO: Implement actual API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsRegistered(true)
      setRegistrationStatus('success')
    } catch (error) {
      setRegistrationStatus('error')
    }
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: mockEventDetail.title,
        text: mockEventDetail.description,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('')
  }

  const isEventFull = mockEventDetail.currentAttendeeCount >= mockEventDetail.maxAttendees
  const daysUntilEvent = Math.ceil((new Date(mockEventDetail.eventDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Back Button */}
          <Link 
            to="/attendee/events" 
            className="inline-flex items-center text-brand-green hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="font-rubik">Back to Events</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Hero Image */}
              <div className="relative h-64 md:h-96 overflow-hidden rounded-lg">
                <img 
                  src={mockEventDetail.eventImageURL} 
                  alt={mockEventDetail.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge className="mb-2 bg-brand-green text-black font-medium">
                    {mockEventDetail.categoryName}
                  </Badge>
                  <h1 className="font-arial-black text-3xl md:text-4xl text-white mb-2">
                    {mockEventDetail.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-gray-200">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="font-rubik text-sm">{mockEventDetail.rating}</span>
                      <span className="font-rubik text-sm text-gray-400 ml-1">
                        ({mockEventDetail.totalRatings} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <Card className="bg-black/80 border-brand-green border">
                <CardHeader>
                  <CardTitle className="text-2xl font-arial-black text-brand-green">
                    Event Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="font-rubik text-gray-300 leading-relaxed">
                    {mockEventDetail.description}
                  </p>
                  
                  {/* Key Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center text-gray-300">
                      <Calendar className="w-5 h-5 text-brand-green mr-3" />
                      <div className="font-rubik">
                        <p className="font-medium">
                          {new Date(mockEventDetail.eventDate).toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                        <p className="text-sm text-gray-400">
                          {daysUntilEvent > 0 ? `${daysUntilEvent} days to go` : 'Event has passed'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-300">
                      <Clock className="w-5 h-5 text-brand-green mr-3" />
                      <div className="font-rubik">
                        <p className="font-medium">{mockEventDetail.startTime} - {mockEventDetail.endTime}</p>
                        <p className="text-sm text-gray-400">Pacific Standard Time</p>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-300">
                      <MapPin className="w-5 h-5 text-brand-green mr-3" />
                      <div className="font-rubik">
                        <p className="font-medium">{mockEventDetail.venueAddress}</p>
                        <p className="text-sm text-gray-400">
                          {mockEventDetail.city}, {mockEventDetail.state}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-300">
                      <Users className="w-5 h-5 text-brand-green mr-3" />
                      <div className="font-rubik">
                        <p className="font-medium">
                          {mockEventDetail.currentAttendeeCount} / {mockEventDetail.maxAttendees} attendees
                        </p>
                        <p className="text-sm text-gray-400">
                          {mockEventDetail.maxAttendees - mockEventDetail.currentAttendeeCount} spots remaining
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Agenda */}
              <Card className="bg-black/80 border-gray-600 border">
                <CardHeader>
                  <CardTitle className="text-xl font-arial-black text-brand-green">
                    Event Agenda
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockEventDetail.agenda.map((item, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="bg-brand-green/20 text-brand-green px-3 py-1 rounded-full text-sm font-medium min-w-fit">
                          {item.time}
                        </div>
                        <p className="font-rubik text-gray-300 flex-1">{item.activity}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Speakers */}
              <Card className="bg-black/80 border-gray-600 border">
                <CardHeader>
                  <CardTitle className="text-xl font-arial-black text-brand-green">
                    Featured Speakers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {mockEventDetail.speakers.map((speaker, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={speaker.avatar || ''} alt={speaker.name} />
                          <AvatarFallback className="bg-brand-green text-black font-bold">
                            {getInitials(speaker.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-rubik font-medium text-white">{speaker.name}</p>
                          <p className="font-rubik text-sm text-gray-400">{speaker.role}</p>
                          <p className="font-rubik text-sm text-brand-green">{speaker.company}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Registration Card */}
              <Card className="bg-black/80 border-brand-green border sticky top-24">
                <CardContent className="p-6">
                  {/* Registration Status */}
                  {isRegistered ? (
                    <div className="text-center mb-6">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                      <h3 className="font-arial-black text-lg text-green-500 mb-1">
                        Registration Confirmed!
                      </h3>
                      <p className="font-rubik text-gray-400 text-sm">
                        Check your email for event details
                      </p>
                    </div>
                  ) : (
                    <>
                      {isEventFull && (
                        <div className="bg-red-900/30 border border-red-700 rounded-lg p-3 mb-4">
                          <div className="flex items-center">
                            <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
                            <p className="font-rubik text-red-300 text-sm">This event is full</p>
                          </div>
                        </div>
                      )}
                      
                      <Button
                        onClick={handleRegistration}
                        disabled={registrationStatus === 'loading' || isEventFull}
                        className="w-full bg-brand-green hover:bg-green-400 text-black font-rubik font-medium text-lg py-3 mb-4"
                      >
                        {registrationStatus === 'loading' 
                          ? 'Registering...' 
                          : isEventFull 
                          ? 'Event Full' 
                          : 'Register for Event'
                        }
                      </Button>
                    </>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleBookmark}
                      variant="outline"
                      size="sm"
                      className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <BookmarkPlus className="w-4 h-4 mr-2" />
                      {isBookmarked ? 'Saved' : 'Save'}
                    </Button>
                    <Button
                      onClick={handleShare}
                      variant="outline"
                      size="sm"
                      className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>

                  {/* Registration Info */}
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center text-sm text-gray-400 mb-2">
                      <Info className="w-4 h-4 mr-2" />
                      <span className="font-rubik">Registration closes:</span>
                    </div>
                    <p className="font-rubik text-white">
                      {new Date(mockEventDetail.registrationDeadline).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Organizer Info */}
              <Card className="bg-black/80 border-gray-600 border">
                <CardHeader>
                  <CardTitle className="text-lg font-arial-black text-brand-green">
                    Event Organizer
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={mockEventDetail.organizationLogo} alt="Organizer" />
                      <AvatarFallback className="bg-brand-green text-black font-bold">
                        {getInitials(mockEventDetail.organizationName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-rubik font-medium text-white">
                        {mockEventDetail.organizationName}
                      </p>
                      <p className="font-rubik text-sm text-gray-400">Event Organizer</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-gray-300">
                      <Phone className="w-4 h-4 text-brand-green mr-2" />
                      <span className="font-rubik text-sm">{mockEventDetail.organizationPhone}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Mail className="w-4 h-4 text-brand-green mr-2" />
                      <span className="font-rubik text-sm">{mockEventDetail.organizationEmail}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Globe className="w-4 h-4 text-brand-green mr-2" />
                      <a 
                        href={mockEventDetail.organizationWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-rubik text-sm text-brand-green hover:text-white"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full border-brand-green text-brand-green hover:bg-brand-green hover:text-black"
                  >
                    Contact Organizer
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