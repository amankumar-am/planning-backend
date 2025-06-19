// src/modules/group/group.controller.ts

import { Request, Response } from 'express';
import { sendListResponse, sendErrorResponse } from '../../core/response.util';
import { groupSchema } from '../../api/models/schemas/group.schema';
import { BaseController } from '../../core/base.controller';
import { GroupEntity } from './group.entity';
import { GroupService } from './group.service';

export class GroupController extends BaseController<GroupEntity> {
    constructor(private readonly groupService: GroupService) {
        super(
            groupService,
            groupSchema,
            ['users', 'roles'], // relations
            ['name', 'code', 'description'] // searchable fields
        );
    }

    async list(req: Request, res: Response): Promise<void> {
        try {
            const items = await this.groupService.findAllWithRelations();
            sendListResponse(res, this.schema, items);
        } catch (error: any) {
            sendErrorResponse(res, error.message || 'Error fetching groups', 400);
        }
    }

    async listWithQuery(req: Request, res: Response): Promise<void> {
        await this.getAllWithQuery(req, res);
    }

    async getByCode(req: Request, res: Response): Promise<void> {
        try {
            const code = req.params.code;
            if (!code) {
                throw new Error('Group code is required');
            }
            const group = await this.groupService.findByCode(code);
            if (!group) {
                throw new Error(`Group with code ${code} not found`);
            }
            sendListResponse(res, this.schema, [group]);
        } catch (error: any) {
            sendErrorResponse(res, error.message || 'Error fetching group', 400);
        }
    }

    async getByType(req: Request, res: Response): Promise<void> {
        try {
            const type = req.params.type;
            if (!type) {
                throw new Error('Group type is required');
            }
            const groups = await this.groupService.findByType(type);
            sendListResponse(res, this.schema, groups);
        } catch (error: any) {
            sendErrorResponse(res, error.message || 'Error fetching groups', 400);
        }
    }

    async getByParentId(req: Request, res: Response): Promise<void> {
        try {
            const parentId = parseInt(req.params.parentId);
            if (isNaN(parentId)) {
                throw new Error('Invalid parent ID');
            }
            const groups = await this.groupService.findByParentId(parentId);
            sendListResponse(res, this.schema, groups);
        } catch (error: any) {
            sendErrorResponse(res, error.message || 'Error fetching child groups', 400);
        }
    }

    async getRootGroups(req: Request, res: Response): Promise<void> {
        try {
            const groups = await this.groupService.findRootGroups();
            sendListResponse(res, this.schema, groups);
        } catch (error: any) {
            sendErrorResponse(res, error.message || 'Error fetching root groups', 400);
        }
    }

    async getWithUsers(req: Request, res: Response): Promise<void> {
        try {
            const groupId = parseInt(req.params.id);
            if (isNaN(groupId)) {
                throw new Error('Invalid group ID');
            }
            const group = await this.groupService.findWithUsers(groupId);
            if (!group) {
                throw new Error(`Group with ID ${groupId} not found`);
            }
            sendListResponse(res, this.schema, [group]);
        } catch (error: any) {
            sendErrorResponse(res, error.message || 'Error fetching group with users', 400);
        }
    }

    async getWithRoles(req: Request, res: Response): Promise<void> {
        try {
            const groupId = parseInt(req.params.id);
            if (isNaN(groupId)) {
                throw new Error('Invalid group ID');
            }
            const group = await this.groupService.findWithRoles(groupId);
            if (!group) {
                throw new Error(`Group with ID ${groupId} not found`);
            }
            sendListResponse(res, this.schema, [group]);
        } catch (error: any) {
            sendErrorResponse(res, error.message || 'Error fetching group with roles', 400);
        }
    }
} 