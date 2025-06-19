-- Script to reset admin password to 'admin123'
-- The hash below is bcrypt.hashSync('admin123', 10)

UPDATE "Master_UserProfile" 
SET "MUsr_Password" = '$2b$10$Q/hJChRWH2m/zQol0NisJeVNccL145sVAqymmZZtAuLO92ebSJwOW',
    "ModifiedAt" = CURRENT_TIMESTAMP,
    "ModifiedBy" = 'password_reset_script'
WHERE "MUsr_Username" = 'admin';

-- Verify the update
SELECT "MUsr_Id", "MUsr_Username", "MUsr_FirstName", "MUsr_LastName", 
       "ModifiedAt", "ModifiedBy"
FROM "Master_UserProfile" 
WHERE "MUsr_Username" = 'admin';

-- Show a success message
SELECT 'Admin password has been reset to: admin123' as message; 