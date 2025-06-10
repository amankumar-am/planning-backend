// src/modules/employmentType/employmentType.service.ts

import { BaseService } from '../../core/base.service';
import { EmploymentTypeEntity } from './employmentType.entity';
import { EmploymentTypeRepository } from './employmentType.repository';
import { CreateEmploymentTypeDto, UpdateEmploymentTypeDto } from './employmentType.type';

export class EmploymentTypeService extends BaseService<EmploymentTypeEntity> {
  constructor(private readonly employmentTypeRepository: EmploymentTypeRepository) {
    super(employmentTypeRepository);
  }

  async create(dto: CreateEmploymentTypeDto): Promise<EmploymentTypeEntity> {
    return this.employmentTypeRepository.create({
      ...dto,
      isActive: dto.isActive ?? true,
      createdBy: dto.createdBy ?? 'system',
      createdAt: dto.createdAt ?? new Date(),
      modifiedBy: dto.modifiedBy ?? 'system',
      modifiedAt: dto.modifiedAt ?? null,
    });
  }

  async update(id: number, dto: UpdateEmploymentTypeDto): Promise<EmploymentTypeEntity> {
    const employmentType = await this.employmentTypeRepository.findOneOrFail({ where: { id } });
    Object.assign(employmentType, {
      ...dto,
      modifiedBy: dto.modifiedBy,
      modifiedAt: dto.modifiedAt,
    });
    return this.employmentTypeRepository.save(employmentType);
  }

  async findAll(): Promise<EmploymentTypeEntity[]> {
    const employmentTypes = await this.employmentTypeRepository.findAll();
    return employmentTypes;
  }

  async findOne(id: number): Promise<EmploymentTypeEntity> {
    const employmentType = await this.employmentTypeRepository.findById(id);
    if (!employmentType) {
      throw new Error(`EmploymentType with id ${id} not found`);
    }
    return employmentType;
  }
}