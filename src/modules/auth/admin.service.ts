import { AppDataSource } from '../../config/database';
import { UserRepository } from './user.repository';
import { PermissionService } from './permission.service';
import bcrypt from 'bcrypt';

export class AdminService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly permissionService: PermissionService
    ) { }

    async getAllUsersWithRoles() {
        const query = `
            SELECT 
                u."MUsr_Id" as id,
                u."MUsr_Username" as username,
                u."MUsr_FirstName" as firstName,
                u."MUsr_LastName" as lastName,
                u."MUsr_EmailId" as email,
                u."IsActive" as isActive,
                u."MUsr_LastLogin" as lastLogin,
                u."CreatedAt" as createdAt,
                CONCAT(COALESCE(u."MUsr_FirstName", ''), ' ', COALESCE(u."MUsr_LastName", '')) as name
            FROM "Master_UserProfile" u
            ORDER BY u."MUsr_Username"
        `;

        const users = await AppDataSource.query(query);

        // Get roles for each user
        const usersWithRoles = await Promise.all(
            users.map(async (user: any) => {
                const roles = await this.permissionService.getUserEffectiveRoles(user.id);
                return {
                    ...user,
                    name: user.name.trim() || user.username,
                    roles: roles.map(role => ({
                        roleId: role.roleId,
                        roleName: role.roleName,
                        roleCode: role.roleCode,
                        assignmentType: role.assignmentType,
                        source: role.source
                    }))
                };
            })
        );

        return usersWithRoles;
    }

    async assignRolesToUser(userId: number, roleCodes: string[]) {
        for (const roleCode of roleCodes) {
            const query = `
                INSERT INTO "User_Role_Mapping" ("URM_User", "URM_Role", "URM_AssignedBy")
                SELECT $1, r."MRole_Id", 'admin'
                FROM "Master_Role" r
                WHERE r."MRole_Code" = $2
                ON CONFLICT ("URM_User", "URM_Role") DO NOTHING
            `;
            await AppDataSource.query(query, [userId, roleCode]);
        }
    }

    async removeRolesFromUser(userId: number, roleCodes: string[]) {
        for (const roleCode of roleCodes) {
            const query = `
                DELETE FROM "User_Role_Mapping" 
                WHERE "URM_User" = $1 
                AND "URM_Role" = (
                    SELECT "MRole_Id" FROM "Master_Role" WHERE "MRole_Code" = $2
                )
            `;
            await AppDataSource.query(query, [userId, roleCode]);
        }
    }

    async toggleUserStatus(userId: number, isActive: boolean) {
        const query = `
            UPDATE "Master_UserProfile" 
            SET "IsActive" = $1, "ModifiedAt" = CURRENT_TIMESTAMP, "ModifiedBy" = 'admin'
            WHERE "MUsr_Id" = $2
        `;
        await AppDataSource.query(query, [isActive, userId]);

        // Return updated user
        const userQuery = `
            SELECT "MUsr_Id" as id, "MUsr_Username" as username, 
                   "MUsr_FirstName" as firstName, "MUsr_LastName" as lastName,
                   "MUsr_EmailId" as email, "IsActive" as isActive
            FROM "Master_UserProfile" 
            WHERE "MUsr_Id" = $1
        `;
        const result = await AppDataSource.query(userQuery, [userId]);
        return result[0];
    }

    async createUser(userData: any) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const query = `
            INSERT INTO "Master_UserProfile" (
                "MUsr_Username", "MUsr_FirstName", "MUsr_LastName", 
                "MUsr_EmailId", "MUsr_Password", "IsActive", 
                "CreatedBy", "CreatedAt"
            ) VALUES ($1, $2, $3, $4, $5, $6, 'admin', CURRENT_TIMESTAMP)
            RETURNING "MUsr_Id" as id, "MUsr_Username" as username, 
                      "MUsr_FirstName" as firstName, "MUsr_LastName" as lastName,
                      "MUsr_EmailId" as email, "IsActive" as isActive
        `;

        const result = await AppDataSource.query(query, [
            userData.username,
            userData.firstName,
            userData.lastName,
            userData.email,
            hashedPassword,
            userData.isActive
        ]);

        return result[0];
    }

    async deleteUser(userId: number) {
        const query = `DELETE FROM "Master_UserProfile" WHERE "MUsr_Id" = $1`;
        await AppDataSource.query(query, [userId]);
    }

    async resetUserPassword(userId: number, temporaryPassword: string) {
        const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

        const query = `
            UPDATE "Master_UserProfile" 
            SET "MUsr_Password" = $1, 
                "MUsr_PasswordChangedAt" = CURRENT_TIMESTAMP,
                "ModifiedAt" = CURRENT_TIMESTAMP,
                "ModifiedBy" = 'admin'
            WHERE "MUsr_Id" = $2
        `;
        await AppDataSource.query(query, [hashedPassword, userId]);
    }

    async getUserById(userId: number) {
        const query = `
            SELECT "MUsr_Id" as id, "MUsr_Username" as username, 
                   "MUsr_FirstName" as firstName, "MUsr_LastName" as lastName,
                   "MUsr_EmailId" as email, "IsActive" as isActive
            FROM "Master_UserProfile" 
            WHERE "MUsr_Id" = $1
        `;
        const result = await AppDataSource.query(query, [userId]);
        return result[0] || null;
    }

    async checkEmailExists(email: string, excludeUserId?: number) {
        let query = `SELECT COUNT(*) as count FROM "Master_UserProfile" WHERE "MUsr_EmailId" = $1`;
        const params = [email];

        if (excludeUserId) {
            query += ` AND "MUsr_Id" != $2`;
            params.push(excludeUserId.toString());
        }

        const result = await AppDataSource.query(query, params);
        return parseInt(result[0].count) > 0;
    }
} 