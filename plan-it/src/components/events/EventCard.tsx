import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Users, Clock } from 'lucide-react'

interface EventCardProps {
  event: {
    id: number
    title: string
    description: string
    eventDate: string
    startTime: string
    endTime: string
    venueAddress?: string
    city?: string
    state?: string
    categoryName: string
    currentAttendeeCount: number
    maxAttendees?: number
    eventImageURL?: string
    organizationName: string
  }
  linkTo?: string
}

export function EventCard({ event, linkTo }: EventCardProps) {
  const cardContent = (
    <Card className="bg-black/80 border-brand-green border hover:border-brand-green/80 transition-all duration-300 hover:shadow-lg hover:shadow-brand-green/20 cursor-pointer group">
      {/* Event Image */}
      {event.eventImageURL && (
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <img 
            src={event.eventImageURL} 
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <Badge 
            variant="secondary" 
            className="absolute top-3 right-3 bg-brand-green text-black font-medium"
          >
            {event.categoryName}
          </Badge>
        </div>
      )}
      
      <CardHeader className="pb-3">
        {linkTo ? (
          <CardTitle className="text-xl font-arial-black text-brand-green hover:text-white transition-colors line-clamp-2 cursor-pointer">
            {event.title}
          </CardTitle>
        ) : (
          <Link 
            to={`/event/${event.id}`}
            className="block hover:no-underline"
          >
            <CardTitle className="text-xl font-arial-black text-brand-green hover:text-white transition-colors line-clamp-2 cursor-pointer">
              {event.title}
            </CardTitle>
          </Link>
        )}
        <p className="text-gray-300 text-sm font-rubik">{event.organizationName}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Description */}
        <p className="text-gray-400 text-sm line-clamp-2 font-rubik">
          {event.description}
        </p>
        
        {/* Event Details */}
        <div className="space-y-2">
          {/* Date and Time */}
          <div className="flex items-center text-gray-300 text-sm">
            <Calendar className="w-4 h-4 text-brand-green mr-2 flex-shrink-0" />
            <span className="font-rubik">
              {new Date(event.eventDate).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
          
          {/* Time */}
          <div className="flex items-center text-gray-300 text-sm">
            <Clock className="w-4 h-4 text-brand-green mr-2 flex-shrink-0" />
            <span className="font-rubik">
              {event.startTime} - {event.endTime}
            </span>
          </div>
          
          {/* Location */}
          {event.venueAddress && (
            <div className="flex items-center text-gray-300 text-sm">
              <MapPin className="w-4 h-4 text-brand-green mr-2 flex-shrink-0" />
              <span className="font-rubik line-clamp-1">
                {event.venueAddress}, {event.city}, {event.state}
              </span>
            </div>
          )}
          
          {/* Attendees */}
          <div className="flex items-center text-gray-300 text-sm">
            <Users className="w-4 h-4 text-brand-green mr-2 flex-shrink-0" />
            <span className="font-rubik">
              {event.currentAttendeeCount} 
              {event.maxAttendees && ` / ${event.maxAttendees}`} attendees
            </span>
          </div>
        </div>
        
        {/* Status Indicator */}
        <div className="pt-2 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-brand-green text-sm font-medium font-rubik cursor-pointer hover:bg-gray-900 hover:border-gray-800 hover:text-white px-3 py-1 rounded transition-colors">
              View
            </span>
            {event.maxAttendees && event.currentAttendeeCount >= event.maxAttendees ? (
              <Badge variant="destructive" className="text-xs">
                Full
              </Badge>
            ) : (
              <Badge className="bg-brand-green/20 text-brand-green border-brand-green text-xs">
                Available
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  if (linkTo) {
    return (
      <Link to={linkTo} className="block">
        {cardContent}
      </Link>
    )
  }

  return cardContent
}