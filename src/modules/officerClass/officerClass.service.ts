// src/modules/officerClass/officerClass.service.ts

import { BaseService } from '../../core/base.service';
import { OfficerClassEntity } from './officerClass.entity';
import { OfficerClassRepository } from './officerClass.repository';
import { CreateOfficerClassDto, UpdateOfficerClassDto } from './officerClass.type';

export class OfficerClassService extends BaseService<OfficerClassEntity> {
  constructor(private readonly officerClassRepository: OfficerClassRepository) {
    super(officerClassRepository);
  }

  async create(dto: CreateOfficerClassDto): Promise<OfficerClassEntity> {
    return this.officerClassRepository.create({
      ...dto,
      isActive: dto.isActive ?? true,
      createdBy: dto.createdBy ?? 'system',
      createdAt: dto.createdAt ?? new Date(),
      modifiedBy: dto.modifiedBy ?? 'system',
      modifiedAt: dto.modifiedAt ?? null,
    });
  }

  async update(id: number, dto: UpdateOfficerClassDto): Promise<OfficerClassEntity> {
    const officerClass = await this.officerClassRepository.findOneOrFail({ where: { id } });
    Object.assign(officerClass, {
      ...dto,
      modifiedBy: dto.modifiedBy,
      modifiedAt: dto.modifiedAt,
    });
    return this.officerClassRepository.save(officerClass);
  }

  async findAll(): Promise<OfficerClassEntity[]> {
    const officerClasss = await this.officerClassRepository.findAll();
    return officerClasss;
  }

  async findOne(id: number): Promise<OfficerClassEntity> {
    const officerClass = await this.officerClassRepository.findById(id);
    if (!officerClass) {
      throw new Error(`OfficerClass with id ${id} not found`);
    }
    return officerClass;
  }
}