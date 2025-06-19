-- Database setup for Roles and Groups system
-- This script creates tables for a ServiceNow-like roles and groups system

-- 1. Create Master_Role table
CREATE TABLE IF NOT EXISTS "Master_Role" (
    "MRole_Id" SERIAL PRIMARY KEY,
    "MRole_Name" VARCHAR(100) NOT NULL UNIQUE,
    "MRole_Description" VARCHAR(500),
    "MRole_Code" VARCHAR(50) NOT NULL UNIQUE,
    "MRole_Type" VARCHAR(50), -- e.g., 'system', 'custom', 'functional'
    "MRole_Priority" INTEGER DEFAULT 0,
    
    -- Common fields from BaseEntity
    "IsActive" BOOLEAN DEFAULT true,
    "CreatedBy" VARCHAR(100) DEFAULT 'system',
    "CreatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "ModifiedBy" VARCHAR(100),
    "ModifiedAt" TIMESTAMP
);

-- 2. Create Master_Group table
CREATE TABLE IF NOT EXISTS "Master_Group" (
    "MGroup_Id" SERIAL PRIMARY KEY,
    "MGroup_Name" VARCHAR(100) NOT NULL UNIQUE,
    "MGroup_Description" VARCHAR(500),
    "MGroup_Code" VARCHAR(50) NOT NULL UNIQUE,
    "MGroup_Type" VARCHAR(50), -- e.g., 'department', 'functional', 'project'
    "MGroup_ParentId" INTEGER REFERENCES "Master_Group"("MGroup_Id"),
    
    -- Common fields from BaseEntity
    "IsActive" BOOLEAN DEFAULT true,
    "CreatedBy" VARCHAR(100) DEFAULT 'system',
    "CreatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "ModifiedBy" VARCHAR(100),
    "ModifiedAt" TIMESTAMP
);

-- 3. Create User_Role_Mapping table (Many-to-Many between Users and Roles)
CREATE TABLE IF NOT EXISTS "User_Role_Mapping" (
    "URM_Id" SERIAL PRIMARY KEY,
    "URM_User" INTEGER NOT NULL REFERENCES "Master_UserProfile"("MUsr_Id") ON DELETE CASCADE,
    "URM_Role" INTEGER NOT NULL REFERENCES "Master_Role"("MRole_Id") ON DELETE CASCADE,
    "URM_AssignedBy" VARCHAR(100) DEFAULT 'system',
    "URM_AssignedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "URM_ExpiresAt" TIMESTAMP, -- Optional expiry for temporary role assignments
    
    -- Ensure unique combination of user and role
    UNIQUE("URM_User", "URM_Role")
);

-- 4. Create User_Group_Mapping table (Many-to-Many between Users and Groups)
CREATE TABLE IF NOT EXISTS "User_Group_Mapping" (
    "UGM_Id" SERIAL PRIMARY KEY,
    "UGM_User" INTEGER NOT NULL REFERENCES "Master_UserProfile"("MUsr_Id") ON DELETE CASCADE,
    "UGM_Group" INTEGER NOT NULL REFERENCES "Master_Group"("MGroup_Id") ON DELETE CASCADE,
    "UGM_AssignedBy" VARCHAR(100) DEFAULT 'system',
    "UGM_AssignedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "UGM_ExpiresAt" TIMESTAMP, -- Optional expiry for temporary group memberships
    
    -- Ensure unique combination of user and group
    UNIQUE("UGM_User", "UGM_Group")
);

