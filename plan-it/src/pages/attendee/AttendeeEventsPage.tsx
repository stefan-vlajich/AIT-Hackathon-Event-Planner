import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { EventCard } from '@/components/events/EventCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Filter, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

// Mock data - replace with real API data
const mockEvents = [
  {
    id: 1,
    title: 'Tech Conference 2025',
    description: 'Join us for the biggest tech conference of the year featuring industry leaders, innovative workshops, and networking opportunities.',
    eventDate: '2025-03-15',
    startTime: '9:00 AM',
    endTime: '6:00 PM',
    venueAddress: '123 Convention Center Dr',
    city: 'San Francisco',
    state: 'CA',
    categoryName: 'Technology',
    currentAttendeeCount: 450,
    maxAttendees: 500,
    eventImageURL: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
    organizationName: 'TechEvents Inc'
  },
  {
    id: 2,
    title: 'Art Gallery Opening',
    description: 'Experience contemporary art from local and international artists in this exclusive gallery opening.',
    eventDate: '2025-03-20',
    startTime: '7:00 PM',
    endTime: '10:00 PM',
    venueAddress: '456 Art District Ave',
    city: 'Los Angeles',
    state: 'CA',
    categoryName: 'Arts & Culture',
    currentAttendeeCount: 75,
    maxAttendees: 100,
    eventImageURL: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    organizationName: 'Modern Art Gallery'
  },
  {
    id: 3,
    title: 'Business Networking Mixer',
    description: 'Connect with entrepreneurs, business leaders, and innovators in this monthly networking event.',
    eventDate: '2025-03-25',
    startTime: '6:00 PM',
    endTime: '9:00 PM',
    venueAddress: '789 Business Plaza',
    city: 'New York',
    state: 'NY',
    categoryName: 'Business',
    currentAttendeeCount: 120,
    maxAttendees: 150,
    eventImageURL: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400',
    organizationName: 'NYC Business Network'
  }
]

const categories = ['All', 'Technology', 'Business', 'Arts & Culture', 'Food & Drink', 'Sports', 'Music']

export function AttendeeEventsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('date')

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || event.categoryName === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-black pb-16">
        <motion.div 
          className="w-full text-left py-16 pl-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-arial-black text-5xl md:text-7xl lg:text-8xl font-black text-brand-green uppercase leading-tight tracking-tighter">
            DISCOVER
            <br />
            EVENTS
          </h1>
          <motion.p 
            className="font-rubik text-white text-lg md:text-xl mt-6 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Find and join amazing events in your area
          </motion.p>
        </motion.div>
      </section>

      <main className="bg-black pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Search and Filters */}
          <motion.div 
            className="mb-8 space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Search Bar */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-brand-green focus:bg-white/20 backdrop-blur-sm"
              />
            </motion.div>

            {/* Category Filter */}
            <motion.div 
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {categories.map((category, index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => setSelectedCategory(category)}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    className={selectedCategory === category 
                      ? "bg-brand-green text-black hover:bg-green-400 font-semibold" 
                      : "border-gray-800 text-white bg-gray-900 hover:bg-gray-800 hover:border-brand-green backdrop-blur-sm"
                    }
                  >
                    {category}
                  </Button>
                </motion.div>
              ))}
            </motion.div>

            {/* Sort and Stats */}
            <motion.div 
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <motion.span 
                  className="font-rubik text-white text-sm font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {filteredEvents.length} events found
                </motion.span>
                <motion.select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/10 border-white/20 text-white text-sm rounded-md px-3 py-2 backdrop-blur-sm focus:border-brand-green focus:outline-none"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <option value="date" className="bg-black text-white">Sort by Date</option>
                  <option value="title" className="bg-black text-white">Sort by Title</option>
                  <option value="attendees" className="bg-black text-white">Sort by Popularity</option>
                </motion.select>
              </div>
              
              <motion.div 
                className="flex items-center space-x-2"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Filter className="w-4 h-4 text-gray-400" />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-gray-800 text-white bg-gray-900 hover:bg-gray-800 hover:border-brand-green backdrop-blur-sm"
                  >
                    More Filters
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  style={{ transition: "all 0.3s ease" }}
                >
                  <EventCard
                    event={event}
                    linkTo={`/event/${event.id}`}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-6" />
              </motion.div>
              <motion.h3 
                className="font-arial-black text-2xl text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                No events found
              </motion.h3>
              <motion.p 
                className="font-rubik text-gray-300 mb-8 max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Try adjusting your search or filter criteria to find more events
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('All')
                  }}
                  className="bg-brand-green hover:bg-green-400 text-black font-semibold px-8 py-3"
                >
                  Clear Filters
                </Button>
              </motion.div>
            </motion.div>
          )}

          {/* Featured Section */}
          <motion.div 
            className="mt-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="font-arial-black text-3xl md:text-4xl text-brand-green mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Trending Events
            </motion.h2>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {mockEvents.slice(0, 3).map((event, index) => (
                <motion.div
                  key={`trending-${event.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  style={{ transition: "all 0.3s ease" }}
                >
                  <Link 
                    to={`/event/${event.id}`}
                    className="block"
                  >
                    <EventCard
                      event={event}
                      linkTo={`/event/${event.id}`}
                    />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}