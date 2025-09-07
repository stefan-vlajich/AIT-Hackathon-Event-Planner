import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { useCurrentUser, useAuth } from '@/hooks/useSupabase'

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { userProfile } = useCurrentUser()
  const { signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    setIsMobileMenuOpen(false)
  }

  // Get user type for navigation
  const userType = userProfile?.usertype?.type?.toLowerCase() || null

  // Define navigation items based on user type
  const getNavigationItems = () => {
    if (!userProfile) {
      // Not logged in - show public navigation
      return [
        { to: "/events", label: "EVENTS" },
        { to: "/how-it-works", label: "HOW IT WORKS" },
        { to: "/about", label: "ABOUT" }
      ]
    }

    // User-specific navigation based on type
    switch (userType) {
      case 'planner':
        return [
          { to: "/planner/dashboard", label: "DASHBOARD" },
          { to: "/planner/my-events", label: "MY EVENTS" },
          { to: "/planner/partners", label: "PARTNERS" },
          { to: "/events", label: "BROWSE EVENTS" }
        ]
      case 'partner':
        return [
          { to: "/partner/dashboard", label: "DASHBOARD" },
          { to: "/partner/events", label: "EVENTS" },
          { to: "/partner/profile", label: "PROFILE" }
        ]
      case 'attendee':
        return [
          { to: "/attendee/events", label: "EVENTS" },
          { to: "/attendee/my-events", label: "MY EVENTS" },
          { to: "/attendee/profile", label: "PROFILE" }
        ]
      default:
        return [
          { to: "/events", label: "EVENTS" },
          { to: "/how-it-works", label: "HOW IT WORKS" },
          { to: "/about", label: "ABOUT" }
        ]
    }
  }

  const navigationItems = getNavigationItems()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src={logo} 
                alt="Plan It Logo" 
                className="h-8 md:h-10 w-auto"
                onError={(e) => {
                  console.error('Logo failed to load:', logo)
                  e.currentTarget.style.border = '2px solid red'
                }}
                onLoad={() => console.log('Logo loaded successfully:', logo)}
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
            {navigationItems.map((item) => (
              <Link 
                key={item.to}
                to={item.to} 
                className="text-white font-rubik font-light text-sm lg:text-base hover:text-brand-green transition-colors duration-300 py-2 px-3 rounded"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Login/Logout Button */}
          <div className="ml-auto md:ml-0">
            {userProfile ? (
              <div className="flex items-center space-x-4">
                <span className="text-white font-rubik text-sm">
                  {userProfile.firstname} {userProfile.lastname}
                </span>
                <Button 
                  variant="outline" 
                  onClick={handleSignOut}
                  className="bg-transparent border-white text-white hover:bg-white hover:text-brand-green hover:border-brand-green font-rubik font-light text-sm transition-colors duration-300"
                >
                  LOG OUT
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-white hover:text-brand-green hover:border-brand-green font-rubik font-light text-sm transition-colors duration-300"
                asChild
              >
                <Link to="/login">LOG IN</Link>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black bg-opacity-90 rounded-lg mt-2 p-4">
            <div className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <Link 
                  key={item.to}
                  to={item.to}
                  className="text-white font-rubik font-light hover:text-brand-green transition-colors duration-300 py-2 px-3 rounded"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {userProfile && (
                <button
                  onClick={handleSignOut}
                  className="text-white font-rubik font-light hover:text-brand-green transition-colors duration-300 py-2 px-3 rounded text-left"
                >
                  LOG OUT
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
