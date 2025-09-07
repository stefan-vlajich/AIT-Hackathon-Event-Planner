import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Camera,
  Edit,
  Save,
  X,
  Users,
  Calendar,
  Star
} from 'lucide-react'

// Mock data for planner organization
const mockPlannerOrg = {
  organizationId: 1,
  name: 'Elite Event Planning Co.',
  description: 'Premier event planning services for corporate and social events. We specialize in creating memorable experiences that exceed expectations.',
  email: 'contact@eliteeventplanning.com',
  phoneNumber: '+1 (555) 123-4567',
  address: '456 Event Avenue, Suite 200',
  city: 'San Francisco',
  state: 'CA',
  postalCode: '94105',
  country: 'USA',
  website: 'https://eliteeventplanning.com',
  logoURL: 'https://images.unsplash.com/photo-1558618047-fd8b0e2c67fb?w=400',
  isVerified: true,
  totalEvents: 247,
  activeEvents: 12,
  averageRating: 4.8,
  createdAt: '2020-03-15'
}

const mockPlannerUser = {
  userId: 1,
  firstName: 'Sarah',
  lastName: 'Johnson',
  email: 'sarah.johnson@eliteeventplanning.com',
  phoneNumber: '+1 (555) 987-6543',
  profileImageURL: 'https://images.unsplash.com/photo-1494790108755-2616b7ad2080?w=400',
  role: 'Senior Event Planner',
  joinedAt: '2020-03-15'
}