-- 5. Create Group_Role_Mapping table (Many-to-Many between Groups and Roles)
CREATE TABLE IF NOT EXISTS "Group_Role_Mapping" (
    "GRM_Id" SERIAL PRIMARY KEY,
    "GRM_Group" INTEGER NOT NULL REFERENCES "Master_Group"("MGroup_Id") ON DELETE CASCADE,
    "GRM_Role" INTEGER NOT NULL REFERENCES "Master_Role"("MRole_Id") ON DELETE CASCADE,
    "GRM_AssignedBy" VARCHAR(100) DEFAULT 'system',
    "GRM_AssignedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "GRM_ExpiresAt" TIMESTAMP, -- Optional expiry for temporary role assignments to groups
    
    -- Ensure unique combination of group and role
    UNIQUE("GRM_Group", "GRM_Role")
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "idx_user_role_user" ON "User_Role_Mapping"("URM_User");
CREATE INDEX IF NOT EXISTS "idx_user_role_role" ON "User_Role_Mapping"("URM_Role");
CREATE INDEX IF NOT EXISTS "idx_user_group_user" ON "User_Group_Mapping"("UGM_User");
CREATE INDEX IF NOT EXISTS "idx_user_group_group" ON "User_Group_Mapping"("UGM_Group");
CREATE INDEX IF NOT EXISTS "idx_group_role_group" ON "Group_Role_Mapping"("GRM_Group");
CREATE INDEX IF NOT EXISTS "idx_group_role_role" ON "Group_Role_Mapping"("GRM_Role");
CREATE INDEX IF NOT EXISTS "idx_group_parent" ON "Master_Group"("MGroup_ParentId");

-- Insert some sample roles
INSERT INTO "Master_Role" ("MRole_Name", "MRole_Code", "MRole_Description", "MRole_Type", "MRole_Priority") VALUES
('Admin', 'ADMIN', 'System Administrator with full access', 'system', 100),
('User Manager', 'USER_MGR', 'Can manage users and their permissions', 'functional', 80),
('Department Head', 'DEPT_HEAD', 'Head of a department with department-level permissions', 'functional', 70),
('Data Entry', 'DATA_ENTRY', 'Can enter and edit data', 'functional', 30),
('View Only', 'VIEW_ONLY', 'Read-only access to data', 'functional', 10),
('Finance Manager', 'FINANCE_MGR', 'Can manage financial data and reports', 'functional', 60),
('HR Manager', 'HR_MGR', 'Can manage human resources data', 'functional', 60),
('Auditor', 'AUDITOR', 'Can audit system activities and data', 'functional', 50);

-- Insert some sample groups
INSERT INTO "Master_Group" ("MGroup_Name", "MGroup_Code", "MGroup_Description", "MGroup_Type") VALUES
('IT Department', 'IT_DEPT', 'Information Technology Department', 'department'),
('Finance Department', 'FIN_DEPT', 'Finance Department', 'department'),
('HR Department', 'HR_DEPT', 'Human Resources Department', 'department'),
('Management', 'MGMT', 'Management Group', 'functional'),
('Data Analysts', 'DATA_ANALYSTS', 'Data Analysis Team', 'project'),
('System Administrators', 'SYS_ADMINS', 'System Administration Team', 'functional');

-- Sample group-role assignments (Groups inherit roles)
INSERT INTO "Group_Role_Mapping" ("GRM_Group", "GRM_Role") VALUES
((SELECT "MGroup_Id" FROM "Master_Group" WHERE "MGroup_Code" = 'IT_DEPT'), (SELECT "MRole_Id" FROM "Master_Role" WHERE "MRole_Code" = 'DATA_ENTRY')),
((SELECT "MGroup_Id" FROM "Master_Group" WHERE "MGroup_Code" = 'SYS_ADMINS'), (SELECT "MRole_Id" FROM "Master_Role" WHERE "MRole_Code" = 'ADMIN')),
((SELECT "MGroup_Id" FROM "Master_Group" WHERE "MGroup_Code" = 'FIN_DEPT'), (SELECT "MRole_Id" FROM "Master_Role" WHERE "MRole_Code" = 'FINANCE_MGR')),
((SELECT "MGroup_Id" FROM "Master_Group" WHERE "MGroup_Code" = 'HR_DEPT'), (SELECT "MRole_Id" FROM "Master_Role" WHERE "MRole_Code" = 'HR_MGR')),
((SELECT "MGroup_Id" FROM "Master_Group" WHERE "MGroup_Code" = 'MGMT'), (SELECT "MRole_Id" FROM "Master_Role" WHERE "MRole_Code" = 'USER_MGR')),
((SELECT "MGroup_Id" FROM "Master_Group" WHERE "MGroup_Code" = 'DATA_ANALYSTS'), (SELECT "MRole_Id" FROM "Master_Role" WHERE "MRole_Code" = 'DATA_ENTRY'));

-- Create a view to get all effective roles for a user (direct + inherited from groups)
CREATE OR REPLACE VIEW "User_Effective_Roles" AS
-- Direct role assignments
SELECT DISTINCT 
    u."MUsr_Id" as user_id,
    u."MUsr_Username" as username,
    r."MRole_Id" as role_id,
    r."MRole_Name" as role_name,
    r."MRole_Code" as role_code,
    'direct' as assignment_type,
    'Direct Assignment' as source
FROM "Master_UserProfile" u
JOIN "User_Role_Mapping" urm ON u."MUsr_Id" = urm."URM_User"
JOIN "Master_Role" r ON urm."URM_Role" = r."MRole_Id"
WHERE u."IsActive" = true 
AND r."IsActive" = true
UNION
-- Inherited roles from groups
SELECT DISTINCT 
    u."MUsr_Id" as user_id,
    u."MUsr_Username" as username,
    r."MRole_Id" as role_id,
    r."MRole_Name" as role_name,
    r."MRole_Code" as role_code,
    'inherited' as assignment_type,
    g."MGroup_Name" as source
FROM "Master_UserProfile" u
JOIN "User_Group_Mapping" ugm ON u."MUsr_Id" = ugm."UGM_User"
JOIN "Master_Group" g ON ugm."UGM_Group" = g."MGroup_Id"
JOIN "Group_Role_Mapping" grm ON g."MGroup_Id" = grm."GRM_Group"
JOIN "Master_Role" r ON grm."GRM_Role" = r."MRole_Id"
WHERE u."IsActive" = true 
AND g."IsActive" = true 
AND r."IsActive" = true;

-- Create default admin user if not exists
INSERT INTO "Master_UserProfile" (
    "MUsr_Username", 
    "MUsr_FirstName", 
    "MUsr_LastName", 
    "MUsr_Email", 
    "MUsr_Password",
    "IsActive",
    "CreatedBy",
    "CreatedAt"
) VALUES (
    'admin',
    'System',
    'Administrator', 
    'admin@planningsystem.com',
    '$2b$10$Q/hJChRWH2m/zQol0NisJeVNccL145sVAqymmZZtAuLO92ebSJwOW', -- password: admin123
    true,
    'system',
    CURRENT_TIMESTAMP
) ON CONFLICT ("MUsr_Username") DO NOTHING;

-- Assign Admin role to the default admin user
INSERT INTO "User_Role_Mapping" ("URM_User", "URM_Role", "URM_AssignedBy") 
SELECT 
    u."MUsr_Id",
    r."MRole_Id",
    'system'
FROM "Master_UserProfile" u, "Master_Role" r
WHERE u."MUsr_Username" = 'admin' 
AND r."MRole_Code" = 'ADMIN'
ON CONFLICT ("URM_User", "URM_Role") DO NOTHING;

-- Also add admin to System Administrators group
INSERT INTO "User_Group_Mapping" ("UGM_User", "UGM_Group", "UGM_AssignedBy") 
SELECT 
    u."MUsr_Id",
    g."MGroup_Id",
    'system'
FROM "Master_UserProfile" u, "Master_Group" g
WHERE u."MUsr_Username" = 'admin' 
AND g."MGroup_Code" = 'SYS_ADMINS'
ON CONFLICT ("UGM_User", "UGM_Group") DO NOTHING;

-- Comments for documentation
COMMENT ON TABLE "Master_Role" IS 'Stores all system roles that can be assigned to users or groups';
COMMENT ON TABLE "Master_Group" IS 'Stores user groups that can contain multiple users and have roles assigned';
COMMENT ON TABLE "User_Role_Mapping" IS 'Direct role assignments to users';
COMMENT ON TABLE "User_Group_Mapping" IS 'User memberships in groups';
COMMENT ON TABLE "Group_Role_Mapping" IS 'Role assignments to groups (inherited by group members)';
COMMENT ON VIEW "User_Effective_Roles" IS 'View showing all effective roles for users (direct + inherited from groups)'; 