-- Add test users to app_users table
-- These users already exist in auth.users with the provided UUIDs

-- Insert Attendee user
INSERT INTO app_users (
    userid,
    auth_user_id,
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
    '0b7897fc-99a3-46b8-92cd-31184cb8128d', -- Auth user ID
    'Test',
    'Attendee',
    'attendee@test.com',
    '+1 (555) 000-0001',
    NULL,
    true,
    NOW(),
    2 -- usertypeid 2 is 'Attendee'
);

-- Insert Partner user
INSERT INTO app_users (
    userid,
    auth_user_id,
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
    '1adc9379-c100-4394-bebc-b27bf425ccfe', -- Auth user ID
    'Test',
    'Partner',
    'partner@test.com',
    '+1 (555) 000-0002',
    NULL,
    true,
    NOW(),
    3 -- usertypeid 3 is 'Partner'
);

-- Insert Planner user
INSERT INTO app_users (
    userid,
    auth_user_id,
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
    '1b4ce3ab-e73f-4018-9d5b-027cae33b7a9', -- Auth user ID
    'Test',
    'Planner',
    'planner@test.com',
    '+1 (555) 000-0003',
    NULL,
    true,
    NOW(),
    1 -- usertypeid 1 is 'Planner'
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
