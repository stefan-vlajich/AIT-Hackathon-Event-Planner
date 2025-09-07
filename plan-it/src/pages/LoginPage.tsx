import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { useAuth } from '@/hooks/useSupabase'
import { supabase } from '@/lib/supabase'
import heroImage from '@/assets/images/home/hero.png'

export function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { signIn } = useAuth()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    setErrors({})
    
    try {
      const { data, error } = await signIn(formData.email, formData.password)
      
      if (error) {
        setErrors({ general: error.message })
      } else if (data.user) {
        // Get user profile to determine redirect
        const { data: userProfile, error: profileError } = await supabase
          .from('app_users')
          .select(`
            usertype:usertype_usertypeid (
              type
            )
          `)
          .eq('auth_user_id', data.user.id)
          .eq('isactive', true)
          .single()

        if (profileError) {
          console.error('Error fetching user profile:', profileError)
          navigate('/events') // Fallback to events page
        } else {
          // Redirect based on user type
          const userType = userProfile?.usertype?.type?.toLowerCase()
          switch (userType) {
            case 'planner':
              navigate('/planner/dashboard')
              break
            case 'partner':
              navigate('/partner/dashboard')
              break
            case 'attendee':
              navigate('/attendee/events')
              break
            default:
              navigate('/events')
          }
        }
      }
    } catch (err) {
      setErrors({ general: 'An unexpected error occurred. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Background with same hero image and overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Login form */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 lg:px-8 mt-32 mb-20">
        <Card className="w-full max-w-md bg-black/80 border-brand-green border-2 text-white">
          <CardHeader className="text-center">
            <CardTitle className="font-arial-black text-3xl text-brand-green mb-2">
              welcome back
            </CardTitle>
            <CardDescription className="font-rubik font-light text-gray-300">
              Sign in to your plan-it account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="font-rubik text-brand-green">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-transparent border-gray-600 text-white focus:border-brand-green"
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="password" className="font-rubik text-brand-green">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="bg-transparent border-gray-600 text-white focus:border-brand-green"
                  placeholder="••••••••"
                />
                {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-green hover:bg-green-400 text-black font-rubik font-medium text-lg py-3 transition-all duration-300"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="font-rubik text-gray-300">
              Don't have an account?{' '}
              <Link to="/signup" className="text-brand-green hover:text-white transition-colors">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  )
}