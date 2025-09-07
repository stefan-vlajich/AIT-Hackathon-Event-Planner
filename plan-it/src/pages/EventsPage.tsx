import { useState, useEffect, useRef } from 'react'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { useEvents, useEventCategories } from '@/hooks/useSupabase'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'

export function EventsPage() {
  const { events, loading, error } = useEvents()
  const { categories } = useEventCategories()
  
  // Type assertions to help TypeScript understand the data structure
  const typedEvents = events as any[]
  const typedCategories = categories as any[]
  const [selectedCategory, setSelectedCategory] = useState('All Events')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Filter events based on selected category
  const filteredEvents = typedEvents.filter(event => {
    if (selectedCategory === 'All Events') return true
    // For now, we'll filter by category ID since we don't have the join
    const categoryId = typedCategories.find(cat => cat.name === selectedCategory)?.categoryid
    return event.eventcategory_categoryid === categoryId
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
            ALL
            <br />
            EVENTS
          </h1>
        </motion.div>
      </section>

      {/* Events Grid */}
      <section className="bg-black pb-16">
        <div className="px-8">
          {/* Category Filter Dropdown */}
          <motion.div 
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative" ref={dropdownRef}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="bg-transparent border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-4 text-lg rounded-none flex items-center gap-3"
                >
                  {selectedCategory}
                  <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </Button>
              </motion.div>
              
              {isDropdownOpen && (
                <motion.div 
                  className="absolute top-full left-0 mt-2 bg-white border border-black shadow-xl z-50 min-w-96"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-6">
                    <h3 className="font-rubik font-semibold text-black text-lg mb-4">Filter by Category</h3>
                    <div className="grid grid-cols-3 gap-3">
                      <motion.button
                        onClick={() => {
                          setSelectedCategory('All Events')
                          setIsDropdownOpen(false)
                        }}
                        className={`h-16 p-3 text-left font-rubik text-sm rounded transition-colors flex items-center justify-center ${
                          selectedCategory === 'All Events'
                            ? 'bg-brand-green text-black'
                            : 'bg-gray-100 text-black hover:bg-gray-200'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        All Events
                      </motion.button>
                      {typedCategories.map((category, index) => (
                        <motion.button
                          key={category.categoryid}
                          onClick={() => {
                            setSelectedCategory(category.name)
                            setIsDropdownOpen(false)
                          }}
                          className={`h-16 p-3 text-left font-rubik text-sm rounded transition-colors flex items-center justify-center ${
                            selectedCategory === category.name
                              ? 'bg-brand-green text-black'
                              : 'bg-gray-100 text-black hover:bg-gray-200'
                          }`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {category.name}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
          
          {loading ? (
            <motion.div 
              className="flex justify-center items-center h-96"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-white text-xl">Loading events...</div>
            </motion.div>
          ) : error ? (
            <motion.div 
              className="flex justify-center items-center h-96"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-red-400 text-xl">Error loading events: {error}</div>
            </motion.div>
          ) : filteredEvents.length === 0 ? (
            <motion.div 
              className="flex justify-center items-center h-96"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-white text-xl">No events found</div>
              <div className="text-white text-sm mt-2">Total events: {typedEvents.length}</div>
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {filteredEvents.map((event, index) => (
                <motion.div 
                  key={event.eventid} 
                  className="bg-white border border-black rounded-lg overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  style={{ transition: "all 0.3s ease" }}
                >
                  {/* 40% - Image section */}
                  <div className="h-2/5 bg-gray-300 flex items-center justify-center">
                    <div className="text-gray-500 text-sm font-medium">
                      {event.eventimageurl ? (
                        <img src={event.eventimageurl} alt={event.title} className="w-full h-full object-cover" />
                      ) : (
                        "Image Placeholder"
                      )}
                    </div>
                  </div>
                  
                  {/* 60% - Green section with content */}
                  <div className="h-3/5 p-6 flex flex-col justify-center items-center text-center" style={{ backgroundColor: '#73F64B' }}>
                    <div className="flex flex-col items-center space-y-8">
                      {/* Event Title */}
                      <div className="h-16 flex items-center justify-center">
                        <h3 className="text-black font-bold text-xl md:text-2xl leading-tight uppercase text-center">
                          {event.title}
                        </h3>
                      </div>
                      
                      {/* Date | Location */}
                      <p className="text-black text-base font-medium">
                        {new Date(event.eventdate).toLocaleDateString()} | {event.city}, {event.state}
                      </p>
                      
                      {/* Category Name */}
                      {(() => {
                        const category = typedCategories.find(cat => cat.categoryid === event.eventcategory_categoryid)
                        return category && (
                          <p className="text-black text-sm font-medium">
                            {category.name}
                          </p>
                        )
                      })()}
                      
                      {/* More Info Hyperlink */}
                      <a 
                        href={`/events/${event.eventid}`}
                        className="text-black font-semibold text-base underline hover:no-underline transition-all duration-200"
                      >
                        More Info
                      </a>
                      
                      {/* Buy Tickets Button */}
                      <div className="mt-6">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button 
                            size="lg"
                            variant="outline"
                            className="w-auto px-8 bg-transparent border-black text-black hover:bg-black hover:text-white font-semibold py-6 rounded-none"
                          >
                            Buy Tickets
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}