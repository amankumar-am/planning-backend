// src/core/base.controller.ts

import { Request, Response } from 'express';
import { ObjectLiteral } from 'typeorm';
import { BaseService } from './base.service';
import { SchemaConfig } from '../api/models/base.dto';
import {
    sendListResponse,
    sendEntityResponse,
    sendNotFoundResponse,
    sendErrorResponse,
    sendNoContentResponse,
} from './response.util';

export abstract class BaseController<T extends ObjectLiteral> {
    constructor(protected service: BaseService<T>, protected schema: SchemaConfig) { }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const entities = await this.service.getAll();
            sendListResponse(res, this.schema, entities);
        } catch (error) {
            sendErrorResponse(res, 'Error fetching data', 500);
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const entity = await this.service.getById(id);
            if (entity) {
                sendEntityResponse(res, entity);
            } else {
                sendNotFoundResponse(res, this.schema.entity);
            }
        } catch (error) {
            sendErrorResponse(res, 'Error fetching data', 500);
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const entity = await this.service.create(req.body);
            sendEntityResponse(res, entity, 201);
        } catch (error: any) {
            sendErrorResponse(res, error.message || 'Error creating data', 400);
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const entity = await this.service.update(id, req.body);
            if (entity) {
                sendEntityResponse(res, entity);
            } else {
                sendNotFoundResponse(res, this.schema.entity);
            }
        } catch (error: any) {
            sendErrorResponse(res, error.message || 'Error updating data', 400);
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            await this.service.delete(id);
            sendNoContentResponse(res);
        } catch (error) {
            sendErrorResponse(res, 'Error deleting data', 400);
        }
    }
}