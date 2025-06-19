import { BaseRepository } from '../../core/base.repository';
import { RoleEntity } from './role.entity';

export class RoleRepository extends BaseRepository<RoleEntity> {
    constructor() {
        super(RoleEntity);
    }

    async findByCode(code: string): Promise<RoleEntity | null> {
        return this.repository.findOne({ where: { code } });
    }

    async findByType(type: string): Promise<RoleEntity[]> {
        return this.repository.find({ where: { type } });
    }

    async findWithUsers(roleId: number): Promise<RoleEntity | null> {
        return this.repository.findOne({
            where: { id: roleId },
            relations: ['users']
        });
    }

    async findWithGroups(roleId: number): Promise<RoleEntity | null> {
        return this.repository.findOne({
            where: { id: roleId },
            relations: ['groups']
        });
    }

    async findWithAllRelations(roleId: number): Promise<RoleEntity | null> {
        return this.repository.findOne({
            where: { id: roleId },
            relations: ['users', 'groups']
        });
    }
} 