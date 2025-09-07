-- Check the user types in your database
-- Run this query to see what user types exist and their IDs

SELECT usertypeid, type FROM usertype ORDER BY usertypeid;

-- Also check what user types are assigned to your test users
SELECT 
    au.userid,
    au.firstname,
    au.lastname,
    au.email,
    ut.type as user_type
FROM app_users au
JOIN usertype ut ON au.usertype_usertypeid = ut.usertypeid
WHERE au.email IN ('attendee@test.com', 'partner@test.com', 'planner@test.com')
ORDER BY au.userid;
