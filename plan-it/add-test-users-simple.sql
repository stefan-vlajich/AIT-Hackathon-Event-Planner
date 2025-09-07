-- Add test users to app_users table (without auth_user_id first)
-- This script adds three test users without linking to auth users initially

-- Insert Attendee user
INSERT INTO app_users (
    userid,
    firstname,
    lastname,
    email,
    phonenumber,
    profileimageurl,
    isactive,
    createdat,
    usertype_usertypeid
) VALUES (
    100, -- New user ID
    'Test',
    'Attendee',
    'attendee@test.com',
    '+1 (555) 000-0001',
    NULL,
    true,
    NOW(),
    1 -- Assuming usertypeid 1 is 'Attendee'
);

-- Insert Partner user
INSERT INTO app_users (
    userid,
    firstname,
    lastname,
    email,
    phonenumber,
    profileimageurl,
    isactive,
    createdat,
    usertype_usertypeid
) VALUES (
    101, -- New user ID
    'Test',
    'Partner',
    'partner@test.com',
    '+1 (555) 000-0002',
    NULL,
    true,
    NOW(),
    3 -- Assuming usertypeid 3 is 'Partner'
);

-- Insert Planner user
INSERT INTO app_users (
    userid,
    firstname,
    lastname,
    email,
    phonenumber,
    profileimageurl,
    isactive,
    createdat,
    usertype_usertypeid
) VALUES (
    102, -- New user ID
    'Test',
    'Planner',
    'planner@test.com',
    '+1 (555) 000-0003',
    NULL,
    true,
    NOW(),
    2 -- Assuming usertypeid 2 is 'Planner'
);

-- Verify the inserts
SELECT 
    userid,
    auth_user_id,
    firstname,
    lastname,
    email,
    usertype_usertypeid,
    isactive
FROM app_users 
WHERE email IN ('attendee@test.com', 'partner@test.com', 'planner@test.com')
ORDER BY userid;

-- After creating auth users in Supabase Auth, update the auth_user_id:
-- UPDATE app_users SET auth_user_id = '0b7897fc-99a3-46b8-92cd-31184cb8128d' WHERE email = 'attendee@test.com';
-- UPDATE app_users SET auth_user_id = '1adc9379-c100-4394-bebc-b27bf425ccfe' WHERE email = 'partner@test.com';
-- UPDATE app_users SET auth_user_id = '1b4ce3ab-e83f-4018-9d5b-027cae33b7a9' WHERE email = 'planner@test.com';
