import { useState } from 'react'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { User, Mail, Phone, Calendar, MapPin, Edit2, Save, X } from 'lucide-react'

export function AttendeeProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '+1 (555) 123-4567',
    dateOfBirth: '1990-06-15',
    city: 'New York',
    state: 'NY',
    profileImageURL: null,
    totalEventsAttended: 12,
    upcomingEvents: 3
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const initials = `${profileData.firstName[0]}${profileData.lastName[0]}`

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-arial-black text-4xl text-brand-green mb-2">
              My Profile
            </h1>
            <p className="font-rubik text-gray-300">
              Manage your personal information and event preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-2">
              <Card className="bg-black/80 border-brand-green border">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-arial-black text-brand-green">
                      Personal Information
                    </CardTitle>
                    <CardDescription className="font-rubik text-gray-400">
                      Your account details and contact information
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
                          className="border-gray-600 text-gray-400 hover:bg-gray-700"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={profileData.profileImageURL || ''} alt="Profile" />
                      <AvatarFallback className="bg-brand-green text-black font-bold text-xl">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-rubik font-medium text-white text-lg">
                        {profileData.firstName} {profileData.lastName}
                      </h3>
                      <p className="font-rubik text-gray-400 text-sm">Event Attendee</p>
                      {!isEditing && (
                        <Button variant="link" className="text-brand-green p-0 h-auto font-normal">
                          Change photo
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-brand-green font-rubik">
                        First Name
                      </Label>
                      {isEditing ? (
                        <Input
                          id="firstName"
                          name="firstName"
                          value={profileData.firstName}
                          onChange={handleInputChange}
                          className="bg-transparent border-gray-600 text-white focus:border-brand-green"
                        />
                      ) : (
                        <p className="text-white font-rubik mt-1">{profileData.firstName}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="lastName" className="text-brand-green font-rubik">
                        Last Name
                      </Label>
                      {isEditing ? (
                        <Input
                          id="lastName"
                          name="lastName"
                          value={profileData.lastName}
                          onChange={handleInputChange}
                          className="bg-transparent border-gray-600 text-white focus:border-brand-green"
                        />
                      ) : (
                        <p className="text-white font-rubik mt-1">{profileData.lastName}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-brand-green font-rubik">
                        Email
                      </Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profileData.email}
                          onChange={handleInputChange}
                          className="bg-transparent border-gray-600 text-white focus:border-brand-green"
                        />
                      ) : (
                        <p className="text-white font-rubik mt-1">{profileData.email}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phoneNumber" className="text-brand-green font-rubik">
                        Phone Number
                      </Label>
                      {isEditing ? (
                        <Input
                          id="phoneNumber"
                          name="phoneNumber"
                          value={profileData.phoneNumber}
                          onChange={handleInputChange}
                          className="bg-transparent border-gray-600 text-white focus:border-brand-green"
                        />
                      ) : (
                        <p className="text-white font-rubik mt-1">{profileData.phoneNumber}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="dateOfBirth" className="text-brand-green font-rubik">
                        Date of Birth
                      </Label>
                      {isEditing ? (
                        <Input
                          id="dateOfBirth"
                          name="dateOfBirth"
                          type="date"
                          value={profileData.dateOfBirth}
                          onChange={handleInputChange}
                          className="bg-transparent border-gray-600 text-white focus:border-brand-green"
                        />
                      ) : (
                        <p className="text-white font-rubik mt-1">
                          {new Date(profileData.dateOfBirth).toLocaleDateString()}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label className="text-brand-green font-rubik">
                        Location
                      </Label>
                      <p className="text-white font-rubik mt-1">
                        {profileData.city}, {profileData.state}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats Sidebar */}
            <div className="space-y-6">
              {/* Event Stats */}
              <Card className="bg-black/80 border-brand-green border">
                <CardHeader>
                  <CardTitle className="text-xl font-arial-black text-brand-green">
                    Event Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-brand-green mr-2" />
                      <span className="font-rubik text-gray-300">Events Attended</span>
                    </div>
                    <Badge className="bg-brand-green text-black font-bold">
                      {profileData.totalEventsAttended}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-brand-green mr-2" />
                      <span className="font-rubik text-gray-300">Upcoming</span>
                    </div>
                    <Badge variant="outline" className="border-brand-green text-brand-green">
                      {profileData.upcomingEvents}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-black/80 border-brand-green border">
                <CardHeader>
                  <CardTitle className="text-xl font-arial-black text-brand-green">
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full border-brand-green text-brand-green hover:bg-brand-green hover:text-black"
                  >
                    Browse Events
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    View My Events
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Event History
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