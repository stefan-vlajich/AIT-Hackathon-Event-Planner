-- Complete Mock Data Setup for plan-it
-- Run this entire script in your Supabase SQL Editor

-- Step 1: Insert User Types
INSERT INTO public.usertype (type, description, defaultpermissions, isactive) VALUES
('Planner', 'Event planners who organize events', '{"can_create_events": true}', true),
('Partner', 'Service providers and vendors', '{"can_provide_services": true}', true),
('Attendee', 'Event attendees and participants', '{"can_register_events": true}', true);

-- Step 2: Insert Organization Types
INSERT INTO public.organizationtype (type, description, permissions, isactive) VALUES
('Corporate', 'Corporate event planning companies', '{"corporate_events": true}', true),
('Individual', 'Individual event planners', '{"personal_events": true}', true),
('Venue', 'Event venues and spaces', '{"venue_services": true}', true),
('Catering', 'Food and beverage services', '{"catering_services": true}', true);

-- Step 3: Insert Organizations
INSERT INTO public.organization (organizationtype_organizationtypeid, name, description, email, city, state, country, isactive, isverified) VALUES
(1, 'TechCorp Events', 'Leading corporate event planning company', 'events@techcorp.com', 'San Francisco', 'CA', 'USA', true, true),
(2, 'Sarah Johnson Events', 'Independent event planner', 'sarah@sarahjohnson.com', 'Austin', 'TX', 'USA', true, true),
(3, 'Grand Ballroom Venue', 'Elegant event venue', 'bookings@grandballroom.com', 'New York', 'NY', 'USA', true, true),
(4, 'Gourmet Catering Co', 'Premium catering services', 'orders@gourmetcatering.com', 'Chicago', 'IL', 'USA', true, true);

-- Step 4: Insert Event Categories
INSERT INTO public.eventcategory (name, description, isactive) VALUES
('Technology', 'Tech conferences and innovation events', true),
('Business', 'Corporate meetings and networking events', true),
('Entertainment', 'Concerts, festivals, and entertainment', true),
('Education', 'Workshops, seminars, and conferences', true),
('Health & Wellness', 'Fitness events and wellness retreats', true),
('Food & Beverage', 'Culinary events and food festivals', true);

-- Step 5: Insert App Users
INSERT INTO public.app_users (usertype_usertypeid, organization_organizationid, firstname, lastname, email, isemailverified, isactive) VALUES
(1, 1, 'Michael', 'Chen', 'michael.chen@techcorp.com', true, true),
(1, 2, 'Sarah', 'Johnson', 'sarah@sarahjohnson.com', true, true),
(2, 3, 'David', 'Kim', 'david@grandballroom.com', true, true),
(2, 4, 'Lisa', 'Wang', 'lisa@gourmetcatering.com', true, true),
(3, NULL, 'Alex', 'Thompson', 'alex.thompson@email.com', true, true),
(3, NULL, 'Maria', 'Garcia', 'maria.garcia@email.com', true, true);

-- Step 6: Insert Events
INSERT INTO public.event (organization_plannerorganizationid, eventcategory_categoryid, createdbyuserid, title, description, eventdate, starttime, endtime, city, state, country, maxattendees, eventimageurl, ispublic, eventstatus) VALUES
(1, 1, 1, 'Tech Innovation Summit 2024', 'Join us for the biggest tech conference featuring AI, blockchain, and emerging technologies.', '2024-03-15', '09:00:00', '18:00:00', 'San Francisco', 'CA', 'USA', 500, 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', true, 'Published'),
(2, 2, 2, 'Corporate Networking Mixer', 'Connect with industry leaders and expand your professional network.', '2024-05-10', '18:00:00', '21:00:00', 'Austin', 'TX', 'USA', 200, 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800', true, 'Published'),
(1, 1, 1, 'AI & Machine Learning Conference', 'Explore the latest developments in artificial intelligence and machine learning.', '2024-06-15', '08:30:00', '17:30:00', 'San Francisco', 'CA', 'USA', 300, 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800', true, 'Published'),
(2, 3, 2, 'Summer Music Festival', 'Outdoor music festival featuring local and national artists.', '2024-08-15', '12:00:00', '23:00:00', 'Austin', 'TX', 'USA', 1000, 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800', true, 'Published'),
(1, 2, 1, 'Startup Pitch Competition', 'Watch innovative startups pitch their ideas to investors.', '2024-09-05', '09:00:00', '17:00:00', 'San Francisco', 'CA', 'USA', 250, 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800', true, 'Published'),
(2, 6, 2, 'Farm-to-Table Food Festival', 'Celebrate local farmers and sustainable food practices.', '2024-10-12', '11:00:00', '19:00:00', 'Austin', 'TX', 'USA', 400, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800', true, 'Published'),
(1, 4, 1, 'Digital Marketing Workshop', 'Learn the latest digital marketing strategies and tools.', '2024-11-20', '10:00:00', '16:00:00', 'San Francisco', 'CA', 'USA', 150, 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', true, 'Published'),
(2, 5, 2, 'Wellness Retreat Weekend', 'Relax and rejuvenate with yoga, meditation, and healthy living workshops.', '2024-12-08', '09:00:00', '17:00:00', 'Austin', 'TX', 'USA', 100, 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800', true, 'Published');

-- Step 7: Update Auth User IDs (after creating users in Supabase Auth)
UPDATE app_users SET auth_user_id = 'e41f899b-fbcc-4a91-ac74-fcf1a4f64e53' WHERE email = 'michael.chen@techcorp.com';
UPDATE app_users SET auth_user_id = '48da150c-50b9-4b28-81bf-93b818d5ff87' WHERE email = 'sarah@sarahjohnson.com';
UPDATE app_users SET auth_user_id = '3e62af90-af62-4b6e-a99d-5ab84c125377' WHERE email = 'david@grandballroom.com';
UPDATE app_users SET auth_user_id = 'a42f6585-0bb5-4486-ac30-e0e8ced4b949' WHERE email = 'lisa@gourmetcatering.com';
UPDATE app_users SET auth_user_id = '4b71011a-5a48-4c78-938a-a914e507d715' WHERE email = 'alex.thompson@email.com';
UPDATE app_users SET auth_user_id = '247f0637-b4aa-4a1b-a82f-426950bb1cc8' WHERE email = 'maria.garcia@email.com';

-- Verify setup
SELECT 'Setup Complete!' as status;
SELECT COUNT(*) as total_events FROM event WHERE eventstatus = 'Published';
SELECT COUNT(*) as total_users FROM app_users WHERE isactive = true;
