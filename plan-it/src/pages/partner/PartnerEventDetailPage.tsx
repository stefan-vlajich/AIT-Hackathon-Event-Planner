import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Calendar, Clock, MapPin, Users, Star, ArrowLeft, DollarSign,
  Building2, Phone, Mail, Globe, CheckCircle, AlertCircle, 
  FileText, Send, Briefcase, Award, Camera
} from 'lucide-react'

// Mock event data for partners
const mockPartnerEventDetail = {
  id: 1,
  title: 'Corporate Annual Meeting 2025',
  description: 'Large-scale corporate event requiring comprehensive photography services for keynote presentations, networking sessions, awards ceremony, and candid moments throughout the day. We need high-quality, professional images that will be used for marketing materials, social media, and corporate communications.',
  eventDate: '2025-04-15',
  startTime: '8:00 AM',
  endTime: '6:00 PM',
  venueAddress: '789 Business Center Dr',
  city: 'San Jose',
  state: 'CA',
  categoryName: 'Corporate',
  currentAttendeeCount: 200,
  maxAttendees: 250,
  eventImageURL: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800',
  organizationName: 'Tech Solutions Inc',
  organizationLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100',
  organizationWebsite: 'https://techsolutions.com',
  organizationPhone: '+1 (555) 123-4567',
  organizationEmail: 'events@techsolutions.com',
  eventStatus: 'Published',
  servicesNeeded: ['Photography', 'Catering', 'AV Equipment'],
  estimatedBudget: 15000,
  responseDeadline: '2025-03-01',
  priority: 'High',
  plannerName: 'Sarah Johnson',
  plannerTitle: 'Event Manager',
  requirements: [
    'Professional event photography with high-resolution images',
    'Coverage of all keynote presentations and panel discussions',
    'Networking session candid photography',
    'Awards ceremony formal photography',
    'Same-day photo preview for social media',
    'Full edited gallery delivery within 48 hours',
    'Commercial usage rights for marketing materials'
  ],
  agenda: [
    { time: '8:00 AM', activity: 'Registration & Welcome Coffee', coverage: 'Candid shots of arrival and networking' },
    { time: '9:00 AM', activity: 'Opening Keynote', coverage: 'Stage photography, speaker shots, audience reactions' },
    { time: '10:30 AM', activity: 'Industry Panel Discussion', coverage: 'Panel shots, audience Q&A' },
    { time: '12:00 PM', activity: 'Networking Lunch', coverage: 'Candid networking, food setup' },
    { time: '1:30 PM', activity: 'Breakout Sessions', coverage: 'Multiple room coverage, workshop activities' },
    { time: '3:30 PM', activity: 'Awards Ceremony', coverage: 'Formal presentations, winner shots' },
    { time: '5:00 PM', activity: 'Closing Reception', coverage: 'Networking, company leadership shots' }
  ]
}

