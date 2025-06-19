import { Request, Response, NextFunction } from 'express';
import { AdminService } from './admin.service';
import { UserRepository } from './user.repository';
import { PermissionService } from './permission.service';
import { BadRequestError } from '../../core/errors';

export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
    }
}

export class AdminController {
    private adminService: AdminService;

    constructor(
        userRepository: UserRepository,
        permissionService: PermissionService
    ) {
        this.adminService = new AdminService(userRepository, permissionService);
    }

    // 1. GET /admin/all - Get all users with roles
    async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const users = await this.adminService.getAllUsersWithRoles();
            res.json(users);
        } catch (error) {
            next(error);
        }
    }

    // 2. POST /admin/{userId}/roles - Assign roles to user
    async assignRoles(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userId } = req.params;
            const { roles } = req.body;

            if (!roles || !Array.isArray(roles)) {
                throw new BadRequestError('Roles array is required');
            }

            const user = await this.adminService.getUserById(parseInt(userId));
            if (!user) {
                throw new NotFoundError(`User with ID ${userId} not found`);
            }

            await this.adminService.assignRolesToUser(parseInt(userId), roles);

            res.json({
                message: `Roles assigned successfully`,
                userId: parseInt(userId)
            });
        } catch (error) {
            next(error);
        }
    }

    // 3. DELETE /admin/{userId}/roles - Remove roles from user
    async removeRoles(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userId } = req.params;
            const { roles } = req.body;

            if (!roles || !Array.isArray(roles)) {
                throw new BadRequestError('Roles array is required');
            }

            const user = await this.adminService.getUserById(parseInt(userId));
            if (!user) {
                throw new NotFoundError(`User with ID ${userId} not found`);
            }

            await this.adminService.removeRolesFromUser(parseInt(userId), roles);

            res.json({
                message: `Roles removed successfully`,
                userId: parseInt(userId)
            });
        } catch (error) {
            next(error);
        }
    }

    // 4. PATCH /admin/{userId}/status - Toggle user status
    async toggleUserStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userId } = req.params;
            const { isActive } = req.body;

            if (typeof isActive !== 'boolean') {
                throw new BadRequestError('isActive must be a boolean value');
            }

            const user = await this.adminService.getUserById(parseInt(userId));
            if (!user) {
                throw new NotFoundError(`User with ID ${userId} not found`);
            }

            const updatedUser = await this.adminService.toggleUserStatus(parseInt(userId), isActive);

            res.json({
                ...updatedUser,
                name: `${updatedUser.firstName || ''} ${updatedUser.lastName || ''}`.trim() || updatedUser.username,
                message: `User ${isActive ? 'activated' : 'deactivated'} successfully`
            });
        } catch (error) {
            next(error);
        }
    }

    // 5. POST /admin/create - Create new user
    async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, email, password, roles = [], isActive = true, username, firstName, lastName } = req.body;

            if (!email || !password) {
                throw new BadRequestError('Email and password are required');
            }

            // Check if user already exists
            const emailExists = await this.adminService.checkEmailExists(email);
            if (emailExists) {
                throw new BadRequestError('User with this email already exists');
            }

            // Create user data
            const userData = {
                username: username || email.split('@')[0],
                firstName: firstName || name?.split(' ')[0],
                lastName: lastName || name?.split(' ').slice(1).join(' '),
                email,
                password,
                isActive
            };

            const user = await this.adminService.createUser(userData);

            // Assign roles if provided
            if (roles.length > 0) {
                await this.adminService.assignRolesToUser(user.id, roles);
            }

            res.status(201).json({
                ...user,
                name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username,
                message: 'User created successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    // 6. DELETE /admin/{userId} - Delete user
    async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userId } = req.params;

            const user = await this.adminService.getUserById(parseInt(userId));
            if (!user) {
                throw new NotFoundError(`User with ID ${userId} not found`);
            }

            await this.adminService.deleteUser(parseInt(userId));

            res.json({
                message: `User ${user.username} deleted successfully`
            });
        } catch (error) {
            next(error);
        }
    }

    // 7. POST /admin/{userId}/reset-password - Reset user password
    async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userId } = req.params;

            const user = await this.adminService.getUserById(parseInt(userId));
            if (!user) {
                throw new NotFoundError(`User with ID ${userId} not found`);
            }

            // Generate temporary password
            const temporaryPassword = this.generateTemporaryPassword();
            await this.adminService.resetUserPassword(parseInt(userId), temporaryPassword);

            res.json({
                message: 'Password reset successfully',
                temporaryPassword,
                username: user.username,
                email: user.email
            });
        } catch (error) {
            next(error);
        }
    }

    private generateTemporaryPassword(): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
} 