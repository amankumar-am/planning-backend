# 🔑 Admin Login Guide

## Default Admin Credentials

**Username:** `admin` or **Email:** `admin@admin.com`  
**Password:** `admin123`

## How to Login

### 1. Using API Directly (for testing)

```bash
# Login with username
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin",
    "password": "admin123"
  }'

# OR Login with email
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@admin.com",
    "password": "admin123"
  }'
```

### 2. Expected Response

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "admin",
    "firstName": "System",
    "lastName": "Administrator",
    "email": "admin@planningsystem.com",
    "roles": [
      {
        "role_id": 1,
        "role_name": "Admin",
        "role_code": "ADMIN",
        "assignment_type": "direct",
        "source": "Direct Assignment"
      }
    ]
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Using Token for Protected Routes

```bash
# Get current user info
curl -X GET http://localhost:3000/api/users/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"

# Check permissions
curl -X POST http://localhost:3000/api/users/check-permission \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "role": "ADMIN"
  }'
```

## Setup Instructions

### 1. First Time Setup

If you haven't run the database setup yet:

```bash
# Run the database setup script
psql -d your_database_name -f database_setup.sql
```

### 2. Start Your Backend Server

```bash
npm install
npm run dev
# OR
npm start
```

### 3. Test the Login

```bash
# Test login
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@planningsystem.com",
    "password": "admin123"
  }'
```

## Admin Capabilities

With the admin account, you can:

- ✅ **Full System Access**: Access all API endpoints
- ✅ **User Management**: Create, edit, delete users
- ✅ **Role Management**: Assign/remove roles from users
- ✅ **Group Management**: Manage user groups and group memberships
- ✅ **Data Management**: Full CRUD access to all data modules
- ✅ **System Configuration**: Access to all system settings

## Security Notes

⚠️ **IMPORTANT**: Change the default password immediately after first login!

```bash
# Change password (implement this endpoint in your auth controller)
curl -X PUT http://localhost:3000/api/users/change-password \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "currentPassword": "admin123",
    "newPassword": "your_new_secure_password"
  }'
```

## Troubleshooting

### Login Issues

1. **"User not found"**: Make sure you ran the database setup script
2. **"Invalid password"**: Double-check you're using `admin123`
3. **"Server error"**: Check if your database connection is working
4. **"Token expired"**: Get a new token by logging in again

### Check Admin User Exists

```sql
-- Check if admin user exists
SELECT "MUsr_Id", "MUsr_Username", "MUsr_Email", "IsActive"
FROM "Master_UserProfile"
WHERE "MUsr_Username" = 'admin';

-- Check admin roles
SELECT * FROM "User_Effective_Roles" WHERE username = 'admin';
```

### Create Additional Admin Users

```sql
-- Create another admin user
INSERT INTO "Master_UserProfile" (
    "MUsr_Username", "MUsr_FirstName", "MUsr_LastName",
    "MUsr_Email", "MUsr_Password", "IsActive", "CreatedBy"
) VALUES (
    'yourusername',
    'Your',
    'Name',
    'your.email@domain.com',
    '$2b$10$...',  -- Use bcrypt to hash your password
    true,
    'admin'
);

-- Assign admin role
INSERT INTO "User_Role_Mapping" ("URM_User", "URM_Role", "URM_AssignedBy")
SELECT u."MUsr_Id", r."MRole_Id", 'admin'
FROM "Master_UserProfile" u, "Master_Role" r
WHERE u."MUsr_Username" = 'yourusername' AND r."MRole_Code" = 'ADMIN';
```

---

**Your admin account is ready to use!** 🚀
