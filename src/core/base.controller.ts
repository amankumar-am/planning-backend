// src/core/base.controller.ts

import { Request, Response } from 'express';
import { ObjectLiteral } from 'typeorm';
import { BaseService } from './base.service';
import { SchemaConfig } from '../api/models/base.dto';
import { BaseQueryDto } from './base.type';
import {
    sendListResponse,
    sendEntityResponse,
    sendNotFoundResponse,
    sendErrorResponse,
    sendNoContentResponse,
} from './response.util';

export abstract class BaseController<T extends ObjectLiteral> {
    constructor(
        protected service: BaseService<T>,
        protected schema: SchemaConfig,
        protected relations: string[] = [],
        protected searchableFields: string[] = []
    ) { }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const entities = await this.service.getAll();
            sendListResponse(res, this.schema, entities);
        } catch (error) {
            sendErrorResponse(res, 'Error fetching data', 500);
        }
    }

    async getAllWithQuery(req: Request, res: Response): Promise<void> {
        try {
            const query = this.parseQueryParams(req.query);

            // Validate filters before proceeding
            if (query.filters && !this.validateFilters(query.filters)) {
                return sendErrorResponse(res, 'Invalid filter parameters. Please check your filter structure.', 400);
            }

            const result = await this.service.findWithQuery(query, this.relations, this.searchableFields);
            res.json({
                success: true,
                message: 'Data fetched successfully',
                data: result.data,
                pagination: result.pagination
            });
        } catch (error: any) {
            console.error('Query error:', error);
            sendErrorResponse(res, `Error fetching data: ${error.message}`, 500);
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

    async validateQuery(req: Request, res: Response): Promise<void> {
        try {
            const query = this.parseQueryParams(req.query);

            const validation = {
                parsed: query,
                isValid: true,
                errors: [] as string[]
            };

            // Validate filters
            if (query.filters && query.filters.length > 0) {
                const filterValidation = this.validateFilters(query.filters);
                if (!filterValidation) {
                    validation.isValid = false;
                    validation.errors.push('Invalid filter structure');

                    // Check each filter individually for detailed errors
                    query.filters.forEach((filter, index) => {
                        if (!filter || typeof filter !== 'object') {
                            validation.errors.push(`Filter ${index}: Not an object`);
                        } else {
                            if (!filter.field || typeof filter.field !== 'string') {
                                validation.errors.push(`Filter ${index}: Invalid field name - ${filter.field}`);
                            }
                            if (/^\d+$/.test(filter.field)) {
                                validation.errors.push(`Filter ${index}: Field name cannot be numeric - ${filter.field}`);
                            }
                            if (!filter.operator) {
                                validation.errors.push(`Filter ${index}: Missing operator`);
                            }
                            if (typeof filter.value === 'object' && !Array.isArray(filter.value) && filter.operator !== 'isNull' && filter.operator !== 'isNotNull') {
                                validation.errors.push(`Filter ${index}: Value cannot be an object - ${JSON.stringify(filter.value)}`);
                            }
                        }
                    });
                }
            }

            res.json(validation);
        } catch (error: any) {
            res.status(400).json({
                isValid: false,
                error: error.message,
                suggestion: 'Check your query parameter format'
            });
        }
    }

    private parseQueryParams(query: any): BaseQueryDto {
        const parsedQuery: BaseQueryDto = {};

        // Parse pagination
        if (query.page) parsedQuery.page = parseInt(query.page) || 1;
        if (query.limit) parsedQuery.limit = parseInt(query.limit) || 10;

        // Parse sorting
        if (query.sortBy) parsedQuery.sortBy = query.sortBy;
        if (query.sortOrder) parsedQuery.sortOrder = query.sortOrder;

        // Parse search
        if (query.search) parsedQuery.search = query.search;

        // Parse filters with better error handling
        if (query.filters) {
            try {
                const filters = typeof query.filters === 'string'
                    ? JSON.parse(query.filters)
                    : query.filters;

                // Ensure filters is an array
                parsedQuery.filters = Array.isArray(filters) ? filters : [];
            } catch (error) {
                console.error('Error parsing filters:', error);
                parsedQuery.filters = [];
            }
        }

        return parsedQuery;
    }

    private validateFilters(filters: any[]): boolean {
        try {
            return filters.every(filter => {
                // Check if filter has required properties
                if (!filter || typeof filter !== 'object') {
                    return false;
                }

                // Check if field is a string and not empty/numeric only
                if (!filter.field || typeof filter.field !== 'string' || filter.field.trim() === '' || /^\d+$/.test(filter.field)) {
                    return false;
                }

                // Check if operator is valid
                const validOperators = ['eq', 'ne', 'like', 'in', 'gte', 'lte', 'isNull', 'isNotNull'];
                if (!filter.operator || !validOperators.includes(filter.operator)) {
                    return false;
                }

                // For operators that need values, check if value exists and is not an object (except for arrays in 'in' operator)
                if (['eq', 'ne', 'like', 'gte', 'lte'].includes(filter.operator)) {
                    if (filter.value === undefined || filter.value === null) {
                        return false;
                    }
                    // Value should not be an object (except for arrays)
                    if (typeof filter.value === 'object' && !Array.isArray(filter.value)) {
                        return false;
                    }
                }

                // For 'in' operator, value should be an array
                if (filter.operator === 'in' && !Array.isArray(filter.value)) {
                    return false;
                }

                return true;
            });
        } catch (error) {
            return false;
        }
    }
}