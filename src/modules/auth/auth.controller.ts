// src/modules/auth/auth.controller.ts

import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { UserEntity } from './user.entity';
import { BaseController } from '../../core/base.controller';
import { UserSchema } from '../../api/models/schemas/user.schema';
import { sendErrorResponse, sendListResponse } from '../../core/response.util';

export class AuthController extends BaseController<UserEntity> {
    constructor(private readonly authService: AuthService) {
        super(
            authService,
            UserSchema,
            ['department', 'office', 'designation', 'employmentType', 'officerClass'], // relations
            ['username', 'emailId', 'firstName', 'lastName'] // searchable fields
        );
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body;
            const result = await this.authService.login(email, password);
            res.json(result);
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

    async list(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.authService.findAllWithRelations();
            const mappedUsers = users.map(user => ({
                ...user,
                department: user.department || null,
                office: user.office || null,
                designation: user.designation || null,
                employmentType: user.employmentType || null,
                officerClass: user.officerClass || null,
            }));
            sendListResponse(res, this.schema, users);
        } catch (error: any) {
            sendErrorResponse(res, error.message || 'Error fetching Employment Types', 400);
        }
    }

    // New enhanced list method with filtering and sorting
    async listWithQuery(req: Request, res: Response): Promise<void> {
        await this.getAllWithQuery(req, res);
    }
}