export function PlannerProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [orgData, setOrgData] = useState(mockPlannerOrg)
  const [userData, setUserData] = useState(mockPlannerUser)

  const handleSave = () => {
    // In a real app, this would save to the database
    setIsEditing(false)
    // TODO: Implement API call to update organization and user data
  }

  const handleCancel = () => {
    setIsEditing(false)
    setOrgData(mockPlannerOrg)
    setUserData(mockPlannerUser)
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      
      <main className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="font-arial-black text-4xl text-brand-green mb-2">
                Organization Profile
              </h1>
              <p className="font-rubik text-gray-300">
                Manage your event planning organization details
              </p>
            </div>
            
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-brand-green text-black hover:bg-green-400 font-medium"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button
                  onClick={handleSave}
                  className="bg-brand-green text-black hover:bg-green-400"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>

          {/* Organization Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-black/80 border-brand-green border">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Calendar className="w-8 h-8 text-brand-green mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-white">{orgData.totalEvents}</p>
                    <p className="text-sm text-gray-400 font-rubik">Total Events</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/80 border-gray-600 border">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-blue-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-white">{orgData.activeEvents}</p>
                    <p className="text-sm text-gray-400 font-rubik">Active Events</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/80 border-gray-600 border">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Star className="w-8 h-8 text-yellow-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-white">{orgData.averageRating}</p>
                    <p className="text-sm text-gray-400 font-rubik">Average Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/80 border-gray-600 border">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Building2 className="w-8 h-8 text-purple-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {new Date(orgData.createdAt).getFullYear()}
                    </p>
                    <p className="text-sm text-gray-400 font-rubik">Est. Since</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Personal Profile */}
            <div className="lg:col-span-1">
              <Card className="bg-black/80 border-brand-green border">
                <CardHeader>
                  <CardTitle className="font-arial-black text-brand-green">
                    Personal Profile
                  </CardTitle>
                  <CardDescription className="text-gray-400 font-rubik">
                    Your individual account details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Image */}
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={userData.profileImageURL} />
                        <AvatarFallback className="bg-brand-green text-black font-bold text-xl">
                          {userData.firstName[0]}{userData.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <Button
                          size="sm"
                          className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-brand-green text-black"
                        >
                          <Camera className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="text-center">
                      <p className="font-arial-black text-lg text-white">
                        {userData.firstName} {userData.lastName}
                      </p>
                      <p className="text-brand-green text-sm font-rubik font-medium">
                        {userData.role}
                      </p>
                      <p className="text-gray-400 text-xs font-rubik">
                        Member since {new Date(userData.joinedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Personal Contact Info */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="firstName" className="text-gray-300 font-rubik">First Name</Label>
                      {isEditing ? (
                        <Input
                          id="firstName"
                          value={userData.firstName}
                          onChange={(e) => setUserData({...userData, firstName: e.target.value})}
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      ) : (
                        <p className="text-white mt-1">{userData.firstName}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="lastName" className="text-gray-300 font-rubik">Last Name</Label>
                      {isEditing ? (
                        <Input
                          id="lastName"
                          value={userData.lastName}
                          onChange={(e) => setUserData({...userData, lastName: e.target.value})}
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      ) : (
                        <p className="text-white mt-1">{userData.lastName}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="userEmail" className="text-gray-300 font-rubik">Personal Email</Label>
                      {isEditing ? (
                        <Input
                          id="userEmail"
                          value={userData.email}
                          onChange={(e) => setUserData({...userData, email: e.target.value})}
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      ) : (
                        <p className="text-white mt-1">{userData.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="userPhone" className="text-gray-300 font-rubik">Personal Phone</Label>
                      {isEditing ? (
                        <Input
                          id="userPhone"
                          value={userData.phoneNumber}
                          onChange={(e) => setUserData({...userData, phoneNumber: e.target.value})}
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      ) : (
                        <p className="text-white mt-1">{userData.phoneNumber}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Organization Details */}
            <div className="lg:col-span-2">
              <Card className="bg-black/80 border-brand-green border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="font-arial-black text-brand-green flex items-center">
                        <Building2 className="w-5 h-5 mr-2" />
                        Organization Details
                      </CardTitle>
                      <CardDescription className="text-gray-400 font-rubik">
                        Your event planning company information
                      </CardDescription>
                    </div>
                    {orgData.isVerified && (
                      <Badge className="bg-green-600 text-white border-0">
                        Verified
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Organization Logo */}
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar className="w-16 h-16 rounded-lg">
                        <AvatarImage src={orgData.logoURL} className="rounded-lg" />
                        <AvatarFallback className="bg-brand-green text-black font-bold rounded-lg">
                          {orgData.name.split(' ').map(word => word[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <Button
                          size="sm"
                          className="absolute -bottom-1 -right-1 rounded-full w-6 h-6 p-0 bg-brand-green text-black"
                        >
                          <Camera className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                    <div>
                      <p className="font-arial-black text-white text-lg">{orgData.name}</p>
                      <p className="text-gray-400 text-sm font-rubik">Organization Logo</p>
                    </div>
                  </div>

                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="orgName" className="text-gray-300 font-rubik">Organization Name</Label>
                      {isEditing ? (
                        <Input
                          id="orgName"
                          value={orgData.name}
                          onChange={(e) => setOrgData({...orgData, name: e.target.value})}
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      ) : (
                        <p className="text-white mt-1">{orgData.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="website" className="text-gray-300 font-rubik">Website</Label>
                      {isEditing ? (
                        <Input
                          id="website"
                          value={orgData.website}
                          onChange={(e) => setOrgData({...orgData, website: e.target.value})}
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      ) : (
                        <a href={orgData.website} target="_blank" rel="noopener noreferrer" 
                           className="text-brand-green hover:text-green-400 mt-1 block">
                          {orgData.website}
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor="description" className="text-gray-300 font-rubik">Description</Label>
                    {isEditing ? (
                      <Textarea
                        id="description"
                        value={orgData.description}
                        onChange={(e) => setOrgData({...orgData, description: e.target.value})}
                        className="bg-gray-800 border-gray-600 text-white min-h-[100px]"
                        placeholder="Describe your event planning services..."
                      />
                    ) : (
                      <p className="text-white mt-1 leading-relaxed">{orgData.description}</p>
                    )}
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="text-gray-300 font-rubik flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        Business Email
                      </Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          value={orgData.email}
                          onChange={(e) => setOrgData({...orgData, email: e.target.value})}
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      ) : (
                        <p className="text-white mt-1">{orgData.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="phone" className="text-gray-300 font-rubik flex items-center">
                        <Phone className="w-4 h-4 mr-1" />
                        Business Phone
                      </Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={orgData.phoneNumber}
                          onChange={(e) => setOrgData({...orgData, phoneNumber: e.target.value})}
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      ) : (
                        <p className="text-white mt-1">{orgData.phoneNumber}</p>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <Label className="text-gray-300 font-rubik flex items-center mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      Business Address
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="address" className="text-gray-400 text-sm">Street Address</Label>
                        {isEditing ? (
                          <Input
                            id="address"
                            value={orgData.address}
                            onChange={(e) => setOrgData({...orgData, address: e.target.value})}
                            className="bg-gray-800 border-gray-600 text-white"
                          />
                        ) : (
                          <p className="text-white mt-1">{orgData.address}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="city" className="text-gray-400 text-sm">City</Label>
                        {isEditing ? (
                          <Input
                            id="city"
                            value={orgData.city}
                            onChange={(e) => setOrgData({...orgData, city: e.target.value})}
                            className="bg-gray-800 border-gray-600 text-white"
                          />
                        ) : (
                          <p className="text-white mt-1">{orgData.city}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="state" className="text-gray-400 text-sm">State</Label>
                        {isEditing ? (
                          <Input
                            id="state"
                            value={orgData.state}
                            onChange={(e) => setOrgData({...orgData, state: e.target.value})}
                            className="bg-gray-800 border-gray-600 text-white"
                          />
                        ) : (
                          <p className="text-white mt-1">{orgData.state}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="postalCode" className="text-gray-400 text-sm">Postal Code</Label>
                        {isEditing ? (
                          <Input
                            id="postalCode"
                            value={orgData.postalCode}
                            onChange={(e) => setOrgData({...orgData, postalCode: e.target.value})}
                            className="bg-gray-800 border-gray-600 text-white"
                          />
                        ) : (
                          <p className="text-white mt-1">{orgData.postalCode}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="country" className="text-gray-400 text-sm">Country</Label>
                        {isEditing ? (
                          <Input
                            id="country"
                            value={orgData.country}
                            onChange={(e) => setOrgData({...orgData, country: e.target.value})}
                            className="bg-gray-800 border-gray-600 text-white"
                          />
                        ) : (
                          <p className="text-white mt-1">{orgData.country}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  {!isEditing && (
                    <div className="pt-4 border-t border-gray-700">
                      <h3 className="font-arial-black text-white mb-4">Quick Actions</h3>
                      <div className="flex flex-wrap gap-3">
                        <Link to="/planner/create-event">
                          <Button className="bg-brand-green text-black hover:bg-green-400">
                            Create New Event
                          </Button>
                        </Link>
                        <Link to="/planner/my-events">
                          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                            View My Events
                          </Button>
                        </Link>
                        <Link to="/planner/dashboard">
                          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                            Dashboard
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
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