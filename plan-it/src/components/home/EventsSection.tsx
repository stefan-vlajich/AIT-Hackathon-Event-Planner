import { Button } from '@/components/ui/button'

export function EventsSection() {
  const sampleEvents = [
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
    }
  ]

  return (
    <section className="bg-black pb-16">
      <div className="w-full">
        <div className="text-left py-16 pl-8">
          <h2 className="font-arial-black text-6xl md:text-8xl lg:text-9xl font-black text-brand-green uppercase leading-tight tracking-tighter">
            WHAT'S
            <br />
            GOING ON
          </h2>
        </div>

        <div className="px-8">
          <div className="grid grid-cols-4 grid-rows-2 w-full h-full">
            {sampleEvents.map((event) => (
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
          
          {/* All Shows Button */}
          <div className="flex justify-center mt-12">
            <Button 
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-black font-semibold px-20 py-6 text-xl rounded-none"
            >
              All Shows
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
