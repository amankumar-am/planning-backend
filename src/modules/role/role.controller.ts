// src/modules/role/role.controller.ts

import { Request, Response } from 'express';
import { sendListResponse, sendErrorResponse } from '../../core/response.util';
import { roleSchema } from '../../api/models/schemas/role.schema';
import { BaseController } from '../../core/base.controller';
import { RoleEntity } from './role.entity';
import { RoleService } from './role.service';

export class RoleController extends BaseController<RoleEntity> {
    constructor(private readonly roleService: RoleService) {
        super(
            roleService,
            roleSchema,
            ['users', 'groups'], // relations
            ['name', 'code', 'description'] // searchable fields
        );
    }

    async list(req: Request, res: Response): Promise<void> {
        try {
            const items = await this.roleService.findAllWithRelations();
            sendListResponse(res, this.schema, items);
        } catch (error: any) {
            sendErrorResponse(res, error.message || 'Error fetching roles', 400);
        }
    }

    async listWithQuery(req: Request, res: Response): Promise<void> {
        await this.getAllWithQuery(req, res);
    }

    async getByCode(req: Request, res: Response): Promise<void> {
        try {
            const code = req.params.code;
            if (!code) {
                throw new Error('Role code is required');
            }
            const role = await this.roleService.findByCode(code);
            if (!role) {
                throw new Error(`Role with code ${code} not found`);
            }
            sendListResponse(res, this.schema, [role]);
        } catch (error: any) {
            sendErrorResponse(res, error.message || 'Error fetching role', 400);
        }
    }

    async getByType(req: Request, res: Response): Promise<void> {
        try {
            const type = req.params.type;
            if (!type) {
                throw new Error('Role type is required');
            }
            const roles = await this.roleService.findByType(type);
            sendListResponse(res, this.schema, roles);
        } catch (error: any) {
            sendErrorResponse(res, error.message || 'Error fetching roles', 400);
        }
    }

    async getWithUsers(req: Request, res: Response): Promise<void> {
        try {
            const roleId = parseInt(req.params.id);
            if (isNaN(roleId)) {
                throw new Error('Invalid role ID');
            }
            const role = await this.roleService.findWithUsers(roleId);
            if (!role) {
                throw new Error(`Role with ID ${roleId} not found`);
            }
            sendListResponse(res, this.schema, [role]);
        } catch (error: any) {
            sendErrorResponse(res, error.message || 'Error fetching role with users', 400);
        }
    }

    async getWithGroups(req: Request, res: Response): Promise<void> {
        try {
            const roleId = parseInt(req.params.id);
            if (isNaN(roleId)) {
                throw new Error('Invalid role ID');
            }
            const role = await this.roleService.findWithGroups(roleId);
            if (!role) {
                throw new Error(`Role with ID ${roleId} not found`);
            }
            sendListResponse(res, this.schema, [role]);
        } catch (error: any) {
            sendErrorResponse(res, error.message || 'Error fetching role with groups', 400);
        }
    }
} 