-- PostgreSQL Event Management Schema

-- Create the database schema
CREATE SCHEMA IF NOT EXISTS mydb;
SET search_path TO mydb;

-- -----------------------------------------------------
-- Table mydb.EventStatus
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS EventStatus (
  EventStatusID SERIAL PRIMARY KEY,
  Status VARCHAR(50) NOT NULL, -- 'Registered', 'Approved', 'Declined', 'Waitlisted', 'Attended'
  Description TEXT,
  IsActive BOOLEAN DEFAULT TRUE,
  CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------
-- Table mydb.UserType
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS UserType (
  UserTypeID SERIAL PRIMARY KEY,
  Type VARCHAR(50) NOT NULL, -- 'Planner', 'Attendee', 'Partner'
  Description TEXT,
  DefaultPermissions JSONB, -- Default permissions for this user type
  IsActive BOOLEAN DEFAULT TRUE,
  CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------
-- Table mydb.OrganizationType
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS OrganizationType (
  OrganizationTypeID SERIAL PRIMARY KEY,
  Type VARCHAR(50) NOT NULL, -- 'Planner', 'Partner'
  Description TEXT,
  Permissions JSONB, -- What this organization type can do
  IsActive BOOLEAN DEFAULT TRUE,
  CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------
-- Table mydb.Organization
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Organization (
  OrganizationID SERIAL PRIMARY KEY,
  OrganizationType_OrganizationTypeID INTEGER NOT NULL,
  Name VARCHAR(255) NOT NULL,
  Description TEXT,
  Email VARCHAR(255),
  PhoneNumber VARCHAR(20),
  Address VARCHAR(500),
  City VARCHAR(100),
  State VARCHAR(100),
  PostalCode VARCHAR(20),
  Country VARCHAR(100),
  Website VARCHAR(255),
  LogoURL VARCHAR(500),
  IsActive BOOLEAN DEFAULT TRUE,
  IsVerified BOOLEAN DEFAULT FALSE,
  CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_Organization_OrganizationType1
    FOREIGN KEY (OrganizationType_OrganizationTypeID)
    REFERENCES OrganizationType (OrganizationTypeID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- Create index for Organization
CREATE INDEX idx_Organization_OrganizationType ON Organization (OrganizationType_OrganizationTypeID);

-- Create trigger to auto-update UpdatedAt timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.UpdatedAt = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_organization_updated_at BEFORE UPDATE
ON Organization FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- -----------------------------------------------------
-- Table mydb.User
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "User" (
  UserID SERIAL PRIMARY KEY,
  UserType_UserTypeID INTEGER NOT NULL,
  Organization_OrganizationID INTEGER, -- Nullable - some users might not be in orgs initially
  FirstName VARCHAR(100) NOT NULL,
  LastName VARCHAR(100) NOT NULL,
  Email VARCHAR(255) NOT NULL UNIQUE,
  PasswordHash VARCHAR(255) NOT NULL,
  PhoneNumber VARCHAR(20),
  ProfileImageURL VARCHAR(500),
  DateOfBirth DATE,
  IsEmailVerified BOOLEAN DEFAULT FALSE,
  IsActive BOOLEAN DEFAULT TRUE,
  LastLoginAt TIMESTAMP,
  CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_User_UserType1
    FOREIGN KEY (UserType_UserTypeID)
    REFERENCES UserType (UserTypeID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_User_Organization1
    FOREIGN KEY (Organization_OrganizationID)
    REFERENCES Organization (OrganizationID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- Create indexes for User
CREATE INDEX idx_User_UserType ON "User" (UserType_UserTypeID);
CREATE INDEX idx_User_Organization ON "User" (Organization_OrganizationID);

-- Create trigger for User UpdatedAt
CREATE TRIGGER update_user_updated_at BEFORE UPDATE
ON "User" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- -----------------------------------------------------
-- Table mydb.EventCategory
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS EventCategory (
  CategoryID SERIAL PRIMARY KEY,
  Name VARCHAR(100) NOT NULL, -- 'Wedding', 'Corporate', 'Birthday', 'Conference', etc.
  Description TEXT,
  IsActive BOOLEAN DEFAULT TRUE,
  CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------
-- Table mydb.Event
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Event (
  EventID SERIAL PRIMARY KEY,
  Organization_PlannerOrganizationID INTEGER NOT NULL,
  EventCategory_CategoryID INTEGER NOT NULL,
  CreatedByUserID INTEGER NOT NULL, -- The planner user who created this event
  Title VARCHAR(255) NOT NULL,
  Description TEXT,
  EventDate DATE NOT NULL,
  StartTime TIME NOT NULL,
  EndTime TIME NOT NULL,
  VenueAddress VARCHAR(500),
  City VARCHAR(100),
  State VARCHAR(100),
  PostalCode VARCHAR(20),
  Country VARCHAR(100),
  MaxAttendees INTEGER, -- Unlimited if null
  CurrentAttendeeCount INTEGER DEFAULT 0,
  RegistrationDeadline TIMESTAMP,
  EventImageURL VARCHAR(500),
  IsPublic BOOLEAN DEFAULT TRUE, -- Can anyone see/join?
  RequiresApproval BOOLEAN DEFAULT FALSE, -- Do attendees need approval?
  EventStatus VARCHAR(20) DEFAULT 'Draft' CHECK (EventStatus IN ('Draft', 'Published', 'Cancelled', 'Completed')),
  CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_Event_Organization1
    FOREIGN KEY (Organization_PlannerOrganizationID)
    REFERENCES Organization (OrganizationID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Event_EventCategory1
    FOREIGN KEY (EventCategory_CategoryID)
    REFERENCES EventCategory (CategoryID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Event_CreatedByUser
    FOREIGN KEY (CreatedByUserID)
    REFERENCES "User" (UserID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- Create indexes for Event
CREATE INDEX idx_Event_Organization ON Event (Organization_PlannerOrganizationID);
CREATE INDEX idx_Event_EventCategory ON Event (EventCategory_CategoryID);
CREATE INDEX idx_Event_CreatedByUser ON Event (CreatedByUserID);

-- Create trigger for Event UpdatedAt
CREATE TRIGGER update_event_updated_at BEFORE UPDATE
ON Event FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- -----------------------------------------------------
-- Table mydb.UserEvent
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS UserEvent (
  UserEventID SERIAL PRIMARY KEY,
  User_UserID INTEGER NOT NULL,
  Event_EventID INTEGER NOT NULL,
  EventStatus_EventStatusID INTEGER NOT NULL,
  RegistrationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ApprovedByUserID INTEGER, -- User who approved this registration
  ApprovedAt TIMESTAMP,
  CheckedInAt TIMESTAMP, -- For event day check-in
  Notes TEXT, -- Any special requirements/notes
  CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_UserEvent_User
    FOREIGN KEY (User_UserID)
    REFERENCES "User" (UserID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_UserEvent_Event1
    FOREIGN KEY (Event_EventID)
    REFERENCES Event (EventID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_UserEvent_EventStatus1
    FOREIGN KEY (EventStatus_EventStatusID)
    REFERENCES EventStatus (EventStatusID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_UserEvent_ApprovedBy
    FOREIGN KEY (ApprovedByUserID)
    REFERENCES "User" (UserID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- Create indexes for UserEvent
CREATE INDEX idx_UserEvent_User ON UserEvent (User_UserID);
CREATE INDEX idx_UserEvent_Event ON UserEvent (Event_EventID);
CREATE INDEX idx_UserEvent_EventStatus ON UserEvent (EventStatus_EventStatusID);
CREATE INDEX idx_UserEvent_ApprovedBy ON UserEvent (ApprovedByUserID);

-- Create trigger for UserEvent UpdatedAt
CREATE TRIGGER update_userevent_updated_at BEFORE UPDATE
ON UserEvent FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- -----------------------------------------------------
-- Table mydb.ServiceType
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS ServiceType (
  ServiceTypeID SERIAL PRIMARY KEY,
  Name VARCHAR(100) NOT NULL, -- 'Catering', 'Photography', 'DJ', 'Venue', 'Decorations', etc.
  Description TEXT,
  IsActive BOOLEAN DEFAULT TRUE,
  CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------
-- Table mydb.Status
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Status (
  StatusID SERIAL PRIMARY KEY,
  Status VARCHAR(50) NOT NULL, -- 'Requested', 'Approved', 'Declined', 'Confirmed'
  Description TEXT,
  IsActive BOOLEAN DEFAULT TRUE,
  CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------
-- Table mydb.EventOrganization
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS EventOrganization (
  EventOrganizationID SERIAL PRIMARY KEY,
  Event_EventID INTEGER NOT NULL,
  ServiceType_ServiceTypeID INTEGER NOT NULL,
  Status_StatusID INTEGER NOT NULL,
  Organization_OrganizationID INTEGER NOT NULL,
  User_RequestedByUserID INTEGER NOT NULL,
  ApprovedByUserID INTEGER, -- Partner user who approved
  ServiceDescription TEXT, -- Specific details of what they are providing
  EstimatedCost DECIMAL(10,2),
  ActualCost DECIMAL(10,2),
  ContractURL VARCHAR(500), -- Link to signed contract/agreement
  RequestedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ResponseAt TIMESTAMP,
  CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_EventOrganization_Event1
    FOREIGN KEY (Event_EventID)
    REFERENCES Event (EventID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_EventOrganization_ServiceType1
    FOREIGN KEY (ServiceType_ServiceTypeID)
    REFERENCES ServiceType (ServiceTypeID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_EventOrganization_Status1
    FOREIGN KEY (Status_StatusID)
    REFERENCES Status (StatusID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_EventOrganization_Organization1
    FOREIGN KEY (Organization_OrganizationID)
    REFERENCES Organization (OrganizationID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_EventOrganization_User1
    FOREIGN KEY (User_RequestedByUserID)
    REFERENCES "User" (UserID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_EventOrganization_User2
    FOREIGN KEY (ApprovedByUserID)
    REFERENCES "User" (UserID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- Create indexes for EventOrganization
CREATE INDEX idx_EventOrganization_Event ON EventOrganization (Event_EventID);
CREATE INDEX idx_EventOrganization_ServiceType ON EventOrganization (ServiceType_ServiceTypeID);
CREATE INDEX idx_EventOrganization_Status ON EventOrganization (Status_StatusID);
CREATE INDEX idx_EventOrganization_Organization ON EventOrganization (Organization_OrganizationID);
CREATE INDEX idx_EventOrganization_RequestedBy ON EventOrganization (User_RequestedByUserID);
CREATE INDEX idx_EventOrganization_ApprovedBy ON EventOrganization (ApprovedByUserID);

-- Create trigger for EventOrganization UpdatedAt
CREATE TRIGGER update_eventorganization_updated_at BEFORE UPDATE
ON EventOrganization FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- -----------------------------------------------------
-- Table mydb.UserNotifications
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS UserNotifications (
  NotificationID SERIAL PRIMARY KEY,
  User_UserID INTEGER NOT NULL,
  Title VARCHAR(255) NOT NULL,
  Message TEXT NOT NULL,
  Type VARCHAR(20) DEFAULT 'General' CHECK (Type IN ('EventUpdate', 'PartnerRequest', 'Registration', 'General')),
  IsRead BOOLEAN DEFAULT FALSE,
  RelatedEntityType VARCHAR(50), -- 'Event', 'Organization', etc.
  RelatedEntityID INTEGER,
  CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_UserNotifications_User1
    FOREIGN KEY (User_UserID)
    REFERENCES "User" (UserID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- Create index for UserNotifications
CREATE INDEX idx_UserNotifications_User ON UserNotifications (User_UserID);

-- -----------------------------------------------------
-- Table mydb.Services
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Services (
  ServicesID SERIAL PRIMARY KEY,
  Name VARCHAR(100) NOT NULL, -- Specific service offering
  Description TEXT,
  IsActive BOOLEAN DEFAULT TRUE,
  CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------
-- Table mydb.PriceRange
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS PriceRange (
  PriceRangeID SERIAL PRIMARY KEY,
  Range VARCHAR(10) NOT NULL, -- '$', '$$', '$$$', '$$$$'
  Description VARCHAR(100), -- 'Budget-friendly', 'Moderate', 'Premium', 'Luxury'
  MinAmount DECIMAL(10,2),
  MaxAmount DECIMAL(10,2),
  IsActive BOOLEAN DEFAULT TRUE,
  CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------
-- Table mydb.PartnerProfile
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS PartnerProfile (
  PartnerProfileID SERIAL PRIMARY KEY,
  Organization_OrganizationID INTEGER NOT NULL, -- Links to partner organization
  PriceRange_PriceRangeID INTEGER NOT NULL,
  CompanyDescription TEXT,
  Portfolio TEXT, -- Links to past work
  ContactEmail VARCHAR(255),
  ContactPhone VARCHAR(20),
  Website VARCHAR(255),
  SocialMediaLinks JSONB, -- Social media profiles
  ServiceRadius INTEGER, -- Miles they serve
  ProfileImageURL VARCHAR(500),
  GalleryImages JSONB, -- Array of image URLs
  ReviewRating DECIMAL(3,2), -- Average rating out of 5.00
  IsVerified BOOLEAN DEFAULT FALSE,
  CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_PartnerProfile_Organization
    FOREIGN KEY (Organization_OrganizationID)
    REFERENCES Organization (OrganizationID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_PartnerProfile_PriceRange1
    FOREIGN KEY (PriceRange_PriceRangeID)
    REFERENCES PriceRange (PriceRangeID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- Create indexes for PartnerProfile
CREATE INDEX idx_PartnerProfile_Organization ON PartnerProfile (Organization_OrganizationID);
CREATE INDEX idx_PartnerProfile_PriceRange ON PartnerProfile (PriceRange_PriceRangeID);

-- Create trigger for PartnerProfile UpdatedAt
CREATE TRIGGER update_partnerprofile_updated_at BEFORE UPDATE
ON PartnerProfile FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- -----------------------------------------------------
-- Table mydb.PartnerProfileServices
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS PartnerProfileServices (
  PartnerProfileServiceID SERIAL PRIMARY KEY,
  PartnerProfile_PartnerProfileID INTEGER NOT NULL,
  Services_ServicesID INTEGER NOT NULL,
  Description TEXT, -- Specific details about how they provide this service
  IsActive BOOLEAN DEFAULT TRUE,
  CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_PartnerProfileServices_PartnerProfile
    FOREIGN KEY (PartnerProfile_PartnerProfileID)
    REFERENCES PartnerProfile (PartnerProfileID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_PartnerProfileServices_Services1
    FOREIGN KEY (Services_ServicesID)
    REFERENCES Services (ServicesID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- Create indexes for PartnerProfileServices
CREATE INDEX idx_PartnerProfileServices_PartnerProfile ON PartnerProfileServices (PartnerProfile_PartnerProfileID);
CREATE INDEX idx_PartnerProfileServices_Services ON PartnerProfileServices (Services_ServicesID);

-- Insert initial data
INSERT INTO UserType (Type, Description) VALUES 
('Planner', 'Event planning organization members'),
('Attendee', 'People who attend events'),
('Partner', 'Service provider organization members');

INSERT INTO OrganizationType (Type, Description) VALUES 
('Planner', 'Event planning organizations'),
('Partner', 'Service provider organizations');

INSERT INTO EventCategory (Name, Description) VALUES 
('Wedding', 'Wedding ceremonies and receptions'),
('Corporate', 'Business events and conferences'),
('Birthday', 'Birthday parties and celebrations'),
('Conference', 'Professional conferences and seminars'),
('Social', 'Social gatherings and parties');

INSERT INTO EventStatus (Status, Description) VALUES 
('Registered', 'User has registered for the event'),
('Approved', 'Registration has been approved'),
('Declined', 'Registration has been declined'),
('Waitlisted', 'User is on the waiting list'),
('Attended', 'User attended the event');

INSERT INTO Status (Status, Description) VALUES 
('Requested', 'Partner services have been requested'),
('Approved', 'Partner has approved the request'),
('Declined', 'Partner has declined the request'),
('Confirmed', 'Services are confirmed and contracted');

INSERT INTO ServiceType (Name, Description) VALUES 
('Catering', 'Food and beverage services'),
('Photography', 'Event photography services'),
('DJ', 'Music and DJ services'),
('Venue', 'Event venue and location'),
('Decorations', 'Event decorating services'),
('Flowers', 'Floral arrangements'),
('Transportation', 'Guest transportation services');

INSERT INTO PriceRange (Range, Description, MinAmount, MaxAmount) VALUES 
('$', 'Budget-friendly', 0, 500),
('$$', 'Moderate', 501, 1500),
('$$$', 'Premium', 1501, 5000),
('$$$$', 'Luxury', 5001, NULL);

INSERT INTO Services (Name, Description) VALUES 
('Wedding Catering', 'Full wedding meal service'),
('Corporate Lunch', 'Business meeting catering'),
('Event Photography', 'Professional event photos'),
('Wedding Photography', 'Wedding day photography'),
('DJ Services', 'Music and entertainment'),
('Venue Rental', 'Event space rental'),
('Floral Design', 'Custom floral arrangements');
