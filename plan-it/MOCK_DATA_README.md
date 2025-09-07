# Mock Data Setup for plan-it

This directory contains SQL scripts to populate your Supabase database with realistic sample data for testing and development.

## Files

- `mock-data.sql` - Complete mock data with all relationships
- `simple-mock-data.sql` - Simplified version for quick setup

## How to Use

### Option 1: Quick Setup (Recommended)
1. Go to your Supabase project dashboard
2. Navigate to the **SQL Editor**
3. Copy and paste the contents of `simple-mock-data.sql`
4. Click **Run** to execute the script

### Option 2: Complete Setup
1. Use `mock-data.sql` for a more comprehensive dataset
2. Follow the same steps as Option 1

## What's Included

### Sample Data:
- **8 Events** across different categories (Tech, Business, Entertainment, etc.)
- **6 Users** (Planners, Partners, Attendees)
- **4 Organizations** (Corporate, Individual, Venue, Catering)
- **6 Event Categories** (Technology, Business, Entertainment, Education, Health & Wellness, Food & Beverage)
- **Partner Profiles** with services
- **Service Types** and **Price Ranges**

### Sample Events:
1. **Tech Innovation Summit 2024** - San Francisco, CA (500 attendees)
2. **Corporate Networking Mixer** - Austin, TX (200 attendees)
3. **AI & Machine Learning Conference** - San Francisco, CA (300 attendees)
4. **Summer Music Festival** - Austin, TX (1000 attendees)
5. **Startup Pitch Competition** - San Francisco, CA (250 attendees)
6. **Farm-to-Table Food Festival** - Austin, TX (400 attendees)
7. **Digital Marketing Workshop** - San Francisco, CA (150 attendees)
8. **Wellness Retreat Weekend** - Austin, TX (100 attendees)

## Important Notes

### Authentication Setup
Before running the mock data, you need to create users in Supabase Auth:

1. Go to **Authentication > Users** in your Supabase dashboard
2. Create these users manually:
   - `michael.chen@techcorp.com`
   - `sarah@sarahjohnson.com`
   - `david@grandballroom.com`
   - `lisa@gourmetcatering.com`
   - `alex.thompson@email.com`
   - `maria.garcia@email.com`

3. After creating users, update the `auth_user_id` field in the `app_users` table:
```sql
-- Update auth_user_id for each user (replace with actual UUIDs from Supabase Auth)
UPDATE app_users SET auth_user_id = 'actual-uuid-from-auth' WHERE email = 'michael.chen@techcorp.com';
UPDATE app_users SET auth_user_id = 'actual-uuid-from-auth' WHERE email = 'sarah@sarahjohnson.com';
-- ... repeat for all users
```

### Testing Your App
After running the mock data:

1. **Events Page** - Should show 8 events with proper filtering
2. **Category Filtering** - Should work with the 6 categories
3. **Event Details** - Each event has proper location, date, and image
4. **Authentication** - Login/signup should work with the created users

### Customization
You can modify the mock data by:
- Changing event dates to future dates
- Adding more events in different categories
- Creating additional users and organizations
- Modifying service offerings

## Troubleshooting

### Common Issues:
1. **Foreign Key Errors** - Make sure to run the script in order (dependencies first)
2. **Auth User ID Missing** - Create users in Supabase Auth first
3. **Image URLs** - The mock data uses Unsplash URLs that should work

### Reset Data:
To clear all mock data and start fresh:
```sql
-- Clear all data (run in reverse dependency order)
DELETE FROM usernotifications;
DELETE FROM userevent;
DELETE FROM eventorganization;
DELETE FROM partnerprofileservices;
DELETE FROM partnerprofile;
DELETE FROM event;
DELETE FROM app_users;
DELETE FROM organization;
DELETE FROM eventcategory;
DELETE FROM servicetype;
DELETE FROM services;
DELETE FROM pricerange;
DELETE FROM status;
DELETE FROM eventstatus;
DELETE FROM organizationtype;
DELETE FROM usertype;
```

## Next Steps
After setting up mock data:
1. Test your Events page
2. Try filtering by categories
3. Test user authentication
4. Explore event details
5. Add your own events through the UI
