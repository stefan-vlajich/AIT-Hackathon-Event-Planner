import { Button } from '@/components/ui/button'

export function ExploreSection() {
  return (
    <section className="py-20" style={{ backgroundColor: '#73F64B' }}>
      <div className="max-w-6xl mx-auto text-center px-6 lg:px-8">
        <h2 className="font-arial-black text-6xl md:text-8xl lg:text-9xl font-black text-black mb-12 leading-tight tracking-tighter">
          Explore
          <br />
          Events That
          <br />
          Inspire
        </h2>
        <div className="flex justify-center">
          <Button 
            size="lg" 
            variant="outline"
            className="bg-transparent border-black text-black hover:bg-black hover:text-white font-semibold px-16 py-6 text-xl rounded-none"
          >
            SIGN UP
          </Button>
        </div>
      </div>
    </section>
  )
}
