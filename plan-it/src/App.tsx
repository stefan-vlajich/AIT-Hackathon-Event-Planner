import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage, EventsPage, PlannerPage, PartnerPage, AboutPage } from '@/pages'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/planner" element={<PlannerPage />} />
        <Route path="/partner" element={<PartnerPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  )
}

export default App
