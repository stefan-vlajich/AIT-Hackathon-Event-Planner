import { Navigation } from '@/components/layout/Navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'

export function PlannerPage() {
  const [eventType, setEventType] = useState('')

  const planningSteps = [
    {
      step: 1,
      title: "Event Details",
      description: "Define your event type, date, and basic information",
      status: "current"
    },
    {
      step: 2,
      title: "Venue & Location",
      description: "Choose the perfect venue for your event",
      status: "upcoming"
    },
    {
      step: 3,
      title: "Guest Management",
      description: "Send invitations and manage attendees",
      status: "upcoming"
    },
    {
      step: 4,
      title: "Vendors & Services",
      description: "Book catering, entertainment, and other services",
      status: "upcoming"
    },
    {
      step: 5,
      title: "Final Review",
      description: "Review all details and publish your event",
      status: "upcoming"
    }
  ]

  const eventTypes = [
    { name: "Conference", icon: "🏢" },
    { name: "Wedding", icon: "💒" },
    { name: "Birthday Party", icon: "🎂" },
    { name: "Corporate Event", icon: "👔" },
    { name: "Festival", icon: "🎪" },
    { name: "Workshop", icon: "🔧" }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Page Header */}
      <div className="pt-20 pb-12 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-arial-black text-4xl md:text-6xl text-white mb-4">
              PLANNER
            </h1>
            <p className="font-rubik font-light text-xl text-white/90 max-w-2xl mx-auto">
              Create unforgettable events with our step-by-step planning tool
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Planning Steps Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="font-rubik">Planning Progress</CardTitle>
                <CardDescription className="font-rubik font-light">
                  Follow these steps to create your perfect event
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {planningSteps.map((item) => (
                  <div key={item.step} className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      item.status === 'current' 
                        ? 'bg-brand-green text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-rubik font-medium ${
                        item.status === 'current' ? 'text-brand-green' : 'text-gray-600'
                      }`}>
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-500 font-rubik font-light">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Planning Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-rubik text-2xl">Step 1: Event Details</CardTitle>
                <CardDescription className="font-rubik font-light">
                  Let's start with the basics of your event
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Event Type Selection */}
                <div>
                  <Label className="font-rubik text-base font-medium">What type of event are you planning?</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
                    {eventTypes.map((type) => (
                      <button
                        key={type.name}
                        onClick={() => setEventType(type.name)}
                        className={`p-4 border-2 rounded-lg text-center transition-all hover:shadow-md ${
                          eventType === type.name 
                            ? 'border-brand-green bg-brand-green/10' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-3xl mb-2">{type.icon}</div>
                        <div className="font-rubik text-sm font-medium">{type.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Event Name */}
                <div className="space-y-2">
                  <Label htmlFor="eventName" className="font-rubik text-base font-medium">
                    Event Name
                  </Label>
                  <Input 
                    id="eventName" 
                    placeholder="Enter your event name..."
                    className="font-rubik"
                  />
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="eventDate" className="font-rubik text-base font-medium">
                      Event Date
                    </Label>
                    <Input 
                      id="eventDate" 
                      type="date"
                      className="font-rubik"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eventTime" className="font-rubik text-base font-medium">
                      Start Time
                    </Label>
                    <Input 
                      id="eventTime" 
                      type="time"
                      className="font-rubik"
                    />
                  </div>
                </div>

                {/* Expected Guests */}
                <div className="space-y-2">
                  <Label htmlFor="guestCount" className="font-rubik text-base font-medium">
                    Expected Number of Guests
                  </Label>
                  <Input 
                    id="guestCount" 
                    type="number"
                    placeholder="e.g. 50"
                    className="font-rubik"
                  />
                </div>

                {/* Budget Range */}
                <div className="space-y-2">
                  <Label className="font-rubik text-base font-medium">Budget Range</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {['$0-1K', '$1K-5K', '$5K-10K', '$10K+'].map((range) => (
                      <Button key={range} variant="outline" className="font-rubik">
                        {range}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between pt-6">
                  <Button variant="outline" className="font-rubik">
                    Save Draft
                  </Button>
                  <Button className="bg-brand-green hover:bg-green-500 font-rubik">
                    Continue to Venue Selection
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
