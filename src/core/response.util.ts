// src/core/response.util.ts

import { Response } from 'express';
import { ObjectLiteral } from 'typeorm';
import { SchemaConfig } from '../api/models/base.dto';

// Interface for standardized error response
interface ErrorResponse {
    message: string;
    error?: any;
}

// Interface for standardized list response
interface ListResponse<T> {
    schema: SchemaConfig['columns'];
    data: T[];
    defaultVisibleColumns: SchemaConfig['defaultVisibleColumns'];
}

// Format a list response (e.g., for GET /entities)
export function sendListResponse<T extends ObjectLiteral>(
    res: Response,
    schema: SchemaConfig,
    data: T[]
): void {
    const response: ListResponse<T> = {
        schema: schema.columns,
        data,
        defaultVisibleColumns: schema.defaultVisibleColumns,
    };
    res.status(200).json(response);
}

// Format a single entity response (e.g., for GET /entities/:id, POST /entities, PUT /entities/:id)
export function sendEntityResponse<T extends ObjectLiteral>(
    res: Response,
    data: T,
    status: 200 | 201 = 200
): void {
    res.status(status).json(data);
}

// Format a not found response (e.g., for GET /entities/:id or PUT /entities/:id when entity doesn't exist)
export function sendNotFoundResponse(res: Response, entityName: string): void {
    const response: ErrorResponse = { message: `${entityName} not found` };
    res.status(404).json(response);
}

// Format an error response (e.g., for validation errors, server errors)
export function sendErrorResponse(
    res: Response,
    message: string,
    status: 400 | 500 = 400,
    error?: any
): void {
    const response: ErrorResponse = { message, ...(error && { error }) };
    res.status(status).json(response);
}

// Format a success response with no content (e.g., for DELETE /entities/:id)
export function sendNoContentResponse(res: Response): void {
    res.status(204).end();
}