// src/modules/department/department.service.ts

import { BaseService } from '../../core/base.service';
import { DepartmentEntity } from './department.entity';
import { DepartmentRepository } from './department.repository';
import { CreateDepartmentDto, UpdateDepartmentDto } from './department.type';

export class DepartmentService extends BaseService<DepartmentEntity> {
  constructor(private readonly departmentRepository: DepartmentRepository) {
    super(departmentRepository);
  }

  async create(dto: CreateDepartmentDto): Promise<DepartmentEntity> {
    return this.departmentRepository.create({
      ...dto,
      isActive: dto.isActive ?? true,
      createdBy: dto.createdBy ?? 'system',
      createdAt: dto.createdAt ?? new Date(),
      modifiedBy: dto.modifiedBy ?? 'system',
      modifiedAt: dto.modifiedAt ?? null,
    });
  }

  async update(id: number, dto: UpdateDepartmentDto): Promise<DepartmentEntity> {
    const department = await this.departmentRepository.findOneOrFail({ where: { id } });
    Object.assign(department, {
      ...dto,
      modifiedBy: dto.modifiedBy,
      modifiedAt: dto.modifiedAt,
    });
    return this.departmentRepository.save(department);
  }

  async findAll(): Promise<DepartmentEntity[]> {
    const departments = await this.departmentRepository.findAll();
    return departments;
  }

  async findAllWithRelations(): Promise<DepartmentEntity[]> {
    return this.departmentRepository.findAllWithRelations(['district']);
  }

  async findOne(id: number): Promise<DepartmentEntity> {
    const department = await this.departmentRepository.findById(id);
    if (!department) {
      throw new Error(`Department with id ${id} not found`);
    }
    return department;
  }

  async totalCount(): Promise<number> {
    return this.departmentRepository.totalCount();
  }
}