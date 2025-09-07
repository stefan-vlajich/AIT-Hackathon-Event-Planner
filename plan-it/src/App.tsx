import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage, EventsPage, HowItWorksPage, AboutPage, SignUpPage, LoginPage, EventDetailPage } from '@/pages'
import { AttendeeProfilePage, AttendeeEventsPage, MyEventsPage } from '@/pages/attendee'
import { PartnerProfilePage, PartnerEventsPage, PartnerDashboardPage, PartnerEventDetailPage } from '@/pages/partner'
import { PlannerProfilePage, PlannerMyEventsPage, PlannerDashboardPage, PlannerPartnersPage, CreateEventPage, EditEventPage } from '@/pages/planner'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
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
        
        {/* Planner Routes */}
        <Route path="/planner/profile" element={<PlannerProfilePage />} />
        <Route path="/planner/my-events" element={<PlannerMyEventsPage />} />
        <Route path="/planner/dashboard" element={<PlannerDashboardPage />} />
        <Route path="/planner/partners" element={<PlannerPartnersPage />} />
        <Route path="/planner/create-event" element={<CreateEventPage />} />
        <Route path="/planner/event/:eventId/edit" element={<EditEventPage />} />
      </Routes>
    </Router>
  )
}

export default App
