import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Camera,
  Save,
  Eye,
  ArrowLeft,
  Upload,
  Globe,
  Lock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

// Mock event categories from database
const eventCategories = [
  { id: 1, name: 'Wedding', description: 'Wedding ceremonies and receptions' },
  { id: 2, name: 'Corporate', description: 'Business events and conferences' },
  { id: 3, name: 'Birthday', description: 'Birthday parties and celebrations' },
  { id: 4, name: 'Conference', description: 'Professional conferences and seminars' },
  { id: 5, name: 'Social', description: 'Social gatherings and parties' }
]

interface EventFormData {
  title: string
  description: string
  categoryId: number | null
  eventDate: string
  startTime: string
  endTime: string
  venueAddress: string
  city: string
  state: string
  postalCode: string
  country: string
  maxAttendees: string
  registrationDeadline: string
  isPublic: boolean
  requiresApproval: boolean
  eventImageURL: string
}

const initialFormData: EventFormData = {
  title: '',
  description: '',
  categoryId: null,
  eventDate: '',
  startTime: '',
  endTime: '',
  venueAddress: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'USA',
  maxAttendees: '',
  registrationDeadline: '',
  isPublic: true,
  requiresApproval: false,
  eventImageURL: ''
}

export function CreateEventPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<EventFormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<EventFormData>>({})
  const [isUploading, setIsUploading] = useState(false)

  const handleInputChange = (field: keyof EventFormData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = () => {
    const newErrors: Partial<EventFormData> = {}

    if (!formData.title.trim()) newErrors.title = 'Event title is required'
    if (!formData.description.trim()) newErrors.description = 'Event description is required'
    if (!formData.categoryId) newErrors.categoryId = 'Please select an event category'
    if (!formData.eventDate) newErrors.eventDate = 'Event date is required'
    if (!formData.startTime) newErrors.startTime = 'Start time is required'
    if (!formData.endTime) newErrors.endTime = 'End time is required'
    if (!formData.venueAddress.trim()) newErrors.venueAddress = 'Venue address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.state.trim()) newErrors.state = 'State is required'
    
    // Validate date is in the future
    if (formData.eventDate && new Date(formData.eventDate) < new Date()) {
      newErrors.eventDate = 'Event date must be in the future'
    }
    
    // Validate end time is after start time
    if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
      newErrors.endTime = 'End time must be after start time'
    }

    // Validate registration deadline is before event date
    if (formData.registrationDeadline && formData.eventDate && 
        new Date(formData.registrationDeadline) >= new Date(formData.eventDate)) {
      newErrors.registrationDeadline = 'Registration deadline must be before event date'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSaveDraft = async () => {
    // Basic validation for draft
    if (!formData.title.trim()) {
      setErrors({ title: 'Event title is required even for drafts' })
      return
    }

    // In a real app, this would save to database with status 'Draft'
    console.log('Saving draft:', { ...formData, status: 'Draft' })
    navigate('/planner/my-events')
  }

  const handlePublish = async () => {
    if (!validateForm()) return

    // In a real app, this would save to database with status 'Published'
    console.log('Publishing event:', { ...formData, status: 'Published' })
    navigate('/planner/my-events')
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    
    // Simulate image upload
    setTimeout(() => {
      // In a real app, this would upload to a storage service
      const fakeImageUrl = `https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&t=${Date.now()}`
      setFormData(prev => ({ ...prev, eventImageURL: fakeImageUrl }))
      setIsUploading(false)
    }, 2000)
  }

  const selectedCategory = eventCategories.find(cat => cat.id === formData.categoryId)

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
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
            <h1 className="font-arial-black text-4xl text-brand-green mb-2">
              Create New Event
            </h1>
            <p className="font-rubik text-gray-300">
              Create a new event for your organization
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Basic Information */}
              <Card className="bg-black/80 border-brand-green border">
                <CardHeader>
                  <CardTitle className="font-arial-black text-brand-green">
                    Basic Information
                  </CardTitle>
                  <CardDescription className="text-gray-400 font-rubik">
                    Core details about your event
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="title" className="text-gray-300 font-rubik">Event Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Enter your event title"
                      className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-brand-green"
                    />
                    {errors.title && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.title}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-gray-300 font-rubik">Event Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Describe your event in detail"
                      className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-brand-green min-h-[120px]"
                    />
                    {errors.description && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="text-gray-300 font-rubik">Event Category *</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                      {eventCategories.map(category => (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => handleInputChange('categoryId', category.id)}
                          className={`p-3 text-left rounded-lg border transition-all ${
                            formData.categoryId === category.id
                              ? 'border-brand-green bg-brand-green/10 text-brand-green'
                              : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500'
                          }`}
                        >
                          <p className="font-rubik font-medium text-sm">{category.name}</p>
                        </button>
                      ))}
                    </div>
                    {errors.categoryId && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.categoryId}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Date and Time */}
              <Card className="bg-black/80 border-gray-600 border">
                <CardHeader>
                  <CardTitle className="font-arial-black text-white flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-brand-green" />
                    Date & Time
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="eventDate" className="text-gray-300 font-rubik">Event Date *</Label>
                      <Input
                        id="eventDate"
                        type="date"
                        value={formData.eventDate}
                        onChange={(e) => handleInputChange('eventDate', e.target.value)}
                        className="bg-gray-800 border-gray-600 text-white focus:border-brand-green"
                      />
                      {errors.eventDate && (
                        <p className="text-red-400 text-sm mt-1">{errors.eventDate}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="startTime" className="text-gray-300 font-rubik">Start Time *</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={formData.startTime}
                        onChange={(e) => handleInputChange('startTime', e.target.value)}
                        className="bg-gray-800 border-gray-600 text-white focus:border-brand-green"
                      />
                      {errors.startTime && (
                        <p className="text-red-400 text-sm mt-1">{errors.startTime}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="endTime" className="text-gray-300 font-rubik">End Time *</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={formData.endTime}
                        onChange={(e) => handleInputChange('endTime', e.target.value)}
                        className="bg-gray-800 border-gray-600 text-white focus:border-brand-green"
                      />
                      {errors.endTime && (
                        <p className="text-red-400 text-sm mt-1">{errors.endTime}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="registrationDeadline" className="text-gray-300 font-rubik">Registration Deadline</Label>
                    <Input
                      id="registrationDeadline"
                      type="datetime-local"
                      value={formData.registrationDeadline}
                      onChange={(e) => handleInputChange('registrationDeadline', e.target.value)}
                      className="bg-gray-800 border-gray-600 text-white focus:border-brand-green max-w-md"
                    />
                    {errors.registrationDeadline && (
                      <p className="text-red-400 text-sm mt-1">{errors.registrationDeadline}</p>
                    )}
                    <p className="text-gray-400 text-sm mt-1">When should registration close?</p>
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card className="bg-black/80 border-gray-600 border">
                <CardHeader>
                  <CardTitle className="font-arial-black text-white flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-brand-green" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="venueAddress" className="text-gray-300 font-rubik">Venue Address *</Label>
                    <Input
                      id="venueAddress"
                      value={formData.venueAddress}
                      onChange={(e) => handleInputChange('venueAddress', e.target.value)}
                      placeholder="123 Event Center Dr"
                      className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-brand-green"
                    />
                    {errors.venueAddress && (
                      <p className="text-red-400 text-sm mt-1">{errors.venueAddress}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-gray-300 font-rubik">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="San Francisco"
                        className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-brand-green"
                      />
                      {errors.city && (
                        <p className="text-red-400 text-sm mt-1">{errors.city}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="state" className="text-gray-300 font-rubik">State *</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        placeholder="CA"
                        className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-brand-green"
                      />
                      {errors.state && (
                        <p className="text-red-400 text-sm mt-1">{errors.state}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="postalCode" className="text-gray-300 font-rubik">Postal Code</Label>
                      <Input
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange('postalCode', e.target.value)}
                        placeholder="94105"
                        className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-brand-green"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="country" className="text-gray-300 font-rubik">Country</Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        className="bg-gray-800 border-gray-600 text-white focus:border-brand-green"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Registration Settings */}
              <Card className="bg-black/80 border-gray-600 border">
                <CardHeader>
                  <CardTitle className="font-arial-black text-white flex items-center">
                    <Users className="w-5 h-5 mr-2 text-brand-green" />
                    Registration Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="maxAttendees" className="text-gray-300 font-rubik">Maximum Attendees</Label>
                    <Input
                      id="maxAttendees"
                      type="number"
                      value={formData.maxAttendees}
                      onChange={(e) => handleInputChange('maxAttendees', e.target.value)}
                      placeholder="Leave blank for unlimited"
                      className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-brand-green max-w-xs"
                    />
                    <p className="text-gray-400 text-sm mt-1">Leave blank for unlimited capacity</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="isPublic"
                        checked={formData.isPublic}
                        onChange={(e) => handleInputChange('isPublic', e.target.checked)}
                        className="w-4 h-4 text-brand-green bg-gray-800 border-gray-600 rounded focus:ring-brand-green"
                      />
                      <Label htmlFor="isPublic" className="text-gray-300 font-rubik flex items-center">
                        <Globe className="w-4 h-4 mr-2 text-brand-green" />
                        Public Event
                      </Label>
                    </div>
                    <p className="text-gray-400 text-sm ml-7">Anyone can discover and register for this event</p>

                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="requiresApproval"
                        checked={formData.requiresApproval}
                        onChange={(e) => handleInputChange('requiresApproval', e.target.checked)}
                        className="w-4 h-4 text-brand-green bg-gray-800 border-gray-600 rounded focus:ring-brand-green"
                      />
                      <Label htmlFor="requiresApproval" className="text-gray-300 font-rubik flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-brand-green" />
                        Requires Approval
                      </Label>
                    </div>
                    <p className="text-gray-400 text-sm ml-7">Registrations need manual approval before confirmation</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Preview Sidebar */}
            <div className="lg:col-span-1">
              <Card className="bg-black/80 border-gray-600 border sticky top-24">
                <CardHeader>
                  <CardTitle className="font-arial-black text-white">Event Preview</CardTitle>
                  <CardDescription className="text-gray-400 font-rubik">
                    How your event will appear to attendees
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Event Image */}
                  <div>
                    <Label className="text-gray-300 font-rubik">Event Image</Label>
                    <div className="mt-2">
                      {formData.eventImageURL ? (
                        <div className="relative">
                          <img 
                            src={formData.eventImageURL} 
                            alt="Event preview"
                            className="w-full h-40 object-cover rounded-lg"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70"
                            onClick={() => handleInputChange('eventImageURL', '')}
                          >
                            <X className="w-4 h-4 text-white" />
                          </Button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                          <input
                            type="file"
                            id="eventImage"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                          <Label 
                            htmlFor="eventImage" 
                            className="cursor-pointer flex flex-col items-center"
                          >
                            {isUploading ? (
                              <div className="flex items-center text-brand-green">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-green mr-2"></div>
                                Uploading...
                              </div>
                            ) : (
                              <>
                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                <span className="text-gray-400 text-sm">Click to upload image</span>
                              </>
                            )}
                          </Label>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Preview Content */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-arial-black text-brand-green text-lg">
                        {formData.title || 'Event Title'}
                      </h3>
                      {selectedCategory && (
                        <Badge className="bg-brand-green text-black text-xs mt-1">
                          {selectedCategory.name}
                        </Badge>
                      )}
                    </div>

                    <p className="text-gray-300 text-sm font-rubik line-clamp-3">
                      {formData.description || 'Event description will appear here...'}
                    </p>

                    {formData.eventDate && (
                      <div className="flex items-center text-gray-300 text-sm">
                        <Calendar className="w-4 h-4 text-brand-green mr-2" />
                        <span className="font-rubik">
                          {new Date(formData.eventDate).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    )}

                    {formData.startTime && formData.endTime && (
                      <div className="flex items-center text-gray-300 text-sm">
                        <Clock className="w-4 h-4 text-brand-green mr-2" />
                        <span className="font-rubik">
                          {formData.startTime} - {formData.endTime}
                        </span>
                      </div>
                    )}

                    {formData.venueAddress && (
                      <div className="flex items-center text-gray-300 text-sm">
                        <MapPin className="w-4 h-4 text-brand-green mr-2" />
                        <span className="font-rubik line-clamp-2">
                          {formData.venueAddress}
                          {formData.city && `, ${formData.city}`}
                          {formData.state && `, ${formData.state}`}
                        </span>
                      </div>
                    )}

                    {formData.maxAttendees && (
                      <div className="flex items-center text-gray-300 text-sm">
                        <Users className="w-4 h-4 text-brand-green mr-2" />
                        <span className="font-rubik">
                          Max {formData.maxAttendees} attendees
                        </span>
                      </div>
                    )}

                    <div className="pt-3 border-t border-gray-700">
                      <div className="flex items-center space-x-2">
                        {formData.isPublic ? (
                          <div className="flex items-center text-green-500 text-xs">
                            <Globe className="w-3 h-3 mr-1" />
                            Public
                          </div>
                        ) : (
                          <div className="flex items-center text-yellow-500 text-xs">
                            <Lock className="w-3 h-3 mr-1" />
                            Private
                          </div>
                        )}
                        {formData.requiresApproval && (
                          <div className="flex items-center text-orange-500 text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Approval Required
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-8 pt-8 border-t border-gray-700">
            <Link to="/planner/my-events">
              <Button variant="ghost" className="text-gray-400 hover:text-white">
                Cancel
              </Button>
            </Link>
            
            <div className="flex space-x-3">
              <Button
                onClick={handleSaveDraft}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Save as Draft
              </Button>
              <Button
                onClick={handlePublish}
                className="bg-brand-green text-black hover:bg-green-400"
              >
                <Eye className="w-4 h-4 mr-2" />
                Publish Event
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}