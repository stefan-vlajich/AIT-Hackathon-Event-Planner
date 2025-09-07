import { Button } from '@/components/ui/button'

export function ExploreSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-brand-green to-emerald-600">
      <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Explore Events that Inspire
        </h2>
        <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
          Discover extraordinary experiences that spark creativity, foster connections, 
          and create lasting memories in your community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-white text-brand-green hover:bg-gray-100 font-semibold px-8 py-3"
          >
            Browse All Events
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-brand-green font-semibold px-8 py-3"
          >
            Create Your Event
          </Button>
        </div>
      </div>
    </section>
  )
}
