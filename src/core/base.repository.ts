// src/core/base.repository.ts

import { Repository, DeepPartial, ObjectLiteral, EntityTarget, FindOneOptions } from 'typeorm';
import { AppDataSource } from '../config/database';

export class BaseRepository<T extends ObjectLiteral> {
    protected repository: Repository<T>;

    constructor(entity: EntityTarget<T>) {
        this.repository = AppDataSource.getRepository(entity);
    }

    async findAll(): Promise<T[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<T | null> {
        return this.repository.findOne({ where: { id } as any });
    }

    async findOneOrFail(options: FindOneOptions<T>): Promise<T> {
        return this.repository.findOneOrFail(options);
    }

    async create(data: DeepPartial<T>): Promise<T> {
        const entity = this.repository.create(data);
        return this.repository.save(entity);
    }

    async save(entity: T): Promise<T> {
        return this.repository.save(entity);
    }

    async update(id: number, data: DeepPartial<T>): Promise<T | null> {
        await this.repository.update(id, data as any);
        return this.findById(id);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}