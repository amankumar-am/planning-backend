// src/core/base.type.ts

import { IsString, IsBoolean, IsDate, IsOptional, IsEnum, IsArray, IsNumber, Min } from 'class-validator';

export class BaseDtoFields {
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @IsString()
    @IsOptional()
    createdBy?: string;

    @IsDate()
    @IsOptional()
    createdAt?: Date;

    @IsString()
    @IsOptional()
    modifiedBy?: string;

    @IsDate()
    @IsOptional()
    modifiedAt?: Date | null;
}

export enum SortOrder {
    ASC = 'ASC',
    DESC = 'DESC'
}

export interface FilterOptions {
    field: string;
    operator: 'eq' | 'like' | 'in' | 'gte' | 'lte' | 'ne' | 'isNull' | 'isNotNull';
    value: any;
}

export interface SortOptions {
    field: string;
    order: SortOrder;
}

export class BaseQueryDto {
    @IsOptional()
    page?: number = 1;

    @IsOptional()
    limit?: number = 10;

    @IsOptional()
    @IsString()
    sortBy?: string;

    @IsOptional()
    @IsEnum(SortOrder)
    sortOrder?: SortOrder = SortOrder.ASC;

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    filters?: FilterOptions[];
}

export interface PaginatedResult<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}