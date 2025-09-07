import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage, EventsPage, PlannerPage, PartnerPage, AboutPage, SignUpPage, LoginPage } from '@/pages'

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
      </Routes>
    </Router>
  )
}

export default App
