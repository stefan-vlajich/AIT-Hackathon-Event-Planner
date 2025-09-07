// TypeScript types based on your database schema
export interface AppUser {
  userid: number
  usertype_usertypeid: number
  organization_organizationid?: number
  auth_user_id?: string
  firstname: string
  lastname: string
  email: string
  passwordhash?: string
  phonenumber?: string
  profileimageurl?: string
  dateofbirth?: string
  isemailverified: boolean
  isactive: boolean
  lastloginat?: string
  createdat: string
  updatedat: string
}

export interface Event {
  eventid: number
  organization_plannerorganizationid: number
  eventcategory_categoryid: number
  createdbyuserid: number
  title: string
  description?: string
  eventdate: string
  starttime: string
  endtime: string
  venueaddress?: string
  city?: string
  state?: string
  postalcode?: string
  country?: string
  maxattendees?: number
  currentattendeecount: number
  registrationdeadline?: string
  eventimageurl?: string
  ispublic: boolean
  requiresapproval: boolean
  eventstatus: 'Draft' | 'Published' | 'Cancelled' | 'Completed'
  createdat: string
  updatedat: string
  // Joined data
  eventcategory?: EventCategory
}

export interface EventCategory {
  categoryid: number
  name: string
  description?: string
  isactive: boolean
  createdat: string
}

export interface Organization {
  organizationid: number
  organizationtype_organizationtypeid: number
  name: string
  description?: string
  email?: string
  phonenumber?: string
  address?: string
  city?: string
  state?: string
  postalcode?: string
  country?: string
  website?: string
  logourl?: string
  isactive: boolean
  isverified: boolean
  createdat: string
  updatedat: string
}

export interface UserEvent {
  usereventid: number
  user_userid: number
  event_eventid: number
  eventstatus_eventstatusid: number
  registrationdate: string
  approvedbyuserid?: number
  approvedat?: string
  checkedinat?: string
  notes?: string
  createdat: string
  updatedat: string
}

export interface UserType {
  usertypeid: number
  type: string
  description?: string
  defaultpermissions?: any
  isactive: boolean
  createdat: string
}

export interface PartnerProfile {
  partnerprofileid: number
  organization_organizationid: number
  pricerange_pricerangeid: number
  companydescription?: string
  portfolio?: string
  contactemail?: string
  contactphone?: string
  website?: string
  socialmedialinks?: any
  serviceradius?: number
  profileimageurl?: string
  galleryimages?: any
  reviewrating?: number
  isverified: boolean
  createdat: string
  updatedat: string
}

export interface ServiceType {
  servicetypeid: number
  name: string
  description?: string
  isactive: boolean
  createdat: string
}

export interface EventOrganization {
  eventorganizationid: number
  event_eventid: number
  servicetype_servicetypeid: number
  status_statusid: number
  organization_organizationid: number
  user_requestedbyuserid: number
  approvedbyuserid?: number
  servicedescription?: string
  estimatedcost?: number
  actualcost?: number
  contracturl?: string
  requestedat: string
  responseat?: string
  createdat: string
  updatedat: string
}

export interface UserNotification {
  notificationid: number
  user_userid: number
  title: string
  message: string
  type: 'EventUpdate' | 'PartnerRequest' | 'Registration' | 'General'
  isread: boolean
  relatedentitytype?: string
  relatedentityid?: number
  createdat: string
}

// Database response types for Supabase queries
export interface Database {
  public: {
    Tables: {
      app_users: {
        Row: AppUser
        Insert: Omit<AppUser, 'userid' | 'createdat' | 'updatedat'>
        Update: Partial<Omit<AppUser, 'userid' | 'createdat' | 'updatedat'>>
      }
      event: {
        Row: Event
        Insert: Omit<Event, 'eventid' | 'createdat' | 'updatedat' | 'currentattendeecount'>
        Update: Partial<Omit<Event, 'eventid' | 'createdat' | 'updatedat'>>
      }
      eventcategory: {
        Row: EventCategory
        Insert: Omit<EventCategory, 'categoryid' | 'createdat'>
        Update: Partial<Omit<EventCategory, 'categoryid' | 'createdat'>>
      }
      organization: {
        Row: Organization
        Insert: Omit<Organization, 'organizationid' | 'createdat' | 'updatedat'>
        Update: Partial<Omit<Organization, 'organizationid' | 'createdat' | 'updatedat'>>
      }
      userevent: {
        Row: UserEvent
        Insert: Omit<UserEvent, 'usereventid' | 'createdat' | 'updatedat'>
        Update: Partial<Omit<UserEvent, 'usereventid' | 'createdat' | 'updatedat'>>
      }
      usertype: {
        Row: UserType
        Insert: Omit<UserType, 'usertypeid' | 'createdat'>
        Update: Partial<Omit<UserType, 'usertypeid' | 'createdat'>>
      }
      partnerprofile: {
        Row: PartnerProfile
        Insert: Omit<PartnerProfile, 'partnerprofileid' | 'createdat' | 'updatedat'>
        Update: Partial<Omit<PartnerProfile, 'partnerprofileid' | 'createdat' | 'updatedat'>>
      }
      servicetype: {
        Row: ServiceType
        Insert: Omit<ServiceType, 'servicetypeid' | 'createdat'>
        Update: Partial<Omit<ServiceType, 'servicetypeid' | 'createdat'>>
      }
      eventorganization: {
        Row: EventOrganization
        Insert: Omit<EventOrganization, 'eventorganizationid' | 'createdat' | 'updatedat'>
        Update: Partial<Omit<EventOrganization, 'eventorganizationid' | 'createdat' | 'updatedat'>>
      }
      usernotifications: {
        Row: UserNotification
        Insert: Omit<UserNotification, 'notificationid' | 'createdat'>
        Update: Partial<Omit<UserNotification, 'notificationid' | 'createdat'>>
      }
    }
  }
}
