// src/core/base.service.ts

import { DeepPartial, ObjectLiteral } from 'typeorm';
import { BaseRepository } from './base.repository';

export abstract class BaseService<T extends ObjectLiteral> {
    constructor(protected repository: BaseRepository<T>) { }

    async getAll(): Promise<T[]> {
        return this.repository.findAll();
    }

    async getById(id: number): Promise<T | null> {
        return this.repository.findById(id);
    }

    async create(data: DeepPartial<T>): Promise<T> {
        return this.repository.create(data);
    }

    async update(id: number, data: DeepPartial<T>): Promise<T | null> {
        return this.repository.update(id, data);
    }

    async delete(id: number): Promise<void> {
        return this.repository.delete(id);
    }
}