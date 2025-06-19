-- Assign Admin role to the existing admin user (ID: 524)

-- First, let's make sure the Admin role exists
INSERT INTO "Master_Role" ("MRole_Name", "MRole_Code", "MRole_Description", "MRole_Type", "MRole_Priority") 
VALUES ('Admin', 'ADMIN', 'System Administrator with full access', 'system', 100)
ON CONFLICT ("MRole_Code") DO NOTHING;

-- Assign the Admin role to user ID 524 (admin)
INSERT INTO "User_Role_Mapping" ("URM_User", "URM_Role", "URM_AssignedBy", "URM_AssignedAt") 
SELECT 
    524,  -- User ID for admin
    r."MRole_Id",
    'system',
    CURRENT_TIMESTAMP
FROM "Master_Role" r
WHERE r."MRole_Code" = 'ADMIN'
ON CONFLICT ("URM_User", "URM_Role") DO NOTHING;

-- Also add admin to System Administrators group
INSERT INTO "Master_Group" ("MGroup_Name", "MGroup_Code", "MGroup_Description", "MGroup_Type") 
VALUES ('System Administrators', 'SYS_ADMINS', 'System Administration Team', 'functional')
ON CONFLICT ("MGroup_Code") DO NOTHING;

INSERT INTO "User_Group_Mapping" ("UGM_User", "UGM_Group", "UGM_AssignedBy", "UGM_AssignedAt") 
SELECT 
    524,  -- User ID for admin
    g."MGroup_Id",
    'system',
    CURRENT_TIMESTAMP
FROM "Master_Group" g
WHERE g."MGroup_Code" = 'SYS_ADMINS'
ON CONFLICT ("UGM_User", "UGM_Group") DO NOTHING;

-- Verify the role assignment
SELECT 
    u."MUsr_Username",
    r."MRole_Name",
    r."MRole_Code",
    'Direct Assignment' as assignment_type
FROM "Master_UserProfile" u
JOIN "User_Role_Mapping" urm ON u."MUsr_Id" = urm."URM_User"
JOIN "Master_Role" r ON urm."URM_Role" = r."MRole_Id"
WHERE u."MUsr_Id" = 524;

-- Show success message
SELECT 'Admin role has been assigned to user admin (ID: 524)' as message; 