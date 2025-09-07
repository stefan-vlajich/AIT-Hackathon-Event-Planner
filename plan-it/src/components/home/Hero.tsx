import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import heroImage from '@/assets/images/home/hero.png'

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        {/* Dark overlay filter */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Hero Content - Middle with staggered animations */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 lg:px-8">
        <div className="text-center">
          {/* Main title with slide-up animation */}
          <h1 className="font-arial-black text-8xl md:text-9xl lg:text-[12rem] font-black text-brand-green mb-8 tracking-tighter
                         animate-[slideUp_1.2s_ease-out_0.3s_both]">
            plan-it
          </h1>
          {/* Subtitle with delayed slide-up animation */}
          <p className="font-rubik font-light text-3xl md:text-4xl lg:text-5xl text-brand-green max-w-4xl mx-auto
                        animate-[slideUp_1s_ease-out_0.8s_both]">
            where events begin
          </p>
        </div>
      </div>

      {/* CTA Button - Bottom with fade-in animation */}
      <div className="relative z-10 pb-16 flex justify-center px-6 lg:px-8">
        <Button 
          size="lg"
          className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black 
                     font-rubik font-light text-xl px-12 py-6 transition-all duration-300 rounded-none
                     animate-[fadeInUp_1s_ease-out_1.3s_both] hover:scale-105 transform"
          variant="outline"
          asChild
        >
          <Link to="/events">EVENTS</Link>
        </Button>
      </div>

      {/* Custom keyframes defined in style tag */}
      <style>{`
        @keyframes slideUp {
          0% {
            transform: translateY(60px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeInUp {
          0% {
            transform: translateY(30px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  )
}
