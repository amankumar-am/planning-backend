import { AppDataSource } from '../../config/database';
import { UserEntity } from './user.entity';
import { RoleEntity } from '../role/role.entity';
import { GroupEntity } from '../group/group.entity';

export interface UserEffectiveRole {
    userId: number;
    username: string;
    roleId: number;
    roleName: string;
    roleCode: string;
    assignmentType: 'direct' | 'inherited';
    source: string;
}

export interface RoleAssignmentDto {
    userId: number;
    roleId: number;
    assignedBy?: string;
    expiresAt?: Date;
}

export interface GroupMembershipDto {
    userId: number;
    groupId: number;
    assignedBy?: string;
    expiresAt?: Date;
}

export interface GroupRoleAssignmentDto {
    groupId: number;
    roleId: number;
    assignedBy?: string;
    expiresAt?: Date;
}

export class PermissionService {

    /**
     * Get all effective roles for a user (direct + inherited from groups)
     */
    async getUserEffectiveRoles(userId: number): Promise<UserEffectiveRole[]> {
        const query = `
      SELECT * FROM "User_Effective_Roles" 
      WHERE user_id = $1 
      ORDER BY role_name
    `;

        const result = await AppDataSource.query(query, [userId]);
        return result.map((row: any) => ({
            userId: row.user_id,
            username: row.username,
            roleId: row.role_id,
            roleName: row.role_name,
            roleCode: row.role_code,
            assignmentType: row.assignment_type,
            source: row.source
        }));
    }

    /**
     * Assign a role directly to a user
     */
    async assignRoleToUser(assignment: RoleAssignmentDto): Promise<void> {
        const query = `
      INSERT INTO "User_Role_Mapping" ("URM_User", "URM_Role", "URM_AssignedBy", "URM_ExpiresAt")
      VALUES ($1, $2, $3, $4)
      ON CONFLICT ("URM_User", "URM_Role") DO NOTHING
    `;

        await AppDataSource.query(query, [
            assignment.userId,
            assignment.roleId,
            assignment.assignedBy || 'system',
            assignment.expiresAt || null
        ]);
    }

    /**
     * Remove a role from a user
     */
    async removeRoleFromUser(userId: number, roleId: number): Promise<void> {
        const query = `
      DELETE FROM "User_Role_Mapping" 
      WHERE "URM_User" = $1 AND "URM_Role" = $2
    `;

        await AppDataSource.query(query, [userId, roleId]);
    }

    /**
     * Add a user to a group
     */
    async addUserToGroup(membership: GroupMembershipDto): Promise<void> {
        const query = `
      INSERT INTO "User_Group_Mapping" ("UGM_User", "UGM_Group", "UGM_AssignedBy", "UGM_ExpiresAt")
      VALUES ($1, $2, $3, $4)
      ON CONFLICT ("UGM_User", "UGM_Group") DO NOTHING
    `;

        await AppDataSource.query(query, [
            membership.userId,
            membership.groupId,
            membership.assignedBy || 'system',
            membership.expiresAt || null
        ]);
    }

    /**
     * Remove a user from a group
     */
    async removeUserFromGroup(userId: number, groupId: number): Promise<void> {
        const query = `
      DELETE FROM "User_Group_Mapping" 
      WHERE "UGM_User" = $1 AND "UGM_Group" = $2
    `;

        await AppDataSource.query(query, [userId, groupId]);
    }

    /**
     * Assign a role to a group (inherited by all group members)
     */
    async assignRoleToGroup(assignment: GroupRoleAssignmentDto): Promise<void> {
        const query = `
      INSERT INTO "Group_Role_Mapping" ("GRM_Group", "GRM_Role", "GRM_AssignedBy", "GRM_ExpiresAt")
      VALUES ($1, $2, $3, $4)
      ON CONFLICT ("GRM_Group", "GRM_Role") DO NOTHING
    `;

        await AppDataSource.query(query, [
            assignment.groupId,
            assignment.roleId,
            assignment.assignedBy || 'system',
            assignment.expiresAt || null
        ]);
    }

    /**
     * Remove a role from a group
     */
    async removeRoleFromGroup(groupId: number, roleId: number): Promise<void> {
        const query = `
      DELETE FROM "Group_Role_Mapping" 
      WHERE "GRM_Group" = $1 AND "GRM_Role" = $2
    `;

        await AppDataSource.query(query, [groupId, roleId]);
    }

    /**
     * Check if a user has a specific role (direct or inherited)
     */
    async userHasRole(userId: number, roleCode: string): Promise<boolean> {
        const query = `
      SELECT COUNT(*) as count FROM "User_Effective_Roles" 
      WHERE user_id = $1 AND role_code = $2
    `;

        const result = await AppDataSource.query(query, [userId, roleCode]);
        return parseInt(result[0].count) > 0;
    }

    /**
     * Check if a user has any of the specified roles
     */
    async userHasAnyRole(userId: number, roleCodes: string[]): Promise<boolean> {
        const query = `
      SELECT COUNT(*) as count FROM "User_Effective_Roles" 
      WHERE user_id = $1 AND role_code = ANY($2)
    `;

        const result = await AppDataSource.query(query, [userId, roleCodes]);
        return parseInt(result[0].count) > 0;
    }

    /**
     * Get all users with a specific role
     */
    async getUsersWithRole(roleCode: string): Promise<UserEffectiveRole[]> {
        const query = `
      SELECT * FROM "User_Effective_Roles" 
      WHERE role_code = $1 
      ORDER BY username
    `;

        const result = await AppDataSource.query(query, [roleCode]);
        return result.map((row: any) => ({
            userId: row.user_id,
            username: row.username,
            roleId: row.role_id,
            roleName: row.role_name,
            roleCode: row.role_code,
            assignmentType: row.assignment_type,
            source: row.source
        }));
    }

    /**
     * Get user's groups with their roles
     */
    async getUserGroupsWithRoles(userId: number): Promise<any[]> {
        const query = `
      SELECT DISTINCT 
        g."MGroup_Id" as group_id,
        g."MGroup_Name" as group_name,
        g."MGroup_Code" as group_code,
        g."MGroup_Type" as group_type,
        r."MRole_Id" as role_id,
        r."MRole_Name" as role_name,
        r."MRole_Code" as role_code
      FROM "Master_Group" g
      JOIN "User_Group_Mapping" ugm ON g."MGroup_Id" = ugm."UGM_Group"
      LEFT JOIN "Group_Role_Mapping" grm ON g."MGroup_Id" = grm."GRM_Group"
      LEFT JOIN "Master_Role" r ON grm."GRM_Role" = r."MRole_Id"
      WHERE ugm."UGM_User" = $1
      AND g."IsActive" = true
      ORDER BY g."MGroup_Name", r."MRole_Name"
    `;

        return await AppDataSource.query(query, [userId]);
    }
} 