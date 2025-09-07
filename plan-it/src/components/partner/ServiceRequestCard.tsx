import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, DollarSign, Clock, User, Building2 } from 'lucide-react'

interface ServiceRequestCardProps {
  request: {
    id: number
    eventId: number
    eventTitle: string
    eventDate: string
    eventLocation: string
    serviceType: string
    serviceDescription: string
    estimatedBudget?: number
    status: 'Requested' | 'Approved' | 'Declined' | 'Confirmed'
    requestedAt: string
    responseDeadline?: string
    plannerName: string
    plannerOrganization: string
    eventAttendees: number
  }
  onRespond?: (requestId: number, response: 'approve' | 'decline') => void
}

const statusConfig = {
  Requested: { color: 'bg-yellow-600', text: 'Pending Response' },
  Approved: { color: 'bg-blue-600', text: 'Approved' },
  Declined: { color: 'bg-red-600', text: 'Declined' },
  Confirmed: { color: 'bg-brand-green', text: 'Confirmed' }
}

export function ServiceRequestCard({ request, onRespond }: ServiceRequestCardProps) {
  const status = statusConfig[request.status]
  const daysUntilDeadline = request.responseDeadline 
    ? Math.ceil((new Date(request.responseDeadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null

  return (
    <Card className="bg-black/80 border-brand-green border hover:border-brand-green/80 transition-all duration-300 hover:shadow-lg hover:shadow-brand-green/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl font-arial-black text-brand-green mb-2">
              {request.eventTitle}
            </CardTitle>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center">
                <Building2 className="w-4 h-4 mr-1" />
                <span className="font-rubik">{request.plannerOrganization}</span>
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                <span className="font-rubik">{request.plannerName}</span>
              </div>
            </div>
          </div>
          <Badge className={`${status.color} text-white border-0`}>
            {status.text}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Service Details */}
        <div className="space-y-3">
          <div>
            <h4 className="font-rubik font-medium text-brand-green text-sm mb-1">Service Requested</h4>
            <p className="font-rubik text-white font-medium">{request.serviceType}</p>
            {request.serviceDescription && (
              <p className="font-rubik text-gray-300 text-sm mt-1 line-clamp-2">
                {request.serviceDescription}
              </p>
            )}
          </div>

          {/* Event Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-gray-700">
            <div className="flex items-center text-gray-300 text-sm">
              <Calendar className="w-4 h-4 text-brand-green mr-2 flex-shrink-0" />
              <div className="font-rubik">
                <p className="font-medium">
                  {new Date(request.eventDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center text-gray-300 text-sm">
              <MapPin className="w-4 h-4 text-brand-green mr-2 flex-shrink-0" />
              <span className="font-rubik line-clamp-1">{request.eventLocation}</span>
            </div>

            {request.estimatedBudget && (
              <div className="flex items-center text-gray-300 text-sm">
                <DollarSign className="w-4 h-4 text-brand-green mr-2 flex-shrink-0" />
                <span className="font-rubik">${request.estimatedBudget.toLocaleString()}</span>
              </div>
            )}

            <div className="flex items-center text-gray-300 text-sm">
              <User className="w-4 h-4 text-brand-green mr-2 flex-shrink-0" />
              <span className="font-rubik">{request.eventAttendees} attendees</span>
            </div>
          </div>

          {/* Response Deadline */}
          {request.responseDeadline && daysUntilDeadline !== null && (
            <div className="flex items-center text-sm">
              <Clock className="w-4 h-4 text-brand-green mr-2" />
              <span className="font-rubik text-gray-300">
                Response needed by: {new Date(request.responseDeadline).toLocaleDateString()}
                {daysUntilDeadline > 0 && (
                  <span className="text-yellow-400 ml-2">({daysUntilDeadline} days left)</span>
                )}
                {daysUntilDeadline <= 0 && (
                  <span className="text-red-400 ml-2">(Overdue)</span>
                )}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-gray-700">
          {request.status === 'Requested' && onRespond ? (
            <div className="flex space-x-2">
              <Button
                onClick={() => onRespond(request.id, 'approve')}
                className="flex-1 bg-brand-green hover:bg-green-400 text-black font-rubik"
                size="sm"
              >
                Accept Request
              </Button>
              <Button
                onClick={() => onRespond(request.id, 'decline')}
                variant="outline"
                className="flex-1 border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                size="sm"
              >
                Decline
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <Link 
                to={`/partner/event/${request.eventId}`}
                className="text-brand-green hover:text-white transition-colors font-rubik text-sm"
              >
                View Event Details →
              </Link>
              {request.status === 'Confirmed' && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-brand-green text-brand-green hover:bg-brand-green hover:text-black"
                >
                  Manage Service
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Request Timeline */}
        <div className="text-xs text-gray-500 font-rubik">
          Requested {new Date(request.requestedAt).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  )
}