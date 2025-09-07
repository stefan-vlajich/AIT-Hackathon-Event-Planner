import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '@/assets/images/logo.png'

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src={logo} 
                alt="Plan It Logo" 
                className="h-8 md:h-10 w-auto"
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-brand-green transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Navigation Links - Desktop - Centered */}
          <div className="hidden md:flex items-center justify-center space-x-8 flex-1">
            <Link 
              to="/events" 
              className="text-white font-rubik font-light text-sm lg:text-base hover:text-brand-green transition-colors duration-300 py-2 px-3 rounded"
            >
              EVENTS
            </Link>
            <Link 
              to="/planner" 
              className="text-white font-rubik font-light text-sm lg:text-base hover:text-brand-green transition-colors duration-300 py-2 px-3 rounded"
            >
              PLANNER
            </Link>
            <Link 
              to="/partner" 
              className="text-white font-rubik font-light text-sm lg:text-base hover:text-brand-green transition-colors duration-300 py-2 px-3 rounded"
            >
              PARTNER
            </Link>
            <Link 
              to="/about" 
              className="text-white font-rubik font-light text-sm lg:text-base hover:text-brand-green transition-colors duration-300 py-2 px-3 rounded"
            >
              ABOUT
            </Link>
          </div>

          {/* Login Button */}
          <div className="ml-auto md:ml-0">
            <Button 
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white hover:text-brand-green hover:border-brand-green font-rubik font-light text-sm transition-colors duration-300"
              asChild
            >
              <Link to="/login">LOG IN</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black bg-opacity-90 rounded-lg mt-2 p-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/events"
                className="text-white font-rubik font-light hover:text-brand-green transition-colors duration-300 py-2 px-3 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                EVENTS
              </Link>
              <Link 
                to="/planner" 
                className="text-white font-rubik font-light hover:text-brand-green transition-colors duration-300 py-2 px-3 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                PLANNER
              </Link>
              <Link 
                to="/partner" 
                className="text-white font-rubik font-light hover:text-brand-green transition-colors duration-300 py-2 px-3 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                PARTNER
              </Link>
              <Link 
                to="/about" 
                className="text-white font-rubik font-light hover:text-brand-green transition-colors duration-300 py-2 px-3 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ABOUT
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
