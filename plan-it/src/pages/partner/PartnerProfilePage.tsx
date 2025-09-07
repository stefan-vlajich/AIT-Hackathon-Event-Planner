import { useState } from 'react'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { 
  Building2, Mail, Phone, Globe, MapPin, Star, Edit2, Save, X, 
  Camera, Award, Clock, DollarSign, CheckCircle, Users
} from 'lucide-react'

export function PartnerProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    organizationName: 'Elite Event Photography',
    companyDescription: 'Professional event photography services specializing in corporate events, weddings, and social gatherings. With over 10 years of experience, we capture every moment with artistic precision.',
    contactEmail: 'contact@eliteeventphoto.com',
    contactPhone: '+1 (555) 987-6543',
    website: 'https://eliteeventphoto.com',
    address: '456 Creative Street',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94105',
    serviceRadius: 50,
    profileImageURL: null,
    logoURL: null,
    priceRange: 'Premium',
    isVerified: true,
    reviewRating: 4.8,
    totalReviews: 127,
    totalEvents: 234,
    responseTime: '2 hours',
    completionRate: 98
  })

  const [services, setServices] = useState([
    { id: 1, name: 'Event Photography', description: 'Professional photography for all types of events', isActive: true },
    { id: 2, name: 'Wedding Photography', description: 'Specialized wedding day photography packages', isActive: true },
    { id: 3, name: 'Corporate Events', description: 'Business event and conference photography', isActive: true },
    { id: 4, name: 'Photo Editing', description: 'Post-event photo editing and enhancement', isActive: true }
  ])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // TODO: Implement API call to update profile
    console.log('Saving profile:', profileData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    // TODO: Reset form data to original values
    setIsEditing(false)
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('')
  }

  const priceRangeConfig = {
    'Budget-friendly': { symbol: '$', color: 'bg-green-600' },
    'Moderate': { symbol: '$$', color: 'bg-blue-600' },
    'Premium': { symbol: '$$$', color: 'bg-purple-600' },
    'Luxury': { symbol: '$$$$', color: 'bg-yellow-600' }
  }

  const currentPriceRange = priceRangeConfig[profileData.priceRange as keyof typeof priceRangeConfig]

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
                  Partner Profile
                </h1>
                <p className="font-rubik text-gray-300">
                  Manage your business profile and service offerings
                </p>
              </div>
              {profileData.isVerified && (
                <Badge className="bg-brand-green text-black font-medium">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Verified Partner
                </Badge>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Profile Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* Company Information */}
              <Card className="bg-black/80 border-brand-green border">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-arial-black text-brand-green">
                      Company Information
                    </CardTitle>
                    <CardDescription className="font-rubik text-gray-400">
                      Your business details and contact information
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    {!isEditing ? (
                      <Button
                        onClick={() => setIsEditing(true)}
                        variant="outline"
                        size="sm"
                        className="border-brand-green text-brand-green hover:bg-brand-green hover:text-black"
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    ) : (
                      <>
                        <Button
                          onClick={handleSave}
                          size="sm"
                          className="bg-brand-green hover:bg-green-400 text-black"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button
                          onClick={handleCancel}
                          variant="outline"
                          size="sm"
                          className="bg-gray-900 border-gray-800 text-white hover:bg-gray-800 hover:text-brand-green"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Logo and Company Name */}
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={profileData.logoURL || ''} alt="Company Logo" />
                      <AvatarFallback className="bg-brand-green text-black font-bold text-xl">
                        {getInitials(profileData.organizationName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      {isEditing ? (
                        <Input
                          name="organizationName"
                          value={profileData.organizationName}
                          onChange={handleInputChange}
                          className="bg-transparent border-gray-600 text-white focus:border-brand-green text-xl font-bold"
                        />
                      ) : (
                        <h3 className="font-arial-black text-2xl text-white">
                          {profileData.organizationName}
                        </h3>
                      )}
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={`${currentPriceRange.color} text-white`}>
                          {currentPriceRange.symbol}
                        </Badge>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="font-rubik text-gray-300 text-sm">
                            {profileData.reviewRating} ({profileData.totalReviews} reviews)
                          </span>
                        </div>
                      </div>
                      {!isEditing && (
                        <Button variant="link" className="text-brand-green p-0 h-auto font-normal">
                          <Camera className="w-4 h-4 mr-1" />
                          Update logo
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Company Description */}
                  <div>
                    <Label className="text-brand-green font-rubik">Company Description</Label>
                    {isEditing ? (
                      <Textarea
                        name="companyDescription"
                        value={profileData.companyDescription}
                        onChange={handleInputChange}
                        className="bg-transparent border-gray-600 text-white focus:border-brand-green mt-1"
                        rows={4}
                      />
                    ) : (
                      <p className="text-gray-300 font-rubik mt-1 leading-relaxed">
                        {profileData.companyDescription}
                      </p>
                    )}
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-brand-green font-rubik">Contact Email</Label>
                      {isEditing ? (
                        <Input
                          name="contactEmail"
                          type="email"
                          value={profileData.contactEmail}
                          onChange={handleInputChange}
                          className="bg-transparent border-gray-600 text-white focus:border-brand-green"
                        />
                      ) : (
                        <div className="flex items-center text-white font-rubik mt-1">
                          <Mail className="w-4 h-4 text-brand-green mr-2" />
                          {profileData.contactEmail}
                        </div>
                      )}
                    </div>

                    <div>
                      <Label className="text-brand-green font-rubik">Phone Number</Label>
                      {isEditing ? (
                        <Input
                          name="contactPhone"
                          value={profileData.contactPhone}
                          onChange={handleInputChange}
                          className="bg-transparent border-gray-600 text-white focus:border-brand-green"
                        />
                      ) : (
                        <div className="flex items-center text-white font-rubik mt-1">
                          <Phone className="w-4 h-4 text-brand-green mr-2" />
                          {profileData.contactPhone}
                        </div>
                      )}
                    </div>

                    <div>
                      <Label className="text-brand-green font-rubik">Website</Label>
                      {isEditing ? (
                        <Input
                          name="website"
                          value={profileData.website}
                          onChange={handleInputChange}
                          className="bg-transparent border-gray-600 text-white focus:border-brand-green"
                        />
                      ) : (
                        <div className="flex items-center text-white font-rubik mt-1">
                          <Globe className="w-4 h-4 text-brand-green mr-2" />
                          <a 
                            href={profileData.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-brand-green hover:text-white"
                          >
                            {profileData.website}
                          </a>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label className="text-brand-green font-rubik">Service Radius</Label>
                      {isEditing ? (
                        <Input
                          name="serviceRadius"
                          type="number"
                          value={profileData.serviceRadius}
                          onChange={handleInputChange}
                          className="bg-transparent border-gray-600 text-white focus:border-brand-green"
                        />
                      ) : (
                        <div className="flex items-center text-white font-rubik mt-1">
                          <MapPin className="w-4 h-4 text-brand-green mr-2" />
                          {profileData.serviceRadius} miles
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-brand-green font-rubik">Address</Label>
                      {isEditing ? (
                        <Input
                          name="address"
                          value={profileData.address}
                          onChange={handleInputChange}
                          className="bg-transparent border-gray-600 text-white focus:border-brand-green"
                        />
                      ) : (
                        <p className="text-white font-rubik mt-1">{profileData.address}</p>
                      )}
                    </div>

                    <div>
                      <Label className="text-brand-green font-rubik">City</Label>
                      {isEditing ? (
                        <Input
                          name="city"
                          value={profileData.city}
                          onChange={handleInputChange}
                          className="bg-transparent border-gray-600 text-white focus:border-brand-green"
                        />
                      ) : (
                        <p className="text-white font-rubik mt-1">{profileData.city}</p>
                      )}
                    </div>

                    <div>
                      <Label className="text-brand-green font-rubik">State & ZIP</Label>
                      {isEditing ? (
                        <div className="flex space-x-2">
                          <Input
                            name="state"
                            value={profileData.state}
                            onChange={handleInputChange}
                            className="bg-transparent border-gray-600 text-white focus:border-brand-green"
                            placeholder="CA"
                          />
                          <Input
                            name="postalCode"
                            value={profileData.postalCode}
                            onChange={handleInputChange}
                            className="bg-transparent border-gray-600 text-white focus:border-brand-green"
                            placeholder="12345"
                          />
                        </div>
                      ) : (
                        <p className="text-white font-rubik mt-1">
                          {profileData.state} {profileData.postalCode}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Services Offered */}
              <Card className="bg-black/80 border-gray-600 border">
                <CardHeader>
                  <CardTitle className="text-2xl font-arial-black text-brand-green">
                    Services Offered
                  </CardTitle>
                  <CardDescription className="font-rubik text-gray-400">
                    Manage the services you provide to event planners
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {services.map(service => (
                    <div key={service.id} className="flex items-start justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <div className="flex-1">
                        <h4 className="font-rubik font-medium text-white mb-1">{service.name}</h4>
                        <p className="font-rubik text-gray-400 text-sm">{service.description}</p>
                      </div>
                      <Badge 
                        variant={service.isActive ? "default" : "secondary"}
                        className={service.isActive ? "bg-brand-green text-black" : "bg-gray-600 text-gray-300"}
                      >
                        {service.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    className="w-full border-brand-green text-brand-green hover:bg-brand-green hover:text-black"
                  >
                    Add New Service
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-6">
              {/* Performance Stats */}
              <Card className="bg-black/80 border-brand-green border">
                <CardHeader>
                  <CardTitle className="text-xl font-arial-black text-brand-green">
                    Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Award className="w-5 h-5 text-brand-green mr-2" />
                      <span className="font-rubik text-gray-300">Rating</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-white">{profileData.reviewRating}/5.0</p>
                      <p className="text-xs text-gray-400">{profileData.totalReviews} reviews</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-brand-green mr-2" />
                      <span className="font-rubik text-gray-300">Completion Rate</span>
                    </div>
                    <p className="font-bold text-white">{profileData.completionRate}%</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-brand-green mr-2" />
                      <span className="font-rubik text-gray-300">Response Time</span>
                    </div>
                    <p className="font-bold text-white">{profileData.responseTime}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-brand-green mr-2" />
                      <span className="font-rubik text-gray-300">Total Events</span>
                    </div>
                    <p className="font-bold text-white">{profileData.totalEvents}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-black/80 border-gray-600 border">
                <CardHeader>
                  <CardTitle className="text-xl font-arial-black text-brand-green">
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full bg-gray-900 border-gray-800 text-white hover:bg-gray-800 hover:text-brand-green"
                  >
                    View Dashboard
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full bg-gray-900 border-gray-800 text-white hover:bg-gray-800 hover:text-brand-green"
                  >
                    Browse Events
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full bg-gray-900 border-gray-800 text-white hover:bg-gray-800 hover:text-brand-green"
                  >
                    Upload Portfolio
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full bg-gray-900 border-gray-800 text-white hover:bg-gray-800 hover:text-brand-green"
                  >
                    View Analytics
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