import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'

export function EventsPage() {
  const upcomingEvents = [
    {
      id: 1,
      artistName: "Tech Innovation Summit",
      date: "Oct 15, 2025",
      place: "San Francisco, CA"
    },
    {
      id: 2,
      artistName: "Art & Culture Festival",
      date: "Oct 22, 2025",
      place: "New York, NY"
    },
    {
      id: 3,
      artistName: "Startup Pitch Night",
      date: "Nov 5, 2025",
      place: "Austin, TX"
    },
    {
      id: 4,
      artistName: "Food & Wine Expo",
      date: "Nov 12, 2025",
      place: "Napa Valley, CA"
    },
    {
      id: 5,
      artistName: "Music & Beats Conference",
      date: "Nov 18, 2025",
      place: "Nashville, TN"
    },
    {
      id: 6,
      artistName: "Wellness Retreat Weekend",
      date: "Dec 3, 2025",
      place: "Sedona, AZ"
    },
    {
      id: 7,
      artistName: "Gaming Convention",
      date: "Dec 10, 2025",
      place: "Los Angeles, CA"
    },
    {
      id: 8,
      artistName: "Environmental Action Summit",
      date: "Dec 15, 2025",
      place: "Seattle, WA"
    },
    {
      id: 9,
      artistName: "Design Thinking Workshop",
      date: "Dec 20, 2025",
      place: "Portland, OR"
    },
    {
      id: 10,
      artistName: "Digital Marketing Masterclass",
      date: "Jan 8, 2026",
      place: "Chicago, IL"
    },
    {
      id: 11,
      artistName: "Sustainable Living Expo",
      date: "Jan 15, 2026",
      place: "Denver, CO"
    },
    {
      id: 12,
      artistName: "AI & Machine Learning Summit",
      date: "Jan 22, 2026",
      place: "Boston, MA"
    }
  ]

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-black pb-16">
        <div className="w-full">
          <div className="text-left py-16 pl-8">
            <h1 className="font-arial-black text-5xl md:text-7xl lg:text-8xl font-black text-brand-green uppercase leading-tight tracking-tighter">
              ALL
              <br />
              EVENTS
            </h1>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="bg-black pb-16">
        <div className="px-8">
          {/* Filter Buttons */}
          <div className="flex justify-center mb-12 gap-4">
            <Button 
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-4 text-lg rounded-none"
            >
              All Events
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-4 text-lg rounded-none"
            >
              Conferences
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-4 text-lg rounded-none"
            >
              Festivals
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-4 text-lg rounded-none"
            >
              Workshops
            </Button>
          </div>
          
          <div className="grid grid-cols-4 grid-rows-3 w-full h-full">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white h-[36rem] border border-black">
                {/* 40% - Image section */}
                <div className="h-2/5 bg-gray-300 flex items-center justify-center">
                  <div className="text-gray-500 text-sm font-medium">
                    Image Placeholder
                  </div>
                </div>
                
                {/* 60% - Green section with content */}
                <div className="h-3/5 p-8 flex flex-col justify-center items-center text-center" style={{ backgroundColor: '#73F64B' }}>
                  <div className="flex flex-col items-center space-y-8">
                    {/* Artist Name */}
                    <h3 className="text-black font-bold text-xl md:text-2xl leading-tight uppercase">
                      {event.artistName}
                    </h3>
                    
                    {/* Date | Place */}
                    <p className="text-black text-base font-medium">
                      {event.date} | {event.place}
                    </p>
                    
                    {/* More Info Hyperlink */}
                    <a 
                      href="#"
                      className="text-black font-semibold text-base underline hover:no-underline transition-all duration-200"
                    >
                      More Info
                    </a>
                    
                    {/* Buy Tickets Button */}
                    <div className="mt-6">
                      <Button 
                        size="lg"
                        variant="outline"
                        className="w-auto px-8 bg-transparent border-black text-black hover:bg-black hover:text-white font-semibold py-6 rounded-none"
                      >
                        Buy Tickets
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}



