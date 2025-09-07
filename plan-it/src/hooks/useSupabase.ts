import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

// Hook for fetching events with proper schema
export function useEvents() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      // Simplified query without joins first
      const { data, error } = await supabase
        .from('event')
        .select(`
          eventid,
          title,
          description,
          eventdate,
          starttime,
          endtime,
          venueaddress,
          city,
          state,
          country,
          eventimageurl,
          eventstatus,
          maxattendees,
          currentattendeecount,
          createdat,
          eventcategory_categoryid
        `)
        .eq('ispublic', true)
        .eq('eventstatus', 'Published')
        .order('eventdate', { ascending: true })

      if (error) throw error
      setEvents(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createEvent = async (eventData) => {
    try {
      const { data, error } = await supabase
        .from('event')
        .insert([eventData])
        .select()

      if (error) throw error
      return data[0]
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  return {
    events,
    loading,
    error,
    fetchEvents,
    createEvent
  }
}

// Hook for fetching event categories
export function useEventCategories() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('eventcategory')
        .select('categoryid, name, description')
        .eq('isactive', true)
        .order('name')

      if (error) throw error
      setCategories(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    categories,
    loading,
    error,
    fetchCategories
  }
}

// Hook for user management
export function useUsers() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('app_users')
        .select(`
          userid,
          firstname,
          lastname,
          email,
          phonenumber,
          profileimageurl,
          isactive,
          createdat,
          usertype:usertype_usertypeid (
            usertypeid,
            type
          )
        `)
        .eq('isactive', true)

      if (error) throw error
      setUsers(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    users,
    loading,
    error,
    fetchUsers
  }
}

// Example hook for authentication
export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { data, error }
  }

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  }
}

// Hook for getting current user's profile and user type
export function useCurrentUser() {
  const [userProfile, setUserProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchUserProfile()
    } else {
      setUserProfile(null)
      setLoading(false)
    }
  }, [user])

  const fetchUserProfile = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('app_users')
        .select(`
          userid,
          firstname,
          lastname,
          email,
          phonenumber,
          profileimageurl,
          isactive,
          createdat,
          usertype:usertype_usertypeid (
            usertypeid,
            type
          )
        `)
        .eq('auth_user_id', user.id)
        .eq('isactive', true)
        .single()

      if (error) throw error
      setUserProfile(data)
    } catch (err) {
      setError(err.message)
      setUserProfile(null)
    } finally {
      setLoading(false)
    }
  }

  return {
    userProfile,
    loading,
    error,
    refetch: fetchUserProfile
  }
}

// Hook for user's event registrations
export function useUserEvents() {
  const [userEvents, setUserEvents] = useState<any>({
    upcoming: [],
    past: [],
    pending: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchUserEvents()
    } else {
      setUserEvents({ upcoming: [], past: [], pending: [] })
      setLoading(false)
    }
  }, [user])

  const fetchUserEvents = async () => {
    try {
      setLoading(true)
      
      // Get user's profile first
      const { data: userProfile, error: profileError } = await supabase
        .from('app_users')
        .select('userid')
        .eq('auth_user_id', user.id)
        .eq('isactive', true)
        .single()

      if (profileError) throw profileError

      // Get user's event registrations
      const { data: registrations, error: regError } = await supabase
        .from('eventregistration')
        .select(`
          registrationid,
          registrationstatus,
          registrationdate,
          event:event_eventid (
            eventid,
            title,
            description,
            eventdate,
            starttime,
            endtime,
            venueaddress,
            city,
            state,
            country,
            eventimageurl,
            eventstatus,
            maxattendees,
            currentattendeecount,
            createdat,
            eventcategory_categoryid,
            organization:organization_organizationid (
              organizationid,
              name
            )
          )
        `)
        .eq('attendee_userid', userProfile.userid)
        .order('registrationdate', { ascending: false })

      if (regError) throw regError

      // Categorize events
      const now = new Date()
      const upcoming = []
      const past = []
      const pending = []

      registrations?.forEach(reg => {
        const event = reg.event
        if (!event) return

        const eventDate = new Date(event.eventdate)
        const eventWithStatus = {
          ...event,
          registrationStatus: reg.registrationstatus,
          registrationDate: reg.registrationdate,
          organizationName: event.organization?.name || 'Unknown Organization'
        }

        if (reg.registrationstatus === 'Pending') {
          pending.push(eventWithStatus)
        } else if (eventDate >= now) {
          upcoming.push(eventWithStatus)
        } else {
          past.push(eventWithStatus)
        }
      })

      setUserEvents({ upcoming, past, pending })
    } catch (err) {
      setError(err.message)
      setUserEvents({ upcoming: [], past: [], pending: [] })
    } finally {
      setLoading(false)
    }
  }

  const updateRegistrationStatus = async (registrationId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('eventregistration')
        .update({ registrationstatus: status })
        .eq('registrationid', registrationId)

      if (error) throw error
      
      // Refetch user events to update the UI
      await fetchUserEvents()
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  return {
    userEvents,
    loading,
    error,
    refetch: fetchUserEvents,
    updateRegistrationStatus
  }
}
