import { BaseService } from '../../core/base.service';
import { RoleEntity } from './role.entity';
import { RoleRepository } from './role.repository';
import { CreateRoleDto, UpdateRoleDto } from './role.type';

export class RoleService extends BaseService<RoleEntity> {
    constructor(private readonly roleRepository: RoleRepository) {
        super(roleRepository);
    }

    async create(dto: CreateRoleDto): Promise<RoleEntity> {
        return this.roleRepository.create({
            ...dto,
            isActive: dto.isActive ?? true,
            createdBy: dto.createdBy ?? 'system',
            createdAt: dto.createdAt ?? new Date(),
            modifiedBy: dto.modifiedBy ?? 'system',
            modifiedAt: dto.modifiedAt ?? null,
        });
    }

    async update(id: number, dto: UpdateRoleDto): Promise<RoleEntity> {
        const role = await this.roleRepository.findOneOrFail({ where: { id } });
        Object.assign(role, {
            ...dto,
            modifiedBy: dto.modifiedBy ?? 'system',
            modifiedAt: new Date(),
        });
        return this.roleRepository.save(role);
    }

    async findByCode(code: string): Promise<RoleEntity | null> {
        return this.roleRepository.findByCode(code);
    }

    async findByType(type: string): Promise<RoleEntity[]> {
        return this.roleRepository.findByType(type);
    }

    async findWithUsers(roleId: number): Promise<RoleEntity | null> {
        return this.roleRepository.findWithUsers(roleId);
    }

    async findWithGroups(roleId: number): Promise<RoleEntity | null> {
        return this.roleRepository.findWithGroups(roleId);
    }

    async findWithAllRelations(roleId: number): Promise<RoleEntity | null> {
        return this.roleRepository.findWithAllRelations(roleId);
    }

    async findAllWithRelations(): Promise<RoleEntity[]> {
        return this.roleRepository.findAllWithRelations(['users', 'groups']);
    }
} 