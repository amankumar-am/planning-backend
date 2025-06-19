import { BaseRepository } from '../../core/base.repository';
import { GroupEntity } from './group.entity';
import { IsNull } from 'typeorm';

export class GroupRepository extends BaseRepository<GroupEntity> {
    constructor() {
        super(GroupEntity);
    }

    async findByCode(code: string): Promise<GroupEntity | null> {
        return this.repository.findOne({ where: { code } });
    }

    async findByType(type: string): Promise<GroupEntity[]> {
        return this.repository.find({ where: { type } });
    }

    async findByParentId(parentId: number): Promise<GroupEntity[]> {
        return this.repository.find({ where: { parentId } });
    }

    async findWithUsers(groupId: number): Promise<GroupEntity | null> {
        return this.repository.findOne({
            where: { id: groupId },
            relations: ['users']
        });
    }

    async findWithRoles(groupId: number): Promise<GroupEntity | null> {
        return this.repository.findOne({
            where: { id: groupId },
            relations: ['roles']
        });
    }

    async findWithAllRelations(groupId: number): Promise<GroupEntity | null> {
        return this.repository.findOne({
            where: { id: groupId },
            relations: ['users', 'roles']
        });
    }

    async findRootGroups(): Promise<GroupEntity[]> {
        return this.repository.find({ where: { parentId: IsNull() } });
    }
} 