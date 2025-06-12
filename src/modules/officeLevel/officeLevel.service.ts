// src/modules/officeLevel/officeLevel.service.ts

import { BaseService } from '../../core/base.service';
import { OfficeLevelEntity } from './officeLevel.entity';
import { OfficeLevelRepository } from './officeLevel.repository';
import { CreateOfficeLevelDto, UpdateOfficeLevelDto } from './officeLevel.type';

export class OfficeLevelService extends BaseService<OfficeLevelEntity> {
  constructor(private readonly officeLevelRepository: OfficeLevelRepository) {
    super(officeLevelRepository);
  }

  async create(dto: CreateOfficeLevelDto): Promise<OfficeLevelEntity> {
    return this.officeLevelRepository.create({
      ...dto,
      isActive: dto.isActive ?? true,
      createdBy: dto.createdBy ?? 'system',
      createdAt: dto.createdAt ?? new Date(),
      modifiedBy: dto.modifiedBy ?? 'system',
      modifiedAt: dto.modifiedAt ?? null,
    });
  }

  async update(id: number, dto: UpdateOfficeLevelDto): Promise<OfficeLevelEntity> {
    const officeLevel = await this.officeLevelRepository.findOneOrFail({ where: { id } });
    Object.assign(officeLevel, {
      ...dto,
      modifiedBy: dto.modifiedBy,
      modifiedAt: dto.modifiedAt,
    });
    return this.officeLevelRepository.save(officeLevel);
  }

  async findAll(): Promise<OfficeLevelEntity[]> {
    const officeLevels = await this.officeLevelRepository.findAll();
    return officeLevels;
  }

  async findOne(id: number): Promise<OfficeLevelEntity> {
    const officeLevel = await this.officeLevelRepository.findById(id);
    if (!officeLevel) {
      throw new Error(`OfficeLevel with id ${id} not found`);
    }
    return officeLevel;
  }
}