-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.app_users (
  userid integer NOT NULL DEFAULT nextval('app_users_userid_seq'::regclass),
  usertype_usertypeid integer NOT NULL,
  organization_organizationid integer,
  auth_user_id uuid,
  firstname character varying NOT NULL,
  lastname character varying NOT NULL,
  email character varying NOT NULL UNIQUE,
  passwordhash character varying,
  phonenumber character varying,
  profileimageurl character varying,
  dateofbirth date,
  isemailverified boolean DEFAULT false,
  isactive boolean DEFAULT true,
  lastloginat timestamp without time zone,
  createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  updatedat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT app_users_pkey PRIMARY KEY (userid),
  CONSTRAINT app_users_auth_user_id_fkey FOREIGN KEY (auth_user_id) REFERENCES auth.users(id),
  CONSTRAINT fk_user_usertype1 FOREIGN KEY (usertype_usertypeid) REFERENCES public.usertype(usertypeid),
  CONSTRAINT fk_user_organization1 FOREIGN KEY (organization_organizationid) REFERENCES public.organization(organizationid)
);
CREATE TABLE public.event (
  eventid integer NOT NULL DEFAULT nextval('event_eventid_seq'::regclass),
  organization_plannerorganizationid integer NOT NULL,
  eventcategory_categoryid integer NOT NULL,
  createdbyuserid integer NOT NULL,
  title character varying NOT NULL,
  description text,
  eventdate date NOT NULL,
  starttime time without time zone NOT NULL,
  endtime time without time zone NOT NULL,
  venueaddress character varying,
  city character varying,
  state character varying,
  postalcode character varying,
  country character varying,
  maxattendees integer,
  currentattendeecount integer DEFAULT 0,
  registrationdeadline timestamp without time zone,
  eventimageurl character varying,
  ispublic boolean DEFAULT true,
  requiresapproval boolean DEFAULT false,
  eventstatus character varying DEFAULT 'Draft'::character varying CHECK (eventstatus::text = ANY (ARRAY['Draft'::character varying, 'Published'::character varying, 'Cancelled'::character varying, 'Completed'::character varying]::text[])),
  createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  updatedat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT event_pkey PRIMARY KEY (eventid),
  CONSTRAINT fk_event_organization1 FOREIGN KEY (organization_plannerorganizationid) REFERENCES public.organization(organizationid),
  CONSTRAINT fk_event_eventcategory1 FOREIGN KEY (eventcategory_categoryid) REFERENCES public.eventcategory(categoryid),
  CONSTRAINT fk_event_createdbyuser FOREIGN KEY (createdbyuserid) REFERENCES public.app_users(userid)
);
CREATE TABLE public.eventcategory (
  categoryid integer NOT NULL DEFAULT nextval('eventcategory_categoryid_seq'::regclass),
  name character varying NOT NULL,
  description text,
  isactive boolean DEFAULT true,
  createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT eventcategory_pkey PRIMARY KEY (categoryid)
);
CREATE TABLE public.eventorganization (
  eventorganizationid integer NOT NULL DEFAULT nextval('eventorganization_eventorganizationid_seq'::regclass),
  event_eventid integer NOT NULL,
  servicetype_servicetypeid integer NOT NULL,
  status_statusid integer NOT NULL,
  organization_organizationid integer NOT NULL,
  user_requestedbyuserid integer NOT NULL,
  approvedbyuserid integer,
  servicedescription text,
  estimatedcost numeric,
  actualcost numeric,
  contracturl character varying,
  requestedat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  responseat timestamp without time zone,
  createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  updatedat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT eventorganization_pkey PRIMARY KEY (eventorganizationid),
  CONSTRAINT fk_eventorganization_event1 FOREIGN KEY (event_eventid) REFERENCES public.event(eventid),
  CONSTRAINT fk_eventorganization_servicetype1 FOREIGN KEY (servicetype_servicetypeid) REFERENCES public.servicetype(servicetypeid),
  CONSTRAINT fk_eventorganization_status1 FOREIGN KEY (status_statusid) REFERENCES public.status(statusid),
  CONSTRAINT fk_eventorganization_organization1 FOREIGN KEY (organization_organizationid) REFERENCES public.organization(organizationid),
  CONSTRAINT fk_eventorganization_user1 FOREIGN KEY (user_requestedbyuserid) REFERENCES public.app_users(userid),
  CONSTRAINT fk_eventorganization_user2 FOREIGN KEY (approvedbyuserid) REFERENCES public.app_users(userid)
);
CREATE TABLE public.eventstatus (
  eventstatusid integer NOT NULL DEFAULT nextval('eventstatus_eventstatusid_seq'::regclass),
  status character varying NOT NULL,
  description text,
  isactive boolean DEFAULT true,
  createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT eventstatus_pkey PRIMARY KEY (eventstatusid)
);
CREATE TABLE public.organization (
  organizationid integer NOT NULL DEFAULT nextval('organization_organizationid_seq'::regclass),
  organizationtype_organizationtypeid integer NOT NULL,
  name character varying NOT NULL,
  description text,
  email character varying,
  phonenumber character varying,
  address character varying,
  city character varying,
  state character varying,
  postalcode character varying,
  country character varying,
  website character varying,
  logourl character varying,
  isactive boolean DEFAULT true,
  isverified boolean DEFAULT false,
  createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  updatedat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT organization_pkey PRIMARY KEY (organizationid),
  CONSTRAINT fk_organization_organizationtype1 FOREIGN KEY (organizationtype_organizationtypeid) REFERENCES public.organizationtype(organizationtypeid)
);
CREATE TABLE public.organizationtype (
  organizationtypeid integer NOT NULL DEFAULT nextval('organizationtype_organizationtypeid_seq'::regclass),
  type character varying NOT NULL,
  description text,
  permissions jsonb,
  isactive boolean DEFAULT true,
  createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT organizationtype_pkey PRIMARY KEY (organizationtypeid)
);
CREATE TABLE public.partnerprofile (
  partnerprofileid integer NOT NULL DEFAULT nextval('partnerprofile_partnerprofileid_seq'::regclass),
  organization_organizationid integer NOT NULL,
  pricerange_pricerangeid integer NOT NULL,
  companydescription text,
  portfolio text,
  contactemail character varying,
  contactphone character varying,
  website character varying,
  socialmedialinks jsonb,
  serviceradius integer,
  profileimageurl character varying,
  galleryimages jsonb,
  reviewrating numeric,
  isverified boolean DEFAULT false,
  createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  updatedat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT partnerprofile_pkey PRIMARY KEY (partnerprofileid),
  CONSTRAINT fk_partnerprofile_organization FOREIGN KEY (organization_organizationid) REFERENCES public.organization(organizationid),
  CONSTRAINT fk_partnerprofile_pricerange1 FOREIGN KEY (pricerange_pricerangeid) REFERENCES public.pricerange(pricerangeid)
);
CREATE TABLE public.partnerprofileservices (
  partnerprofileserviceid integer NOT NULL DEFAULT nextval('partnerprofileservices_partnerprofileserviceid_seq'::regclass),
  partnerprofile_partnerprofileid integer NOT NULL,
  services_servicesid integer NOT NULL,
  description text,
  isactive boolean DEFAULT true,
  createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT partnerprofileservices_pkey PRIMARY KEY (partnerprofileserviceid),
  CONSTRAINT fk_partnerprofileservices_partnerprofile FOREIGN KEY (partnerprofile_partnerprofileid) REFERENCES public.partnerprofile(partnerprofileid),
  CONSTRAINT fk_partnerprofileservices_services1 FOREIGN KEY (services_servicesid) REFERENCES public.services(servicesid)
);
CREATE TABLE public.pricerange (
  pricerangeid integer NOT NULL DEFAULT nextval('pricerange_pricerangeid_seq'::regclass),
  range character varying NOT NULL,
  description character varying,
  minamount numeric,
  maxamount numeric,
  isactive boolean DEFAULT true,
  createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT pricerange_pkey PRIMARY KEY (pricerangeid)
);
CREATE TABLE public.services (
  servicesid integer NOT NULL DEFAULT nextval('services_servicesid_seq'::regclass),
  name character varying NOT NULL,
  description text,
  isactive boolean DEFAULT true,
  createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT services_pkey PRIMARY KEY (servicesid)
);
CREATE TABLE public.servicetype (
  servicetypeid integer NOT NULL DEFAULT nextval('servicetype_servicetypeid_seq'::regclass),
  name character varying NOT NULL,
  description text,
  isactive boolean DEFAULT true,
  createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT servicetype_pkey PRIMARY KEY (servicetypeid)
);
CREATE TABLE public.status (
  statusid integer NOT NULL DEFAULT nextval('status_statusid_seq'::regclass),
  status character varying NOT NULL,
  description text,
  isactive boolean DEFAULT true,
  createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT status_pkey PRIMARY KEY (statusid)
);
CREATE TABLE public.userevent (
  usereventid integer NOT NULL DEFAULT nextval('userevent_usereventid_seq'::regclass),
  user_userid integer NOT NULL,
  event_eventid integer NOT NULL,
  eventstatus_eventstatusid integer NOT NULL,
  registrationdate timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  approvedbyuserid integer,
  approvedat timestamp without time zone,
  checkedinat timestamp without time zone,
  notes text,
  createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  updatedat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT userevent_pkey PRIMARY KEY (usereventid),
  CONSTRAINT fk_userevent_user FOREIGN KEY (user_userid) REFERENCES public.app_users(userid),
  CONSTRAINT fk_userevent_event1 FOREIGN KEY (event_eventid) REFERENCES public.event(eventid),
  CONSTRAINT fk_userevent_eventstatus1 FOREIGN KEY (eventstatus_eventstatusid) REFERENCES public.eventstatus(eventstatusid),
  CONSTRAINT fk_userevent_approvedby FOREIGN KEY (approvedbyuserid) REFERENCES public.app_users(userid)
);
CREATE TABLE public.usernotifications (
  notificationid integer NOT NULL DEFAULT nextval('usernotifications_notificationid_seq'::regclass),
  user_userid integer NOT NULL,
  title character varying NOT NULL,
  message text NOT NULL,
  type character varying DEFAULT 'General'::character varying CHECK (type::text = ANY (ARRAY['EventUpdate'::character varying, 'PartnerRequest'::character varying, 'Registration'::character varying, 'General'::character varying]::text[])),
  isread boolean DEFAULT false,
  relatedentitytype character varying,
  relatedentityid integer,
  createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT usernotifications_pkey PRIMARY KEY (notificationid),
  CONSTRAINT fk_usernotifications_user1 FOREIGN KEY (user_userid) REFERENCES public.app_users(userid)
);
CREATE TABLE public.usertype (
  usertypeid integer NOT NULL DEFAULT nextval('usertype_usertypeid_seq'::regclass),
  type character varying NOT NULL,
  description text,
  defaultpermissions jsonb,
  isactive boolean DEFAULT true,
  createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT usertype_pkey PRIMARY KEY (usertypeid)
);