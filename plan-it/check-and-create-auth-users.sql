-- Check what auth users exist in your database
-- Run this query first to see what auth users are available

SELECT id, email, created_at 
FROM auth.users 
ORDER BY created_at DESC;

-- If you don't see the users you created, let's check if they exist with different emails:
SELECT id, email, created_at 
FROM auth.users 
WHERE id IN (
    '0b7897fc-99a3-46b8-92cd-31184cb8128d',
    '1adc9379-c100-4394-bebc-b27bf425ccfe', 
    '1b4ce3ab-e83f-4018-9d5b-027cae33b7a9'
);

-- If the users don't exist, you can create them manually with these commands:
-- (Run these one by one in Supabase SQL Editor)

-- Create attendee@test.com user
INSERT INTO auth.users (
    id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    role,
    aud
) VALUES (
    '0b7897fc-99a3-46b8-92cd-31184cb8128d',
    'attendee@test.com',
    crypt('password123', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider": "email", "providers": ["email"]}',
    '{}',
    false,
    'authenticated',
    'authenticated'
);

-- Create partner@test.com user
INSERT INTO auth.users (
    id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    role,
    aud
) VALUES (
    '1adc9379-c100-4394-bebc-b27bf425ccfe',
    'partner@test.com',
    crypt('password123', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider": "email", "providers": ["email"]}',
    '{}',
    false,
    'authenticated',
    'authenticated'
);

-- Create planner@test.com user
INSERT INTO auth.users (
    id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    role,
    aud
) VALUES (
    '1b4ce3ab-e83f-4018-9d5b-027cae33b7a9',
    'planner@test.com',
    crypt('password123', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider": "email", "providers": ["email"]}',
    '{}',
    false,
    'authenticated',
    'authenticated'
);
