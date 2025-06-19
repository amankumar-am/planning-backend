import { BaseService } from '../../core/base.service';
import { GroupEntity } from './group.entity';
import { GroupRepository } from './group.repository';
import { CreateGroupDto, UpdateGroupDto } from './group.type';

export class GroupService extends BaseService<GroupEntity> {
    constructor(private readonly groupRepository: GroupRepository) {
        super(groupRepository);
    }

    async create(dto: CreateGroupDto): Promise<GroupEntity> {
        return this.groupRepository.create({
            ...dto,
            isActive: dto.isActive ?? true,
            createdBy: dto.createdBy ?? 'system',
            createdAt: dto.createdAt ?? new Date(),
            modifiedBy: dto.modifiedBy ?? 'system',
            modifiedAt: dto.modifiedAt ?? null,
        });
    }

    async update(id: number, dto: UpdateGroupDto): Promise<GroupEntity> {
        const group = await this.groupRepository.findOneOrFail({ where: { id } });
        Object.assign(group, {
            ...dto,
            modifiedBy: dto.modifiedBy ?? 'system',
            modifiedAt: new Date(),
        });
        return this.groupRepository.save(group);
    }

    async findByCode(code: string): Promise<GroupEntity | null> {
        return this.groupRepository.findByCode(code);
    }

    async findByType(type: string): Promise<GroupEntity[]> {
        return this.groupRepository.findByType(type);
    }

    async findByParentId(parentId: number): Promise<GroupEntity[]> {
        return this.groupRepository.findByParentId(parentId);
    }

    async findWithUsers(groupId: number): Promise<GroupEntity | null> {
        return this.groupRepository.findWithUsers(groupId);
    }

    async findWithRoles(groupId: number): Promise<GroupEntity | null> {
        return this.groupRepository.findWithRoles(groupId);
    }

    async findWithAllRelations(groupId: number): Promise<GroupEntity | null> {
        return this.groupRepository.findWithAllRelations(groupId);
    }

    async findAllWithRelations(): Promise<GroupEntity[]> {
        return this.groupRepository.findAllWithRelations(['users', 'roles']);
    }

    async findRootGroups(): Promise<GroupEntity[]> {
        return this.groupRepository.findRootGroups();
    }
} 