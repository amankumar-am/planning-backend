// src/core/base.service.ts

import { DeepPartial, ObjectLiteral } from 'typeorm';
import { BaseRepository } from './base.repository';
import { BaseQueryDto, PaginatedResult } from './base.type';

export abstract class BaseService<T extends ObjectLiteral> {
    constructor(protected repository: BaseRepository<T>) { }

    async getAll(): Promise<T[]> {
        return this.repository.findAll();
    }

    async getById(id: number, relations: string[] = []): Promise<T | null> {
        return this.repository.findById(id, relations);
    }

    async create(data: DeepPartial<T>): Promise<T> {
        return this.repository.create(data);
    }

    async update(id: number, data: DeepPartial<T>, relations: string[] = []): Promise<T | null> {
        return this.repository.update(id, data, relations);
    }

    async delete(id: number): Promise<void> {
        return this.repository.delete(id);
    }

    async findWithQuery(
        query: BaseQueryDto,
        relations: string[] = [],
        searchableFields: string[] = []
    ): Promise<PaginatedResult<T>> {
        return this.repository.findWithQuery(query, relations, searchableFields);
    }
}