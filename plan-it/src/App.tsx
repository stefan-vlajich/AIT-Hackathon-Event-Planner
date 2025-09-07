import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage, EventsPage, PlannerPage, PartnerPage, AboutPage, SignUpPage, LoginPage, EventDetailPage } from '@/pages'
import { AttendeeProfilePage, AttendeeEventsPage, MyEventsPage, EventDetailPage as AttendeeEventDetailPage } from '@/pages/attendee'
import { PartnerProfilePage, PartnerEventsPage, PartnerDashboardPage, PartnerEventDetailPage } from '@/pages/partner'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/planner" element={<PlannerPage />} />
        <Route path="/partner" element={<PartnerPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* General Event Detail Route */}
        <Route path="/event/:eventId" element={<EventDetailPage />} />
        
        {/* Attendee Routes */}
        <Route path="/attendee/profile" element={<AttendeeProfilePage />} />
        <Route path="/attendee/events" element={<AttendeeEventsPage />} />
        <Route path="/attendee/my-events" element={<MyEventsPage />} />
        <Route path="/attendee/event/:eventId" element={<EventDetailPage />} />
        
        {/* Partner Routes */}
        <Route path="/partner/profile" element={<PartnerProfilePage />} />
        <Route path="/partner/events" element={<PartnerEventsPage />} />
        <Route path="/partner/dashboard" element={<PartnerDashboardPage />} />
        <Route path="/partner/event/:eventId" element={<PartnerEventDetailPage />} />
      </Routes>
    </Router>
  )
}

export default App
