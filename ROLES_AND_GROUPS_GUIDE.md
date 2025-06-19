# Roles and Groups System Guide

## 🎯 **Overview**

A comprehensive roles and groups system similar to ServiceNow, providing flexible permission management with direct role assignments and group-based inheritance.

## 📊 **Database Structure**

### **Core Tables:**

- `Master_Role` - Individual roles (Admin, User Manager, etc.)
- `Master_Group` - User groups (IT Department, Finance, etc.)
- `Master_UserProfile` - Existing users table (enhanced with role/group relations)

### **Junction Tables:**

- `User_Role_Mapping` - Direct role assignments to users
- `User_Group_Mapping` - User memberships in groups
- `Group_Role_Mapping` - Role assignments to groups (inherited by members)

### **Special View:**

- `User_Effective_Roles` - Shows all effective roles for users (direct + inherited)

## 🔗 **API Endpoints**

### **Roles (`/api/roles`)**

```
GET    /api/roles                    # List all roles with relations
GET    /api/roles/query             # Advanced query with filters
GET    /api/roles/:id               # Get role by ID
GET    /api/roles/code/:code        # Get role by code
GET    /api/roles/type/:type        # Get roles by type
GET    /api/roles/:id/users         # Get role with assigned users
GET    /api/roles/:id/groups        # Get role with assigned groups
POST   /api/roles                   # Create new role
PUT    /api/roles/:id               # Update role
DELETE /api/roles/:id               # Delete role
```

### **Groups (`/api/groups`)**

```
GET    /api/groups                  # List all groups with relations
GET    /api/groups/query            # Advanced query with filters
GET    /api/groups/:id              # Get group by ID
GET    /api/groups/roots            # Get root groups (no parent)
GET    /api/groups/code/:code       # Get group by code
GET    /api/groups/type/:type       # Get groups by type
GET    /api/groups/parent/:parentId # Get child groups
GET    /api/groups/:id/users        # Get group with members
GET    /api/groups/:id/roles        # Get group with assigned roles
POST   /api/groups                  # Create new group
PUT    /api/groups/:id              # Update group
DELETE /api/groups/:id              # Delete group
```

## 🛠 **Permission Service Usage**

### **Basic Role Assignment**

```typescript
import { PermissionService } from "./src/modules/auth/permission.service";

const permissionService = new PermissionService();

// Assign role directly to user
await permissionService.assignRoleToUser({
  userId: 1,
  roleId: 2,
  assignedBy: "admin",
});

// Add user to group (inherits all group roles)
await permissionService.addUserToGroup({
  userId: 1,
  groupId: 3,
  assignedBy: "admin",
});

// Assign role to group (inherited by all members)
await permissionService.assignRoleToGroup({
  groupId: 3,
  roleId: 2,
  assignedBy: "admin",
});
```

### **Permission Checking**

```typescript
// Check if user has specific role
const hasAdmin = await permissionService.userHasRole(1, "ADMIN");

// Check if user has any of multiple roles
const hasAnyRole = await permissionService.userHasAnyRole(1, [
  "ADMIN",
  "USER_MGR",
]);

// Get all effective roles for user
const userRoles = await permissionService.getUserEffectiveRoles(1);
```

### **Advanced Queries**

```typescript
// Get all users with specific role
const adminUsers = await permissionService.getUsersWithRole("ADMIN");

// Get user's groups and their roles
const userGroups = await permissionService.getUserGroupsWithRoles(1);
```

## 🏗 **Entity Structure**

### **Role Entity Features:**

- Name, code, description, type, priority
- Many-to-many relations with users and groups
- Audit fields (created/modified by/at)

### **Group Entity Features:**

- Name, code, description, type
- Parent-child hierarchy support
- Many-to-many relations with users and roles
- Audit fields

### **User Entity Enhancements:**

- Added many-to-many relations to roles and groups
- Maintains existing user profile structure

## 📝 **Sample Data Included**

### **Roles:**

- Admin (system, priority 100)
- User Manager (functional, priority 80)
- Department Head (functional, priority 70)
- Finance Manager (functional, priority 60)
- HR Manager (functional, priority 60)
- Auditor (functional, priority 50)
- Data Entry (functional, priority 30)
- View Only (functional, priority 10)

### **Groups:**

- IT Department
- Finance Department
- HR Department
- Management
- Data Analysts
- System Administrators

## 🔧 **Key Features**

### **Flexible Assignment:**

- ✅ Direct role assignment to users
- ✅ Group membership with role inheritance
- ✅ Role assignment to groups (inherited by members)
- ✅ Optional expiration dates for temporary assignments

### **Hierarchy Support:**

- ✅ Group parent-child relationships
- ✅ Role priority levels
- ✅ Multiple assignment types (system, custom, functional)

### **Performance Optimized:**

- ✅ Database indexes for fast lookups
- ✅ Efficient SQL view for effective roles
- ✅ Batch operations support

### **ServiceNow-like Experience:**

- ✅ Similar role/group inheritance model
- ✅ Audit trail for all assignments
- ✅ Flexible permission checking
- ✅ Support for temporary assignments

## 🚀 **Getting Started**

1. **Run the database setup:**

   ```bash
   # Execute database_setup.sql in your PostgreSQL database
   psql -d your_database -f database_setup.sql
   ```

2. **Test the APIs:**

   ```bash
   # Get all roles
   curl http://localhost:3000/api/roles

   # Get all groups
   curl http://localhost:3000/api/groups

   # Get effective roles for user ID 1
   # (Use PermissionService.getUserEffectiveRoles(1))
   ```

3. **Create your first assignment:**

   ```typescript
   const permissionService = new PermissionService();

   // Add user to IT Department group
   await permissionService.addUserToGroup({
     userId: 1,
     groupId: 1, // IT Department
     assignedBy: "admin",
   });
   ```

## 🎓 **Best Practices**

### **Role Design:**

- Use clear, descriptive role codes (e.g., 'FINANCE_MGR', 'DATA_ENTRY')
- Set appropriate priority levels for role hierarchy
- Group similar roles by type (system, functional, custom)

### **Group Structure:**

- Create groups that match your organizational structure
- Use parent-child relationships for departmental hierarchy
- Assign roles to groups rather than individual users when possible

### **Permission Checking:**

- Always use the PermissionService for permission checks
- Cache user roles in application memory for performance
- Use role codes rather than role names for permission checks

## 🔍 **Troubleshooting**

### **Common Issues:**

- **Relations not loading**: Ensure you're using the `findAllWithRelations()` methods
- **Permissions not inheriting**: Check the `User_Effective_Roles` view
- **Duplicates in assignments**: The system prevents duplicate assignments automatically

### **Useful Queries:**

```sql
-- Check effective roles for a specific user
SELECT * FROM "User_Effective_Roles" WHERE user_id = 1;

-- Check all group memberships
SELECT u.username, g."MGroup_Name"
FROM "User_Group_Mapping" ugm
JOIN "Master_UserProfile" u ON ugm."UGM_User" = u."MUsr_Id"
JOIN "Master_Group" g ON ugm."UGM_Group" = g."MGroup_Id";
```

---

**Your roles and groups system is now ready to use!** 🎉
