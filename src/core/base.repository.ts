// src/core/base.repository.ts

import { Repository, DeepPartial, ObjectLiteral, EntityTarget, FindOneOptions, SelectQueryBuilder } from 'typeorm';
import { AppDataSource } from '../config/database';
import { FilterOptions, SortOptions, PaginatedResult, BaseQueryDto } from './base.type';

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

    async find(options?: { where?: Partial<T> }): Promise<T[]> {
        return await this.repository.find(options);
    }

    async findAllWithRelations(relations: string[]): Promise<T[]> {
        return this.repository.find({ relations });
    }

    async findWithQuery(query: BaseQueryDto, relations: string[] = [], searchableFields: string[] = []): Promise<PaginatedResult<T>> {
        const queryBuilder = this.repository.createQueryBuilder('entity');

        // Add relations
        relations.forEach(relation => {
            queryBuilder.leftJoinAndSelect(`entity.${relation}`, relation);
        });

        // Apply search
        if (query.search && searchableFields.length > 0) {
            const searchConditions = searchableFields.map(field => `entity.${field} LIKE :search`).join(' OR ');
            queryBuilder.where(`(${searchConditions})`, { search: `%${query.search}%` });
        }

        // Apply filters
        if (query.filters && query.filters.length > 0) {
            query.filters.forEach((filter, index) => {
                this.applyFilter(queryBuilder, filter, index);
            });
        }

        // Apply sorting
        if (query.sortBy) {
            queryBuilder.orderBy(`entity.${query.sortBy}`, query.sortOrder || 'ASC');
        } else {
            queryBuilder.orderBy('entity.id', 'DESC');
        }

        // Apply pagination
        const page = query.page || 1;
        const limit = query.limit || 10;
        const skip = (page - 1) * limit;

        const [data, total] = await queryBuilder
            .skip(skip)
            .take(limit)
            .getManyAndCount();

        const totalPages = Math.ceil(total / limit);

        return {
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1,
            },
        };
    }

    private applyFilter(queryBuilder: SelectQueryBuilder<T>, filter: FilterOptions, index: number): void {
        const paramName = `filterValue${index}`;
        const fieldName = `entity.${filter.field}`;

        switch (filter.operator) {
            case 'eq':
                queryBuilder.andWhere(`${fieldName} = :${paramName}`, { [paramName]: filter.value });
                break;
            case 'ne':
                queryBuilder.andWhere(`${fieldName} != :${paramName}`, { [paramName]: filter.value });
                break;
            case 'like':
                queryBuilder.andWhere(`${fieldName} LIKE :${paramName}`, { [paramName]: `%${filter.value}%` });
                break;
            case 'in':
                queryBuilder.andWhere(`${fieldName} IN (:...${paramName})`, { [paramName]: filter.value });
                break;
            case 'gte':
                queryBuilder.andWhere(`${fieldName} >= :${paramName}`, { [paramName]: filter.value });
                break;
            case 'lte':
                queryBuilder.andWhere(`${fieldName} <= :${paramName}`, { [paramName]: filter.value });
                break;
            case 'isNull':
                queryBuilder.andWhere(`${fieldName} IS NULL`);
                break;
            case 'isNotNull':
                queryBuilder.andWhere(`${fieldName} IS NOT NULL`);
                break;
        }
    }
}