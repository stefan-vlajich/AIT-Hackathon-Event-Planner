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
