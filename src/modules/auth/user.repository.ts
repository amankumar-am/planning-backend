// src/modules/auth/user.repository.ts

import { Repository, FindOneOptions } from 'typeorm';
import { AppDataSource } from '../../config/database';
import { UserEntity } from './user.entity';
import { BaseRepository } from '../../core/base.repository';

export class UserRepository extends BaseRepository<UserEntity> {
    constructor() {
        super(UserEntity);
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        return this.repository.findOne({ where: { emailId: email } });
    }

    async findByUsername(username: string): Promise<UserEntity | null> {
        return this.repository.findOne({ where: { username: username } });
    }

    async findByMobile(mobile: string): Promise<UserEntity | null> {
        return this.repository.findOne({ where: { mobile: mobile } });
    }

    async create(user: Partial<UserEntity>): Promise<UserEntity> {
        return this.repository.save(user);
    }

    async updateLastLogin(userId: number): Promise<void> {
        await this.repository.update(userId, { lastLogin: new Date() });
    }

    async findAll(): Promise<UserEntity[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<UserEntity | null> {
        return this.repository.findOne({ where: { id } });
    }

    async findOneOrFail(options: FindOneOptions<UserEntity>): Promise<UserEntity> {
        return this.repository.findOneOrFail(options);
    }

    async save(user: Partial<UserEntity>): Promise<UserEntity> {
        return this.repository.save(user);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}
