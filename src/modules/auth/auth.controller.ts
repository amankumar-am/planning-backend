// src/modules/auth/auth.controller.ts

import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { UserEntity } from './user.entity';
import { BaseController } from '../../core/base.controller';
import { UserSchema } from '../../api/models/schemas/user.schema';
import { sendErrorResponse, sendListResponse, sendEntityResponse } from '../../core/response.util';
import { PermissionService } from './permission.service';

export class AuthController extends BaseController<UserEntity> {
    private permissionService: PermissionService;

    constructor(private readonly authService: AuthService) {
        super(
            authService,
            UserSchema,
            ['department', 'office', 'designation', 'employmentType', 'officerClass', 'roles', 'groups'], // relations
            ['username', 'email', 'firstName', 'lastName'] // searchable fields
        );
        this.permissionService = new PermissionService();
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body;
            const result = await this.authService.login(email, password);

            // Get user's effective roles after login
            const userRoles = await this.permissionService.getUserEffectiveRoles(result.user.id);

            res.json({
                ...result,
                user: {
                    ...result.user,
                    roles: userRoles
                }
            });
        } catch (error) {
            next(error);
        }
    }

    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, email, password } = req.body;
            const result = await this.authService.register(name, email, password);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    // NEW: Get current user with roles and permissions
    async me(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({ error: 'User not authenticated' });
                return;
            }

            const user = await this.authService.getById(userId, this.relations);
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }

            // Get effective roles
            const effectiveRoles = await this.permissionService.getUserEffectiveRoles(userId);

            // Get user's groups with roles
            const userGroups = await this.permissionService.getUserGroupsWithRoles(userId);

            const userWithPermissions = {
                ...user,
                password: undefined, // Remove password from response
                effectiveRoles,
                groups: userGroups
            };

            sendEntityResponse(res, userWithPermissions);
        } catch (error) {
            next(error);
        }
    }

    // NEW: Check if user has specific permission
    async checkPermission(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.id;
            const { roleCode, roleCodes } = req.body;

            if (!userId) {
                res.status(401).json({ error: 'User not authenticated' });
                return;
            }

            let hasPermission = false;

            if (roleCode) {
                hasPermission = await this.permissionService.userHasRole(userId, roleCode);
            } else if (roleCodes && Array.isArray(roleCodes)) {
                hasPermission = await this.permissionService.userHasAnyRole(userId, roleCodes);
            }

            res.json({ hasPermission, userId, roleCode, roleCodes });
        } catch (error) {
            next(error);
        }
    }

    // NEW: Get user's effective roles
    async getEffectiveRoles(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = parseInt(req.params.userId) || req.user?.id;

            if (!userId) {
                sendErrorResponse(res, 'User ID required', 400);
                return;
            }

            const effectiveRoles = await this.permissionService.getUserEffectiveRoles(userId);
            res.json({ userId, effectiveRoles });
        } catch (error) {
            next(error);
        }
    }

    async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { refreshToken } = req.body;
            const result = await this.authService.refreshToken(refreshToken);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email } = req.body;
            const result = await this.authService.forgotPassword(email);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { token, newPassword } = req.body;
            const result = await this.authService.resetPassword(token, newPassword);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    // Enhanced list method with roles
    async list(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.service.findWithQuery({}, this.relations, this.searchableFields);
            sendListResponse(res, this.schema, users.data);
        } catch (error: any) {
            sendErrorResponse(res, error.message || 'Error fetching users', 400);
        }
    }

    // New enhanced list method with filtering and sorting
    async listWithQuery(req: Request, res: Response): Promise<void> {
        await this.getAllWithQuery(req, res);
    }
}