export function PartnerEventDetailPage() {
  const { eventId } = useParams()
  const [proposalData, setProposalData] = useState({
    serviceDescription: '',
    proposedCost: '',
    timeline: '',
    additionalNotes: '',
    portfolioLinks: '',
    teamSize: '',
    equipment: ''
  })
  const [isSubmittingProposal, setIsSubmittingProposal] = useState(false)
  const [hasSubmittedProposal, setHasSubmittedProposal] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProposalData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmitProposal = async () => {
    setIsSubmittingProposal(true)
    try {
      // TODO: Implement actual API call to submit proposal
      console.log('Submitting proposal:', proposalData)
      await new Promise(resolve => setTimeout(resolve, 2000))
      setHasSubmittedProposal(true)
    } catch (error) {
      console.error('Failed to submit proposal:', error)
    } finally {
      setIsSubmittingProposal(false)
    }
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('')
  }

  const daysUntilDeadline = Math.ceil((new Date(mockPartnerEventDetail.responseDeadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  const daysUntilEvent = Math.ceil((new Date(mockPartnerEventDetail.eventDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-600'
      case 'Medium': return 'bg-yellow-600'
      case 'Low': return 'bg-green-600'
      default: return 'bg-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Back Button */}
          <Link 
            to="/partner/events" 
            className="inline-flex items-center text-brand-green hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="font-rubik">Back to Available Events</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Hero Image and Title */}
              <div className="relative h-64 md:h-96 overflow-hidden rounded-lg">
                <img 
                  src={mockPartnerEventDetail.eventImageURL} 
                  alt={mockPartnerEventDetail.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge className="bg-brand-green text-black font-medium">
                      {mockPartnerEventDetail.categoryName}
                    </Badge>
                    <Badge className={`${getPriorityColor(mockPartnerEventDetail.priority)} text-white`}>
                      {mockPartnerEventDetail.priority} Priority
                    </Badge>
                    {daysUntilDeadline <= 7 && (
                      <Badge className="bg-orange-600 text-white">
                        {daysUntilDeadline}d to respond
                      </Badge>
                    )}
                  </div>
                  <h1 className="font-arial-black text-3xl md:text-4xl text-white mb-2">
                    {mockPartnerEventDetail.title}
                  </h1>
                  <p className="text-gray-200 font-rubik">{mockPartnerEventDetail.organizationName}</p>
                </div>
              </div>

              {/* Event Details */}
              <Card className="bg-black/80 border-brand-green border">
                <CardHeader>
                  <CardTitle className="text-2xl font-arial-black text-brand-green">
                    Event Details & Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="font-rubik text-gray-300 leading-relaxed">
                    {mockPartnerEventDetail.description}
                  </p>
                  
                  {/* Key Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center text-gray-300">
                      <Calendar className="w-5 h-5 text-brand-green mr-3" />
                      <div className="font-rubik">
                        <p className="font-medium">
                          {new Date(mockPartnerEventDetail.eventDate).toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                        <p className="text-sm text-gray-400">
                          {daysUntilEvent} days away
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-300">
                      <Clock className="w-5 h-5 text-brand-green mr-3" />
                      <div className="font-rubik">
                        <p className="font-medium">{mockPartnerEventDetail.startTime} - {mockPartnerEventDetail.endTime}</p>
                        <p className="text-sm text-gray-400">10 hours coverage</p>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-300">
                      <MapPin className="w-5 h-5 text-brand-green mr-3" />
                      <div className="font-rubik">
                        <p className="font-medium">{mockPartnerEventDetail.venueAddress}</p>
                        <p className="text-sm text-gray-400">
                          {mockPartnerEventDetail.city}, {mockPartnerEventDetail.state}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-300">
                      <Users className="w-5 h-5 text-brand-green mr-3" />
                      <div className="font-rubik">
                        <p className="font-medium">{mockPartnerEventDetail.currentAttendeeCount} attendees</p>
                        <p className="text-sm text-gray-400">Corporate professionals</p>
                      </div>
                    </div>
                  </div>

                  {/* Services Needed */}
                  <div className="pt-4 border-t border-gray-700">
                    <h4 className="font-rubik font-medium text-brand-green mb-3">Services Needed</h4>
                    <div className="flex flex-wrap gap-2">
                      {mockPartnerEventDetail.servicesNeeded.map(service => (
                        <Badge key={service} variant="outline" className="border-brand-green text-brand-green">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Specific Requirements */}
                  <div className="pt-4 border-t border-gray-700">
                    <h4 className="font-rubik font-medium text-brand-green mb-3">Photography Requirements</h4>
                    <ul className="space-y-2">
                      {mockPartnerEventDetail.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-brand-green mr-2 mt-0.5 flex-shrink-0" />
                          <span className="font-rubik text-gray-300 text-sm">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Event Schedule */}
              <Card className="bg-black/80 border-gray-600 border">
                <CardHeader>
                  <CardTitle className="text-xl font-arial-black text-brand-green">
                    Event Schedule & Coverage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockPartnerEventDetail.agenda.map((item, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                        <div className="bg-brand-green/20 text-brand-green px-3 py-1 rounded-full text-sm font-medium min-w-fit">
                          {item.time}
                        </div>
                        <div className="flex-1">
                          <p className="font-rubik text-white font-medium mb-1">{item.activity}</p>
                          <p className="font-rubik text-gray-400 text-sm">{item.coverage}</p>
                        </div>
                        <Camera className="w-4 h-4 text-brand-green mt-1" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Proposal Submission */}
              {!hasSubmittedProposal ? (
                <Card className="bg-black/80 border-brand-green border">
                  <CardHeader>
                    <CardTitle className="text-2xl font-arial-black text-brand-green flex items-center">
                      <Send className="w-6 h-6 mr-2" />
                      Submit Your Proposal
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="proposedCost" className="text-brand-green font-rubik">
                          Proposed Cost ($)
                        </Label>
                        <Input
                          id="proposedCost"
                          name="proposedCost"
                          type="number"
                          value={proposalData.proposedCost}
                          onChange={handleInputChange}
                          className="bg-transparent border-gray-600 text-white focus:border-brand-green"
                          placeholder="3500"
                        />
                      </div>

                      <div>
                        <Label htmlFor="teamSize" className="text-brand-green font-rubik">
                          Team Size
                        </Label>
                        <Input
                          id="teamSize"
                          name="teamSize"
                          value={proposalData.teamSize}
                          onChange={handleInputChange}
                          className="bg-transparent border-gray-600 text-white focus:border-brand-green"
                          placeholder="2 photographers + 1 assistant"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="serviceDescription" className="text-brand-green font-rubik">
                        Service Description
                      </Label>
                      <Textarea
                        id="serviceDescription"
                        name="serviceDescription"
                        value={proposalData.serviceDescription}
                        onChange={handleInputChange}
                        className="bg-transparent border-gray-600 text-white focus:border-brand-green"
                        rows={4}
                        placeholder="Describe your photography services, approach, and what you'll deliver..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="equipment" className="text-brand-green font-rubik">
                        Equipment & Technology
                      </Label>
                      <Textarea
                        id="equipment"
                        name="equipment"
                        value={proposalData.equipment}
                        onChange={handleInputChange}
                        className="bg-transparent border-gray-600 text-white focus:border-brand-green"
                        rows={3}
                        placeholder="List your cameras, lenses, lighting equipment, backup gear..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="timeline" className="text-brand-green font-rubik">
                        Delivery Timeline
                      </Label>
                      <Input
                        id="timeline"
                        name="timeline"
                        value={proposalData.timeline}
                        onChange={handleInputChange}
                        className="bg-transparent border-gray-600 text-white focus:border-brand-green"
                        placeholder="Same day preview, full gallery within 48 hours"
                      />
                    </div>

                    <div>
                      <Label htmlFor="portfolioLinks" className="text-brand-green font-rubik">
                        Portfolio Links
                      </Label>
                      <Input
                        id="portfolioLinks"
                        name="portfolioLinks"
                        value={proposalData.portfolioLinks}
                        onChange={handleInputChange}
                        className="bg-transparent border-gray-600 text-white focus:border-brand-green"
                        placeholder="Links to similar corporate event work"
                      />
                    </div>

                    <div>
                      <Label htmlFor="additionalNotes" className="text-brand-green font-rubik">
                        Additional Notes
                      </Label>
                      <Textarea
                        id="additionalNotes"
                        name="additionalNotes"
                        value={proposalData.additionalNotes}
                        onChange={handleInputChange}
                        className="bg-transparent border-gray-600 text-white focus:border-brand-green"
                        rows={3}
                        placeholder="Any additional information, questions, or special considerations..."
                      />
                    </div>

                    <Button
                      onClick={handleSubmitProposal}
                      disabled={isSubmittingProposal}
                      className="w-full bg-brand-green hover:bg-green-400 text-black font-rubik font-medium text-lg py-3"
                    >
                      {isSubmittingProposal ? 'Submitting Proposal...' : 'Submit Proposal'}
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-black/80 border-green-600 border">
                  <CardContent className="p-8 text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="font-arial-black text-2xl text-green-500 mb-2">
                      Proposal Submitted Successfully!
                    </h3>
                    <p className="font-rubik text-gray-300 mb-4">
                      Your proposal has been sent to {mockPartnerEventDetail.organizationName}. 
                      They will review and respond by {new Date(mockPartnerEventDetail.responseDeadline).toLocaleDateString()}.
                    </p>
                    <div className="flex space-x-4 justify-center">
                      <Button 
                        variant="outline"
                        className="border-brand-green text-brand-green hover:bg-brand-green hover:text-black"
                      >
                        View Dashboard
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        Browse More Events
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Opportunity Summary */}
              <Card className="bg-black/80 border-brand-green border sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg font-arial-black text-brand-green">
                    Opportunity Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-rubik text-gray-300 text-sm">Estimated Budget</span>
                    <span className="font-rubik text-white font-bold text-lg">
                      ${mockPartnerEventDetail.estimatedBudget.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-rubik text-gray-300 text-sm">Response Deadline</span>
                    <div className="text-right">
                      <p className="font-rubik text-white font-medium">
                        {new Date(mockPartnerEventDetail.responseDeadline).toLocaleDateString()}
                      </p>
                      <p className="font-rubik text-brand-green text-xs">
                        {daysUntilDeadline} days left
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-rubik text-gray-300 text-sm">Competition Level</span>
                    <Badge className="bg-yellow-600 text-white">
                      Medium
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-rubik text-gray-300 text-sm">Service Match</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-brand-green mr-1" />
                      <span className="font-rubik text-brand-green font-medium">95%</span>
                    </div>
                  </div>

                  {daysUntilDeadline <= 3 && (
                    <div className="bg-orange-900/30 border border-orange-700 rounded-lg p-3">
                      <div className="flex items-center">
                        <AlertCircle className="w-4 h-4 text-orange-400 mr-2" />
                        <p className="font-rubik text-orange-300 text-sm">Urgent deadline approaching!</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Planner Information */}
              <Card className="bg-black/80 border-gray-600 border">
                <CardHeader>
                  <CardTitle className="text-lg font-arial-black text-brand-green">
                    Event Planner
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={mockPartnerEventDetail.organizationLogo} alt="Planner" />
                      <AvatarFallback className="bg-brand-green text-black font-bold">
                        {getInitials(mockPartnerEventDetail.plannerName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-rubik font-medium text-white">
                        {mockPartnerEventDetail.plannerName}
                      </p>
                      <p className="font-rubik text-sm text-gray-400">
                        {mockPartnerEventDetail.plannerTitle}
                      </p>
                      <p className="font-rubik text-xs text-brand-green">
                        {mockPartnerEventDetail.organizationName}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-gray-300">
                      <Phone className="w-4 h-4 text-brand-green mr-2" />
                      <span className="font-rubik text-sm">{mockPartnerEventDetail.organizationPhone}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Mail className="w-4 h-4 text-brand-green mr-2" />
                      <span className="font-rubik text-sm">{mockPartnerEventDetail.organizationEmail}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Globe className="w-4 h-4 text-brand-green mr-2" />
                      <a 
                        href={mockPartnerEventDetail.organizationWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-rubik text-sm text-brand-green hover:text-white"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>

                  {/* Company Stats */}
                  <div className="pt-4 border-t border-gray-700">
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div>
                        <p className="font-rubik text-lg font-bold text-white">4.9</p>
                        <p className="font-rubik text-xs text-gray-400">Planner Rating</p>
                      </div>
                      <div>
                        <p className="font-rubik text-lg font-bold text-white">47</p>
                        <p className="font-rubik text-xs text-gray-400">Events Hosted</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card className="bg-black/80 border-blue-600 border">
                <CardHeader>
                  <CardTitle className="text-lg font-arial-black text-blue-400 flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Pro Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-brand-green rounded-full mt-2 mr-2 flex-shrink-0"></div>
                      <span className="font-rubik text-gray-300">
                        Highlight your corporate event experience
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-brand-green rounded-full mt-2 mr-2 flex-shrink-0"></div>
                      <span className="font-rubik text-gray-300">
                        Include fast turnaround capabilities
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-brand-green rounded-full mt-2 mr-2 flex-shrink-0"></div>
                      <span className="font-rubik text-gray-300">
                        Mention backup equipment and team
                      </span>
                    </li>
                  </ul>
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