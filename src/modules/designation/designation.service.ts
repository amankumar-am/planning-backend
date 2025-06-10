// src/modules/designation/designation.service.ts

import { BaseService } from '../../core/base.service';
import { DesignationEntity } from './designation.entity';
import { DesignationRepository } from './designation.repository';
import { CreateDesignationDto, UpdateDesignationDto } from './designation.type';

export class DesignationService extends BaseService<DesignationEntity> {
  constructor(private readonly designationRepository: DesignationRepository) {
    super(designationRepository);
  }

  async create(dto: CreateDesignationDto): Promise<DesignationEntity> {
    return this.designationRepository.create({
      ...dto,
      department: { id: dto.department } as any,
      isActive: dto.isActive ?? true,
      createdBy: dto.createdBy ?? 'system',
      createdAt: dto.createdAt ?? new Date(),
      modifiedBy: dto.modifiedBy ?? 'system',
      modifiedAt: dto.modifiedAt ?? null,
    });
  }

  async update(id: number, dto: UpdateDesignationDto): Promise<DesignationEntity> {
    const designation = await this.designationRepository.findOneOrFail({ where: { id } });
    Object.assign(designation, {
      ...dto,
      modifiedBy: dto.modifiedBy,
      modifiedAt: dto.modifiedAt,
    });
    return this.designationRepository.save(designation);
  }

  async findAll(): Promise<DesignationEntity[]> {
    const designations = await this.designationRepository.findAll();
    return designations;
  }

  async findAllWithRelations(): Promise<DesignationEntity[]> {
    return this.designationRepository.findAllWithRelations(['department']);
  }

  async findOne(id: number): Promise<DesignationEntity> {
    const designation = await this.designationRepository.findById(id);
    if (!designation) {
      throw new Error(`Designation with id ${id} not found`);
    }
    return designation;
  }

  async findByDepartmentId(departmentId: number): Promise<DesignationEntity[]> {
    const designations = await this.designationRepository.findByDepartmentId(departmentId);
    if (!designations || designations.length === 0) {
      throw new Error(`No designations found for department ID ${departmentId}`);
    }
    return designations;
  }

  async totalCount(): Promise<number> {
    return this.designationRepository.totalCount();
  }
}