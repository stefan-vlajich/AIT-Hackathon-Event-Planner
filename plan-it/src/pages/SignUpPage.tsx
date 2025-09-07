import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import heroImage from '@/assets/images/home/hero.png'

export function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    userType: '',
    organizationName: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    if (!formData.userType) newErrors.userType = 'Please select your role'
    if (formData.userType === 'Planner' && !formData.organizationName.trim()) {
      newErrors.organizationName = 'Organization name is required for planners'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    try {
      // TODO: Implement actual API call to create user
      console.log('Form submitted:', formData)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      navigate('/events')
    } catch (error) {
      console.error('Sign up failed:', error)
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

      {/* Sign up form */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 lg:px-8 py-12 mt-20 mb-20">
        <Card className="w-full max-w-md bg-black/80 border-brand-green border-2 text-white">
          <CardHeader className="text-center">
            <CardTitle className="font-arial-black text-3xl text-brand-green mb-2">
              join plan-it
            </CardTitle>
            <CardDescription className="font-rubik font-light text-gray-300">
              Create your account to start planning amazing events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="font-rubik text-brand-green">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="bg-transparent border-gray-600 text-white focus:border-brand-green"
                    placeholder="John"
                  />
                  {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <Label htmlFor="lastName" className="font-rubik text-brand-green">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="bg-transparent border-gray-600 text-white focus:border-brand-green"
                    placeholder="Doe"
                  />
                  {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

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
                <Label htmlFor="phoneNumber" className="font-rubik text-brand-green">
                  Phone Number (Optional)
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="bg-transparent border-gray-600 text-white focus:border-brand-green"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <Label htmlFor="userType" className="font-rubik text-brand-green">
                  I am a...
                </Label>
                <select
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded-md text-white focus:outline-none focus:border-brand-green"
                >
                  <option value="" className="bg-black">Select your role</option>
                  <option value="Attendee" className="bg-black">Event Attendee</option>
                  <option value="Planner" className="bg-black">Event Planner</option>
                  <option value="Partner" className="bg-black">Service Partner</option>
                </select>
                {errors.userType && <p className="text-red-400 text-sm mt-1">{errors.userType}</p>}
              </div>

              {formData.userType === 'Planner' && (
                <div>
                  <Label htmlFor="organizationName" className="font-rubik text-brand-green">
                    Organization Name
                  </Label>
                  <Input
                    id="organizationName"
                    name="organizationName"
                    type="text"
                    value={formData.organizationName}
                    onChange={handleInputChange}
                    className="bg-transparent border-gray-600 text-white focus:border-brand-green"
                    placeholder="Your Planning Company"
                  />
                  {errors.organizationName && <p className="text-red-400 text-sm mt-1">{errors.organizationName}</p>}
                </div>
              )}

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

              <div>
                <Label htmlFor="confirmPassword" className="font-rubik text-brand-green">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="bg-transparent border-gray-600 text-white focus:border-brand-green"
                  placeholder="••••••••"
                />
                {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-green hover:bg-green-400 text-black font-rubik font-medium text-lg py-3 transition-all duration-300"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="font-rubik text-gray-300">
              Already have an account?{' '}
              <Link to="/login" className="text-brand-green hover:text-white transition-colors">
                Sign in
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