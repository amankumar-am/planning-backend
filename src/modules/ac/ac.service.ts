// src/modules/ac/ac.service.ts

import { BaseService } from '../../core/base.service';
import { ACEntity } from './ac.entity';
import { ACRepository } from './ac.repository';
import { CreateACDto, UpdateACDto } from './ac.type';

export class ACService extends BaseService<ACEntity> {
  constructor(private readonly acRepository: ACRepository) {
    super(acRepository);
  }

  async create(dto: CreateACDto): Promise<ACEntity> {
    return this.acRepository.create({
      ...dto,
      district: { id: dto.district } as any,
      isActive: dto.isActive ?? true,
      createdBy: dto.createdBy ?? 'system',
      createdAt: dto.createdAt ?? new Date(),
      modifiedBy: dto.modifiedBy ?? 'system',
      modifiedAt: dto.modifiedAt ?? null,
    });
  }

  async update(id: number, dto: UpdateACDto): Promise<ACEntity> {
    const ac = await this.acRepository.findOneOrFail({ where: { id } });
    Object.assign(ac, {
      ...dto,
      modifiedBy: dto.modifiedBy,
      modifiedAt: dto.modifiedAt,
    });
    return this.acRepository.save(ac);
  }

  async findAll(): Promise<ACEntity[]> {
    const acs = await this.acRepository.findAll();
    return acs;
  }

  async findAllWithRelations(): Promise<ACEntity[]> {
    return this.acRepository.findAllWithRelations(['district']);
  }

  async findOne(id: number): Promise<ACEntity> {
    const ac = await this.acRepository.findById(id);
    if (!ac) {
      throw new Error(`AC with id ${id} not found`);
    }
    return ac;
  }

  async findByDistrictId(districtId: number): Promise<ACEntity[]> {
    const acs = await this.acRepository.findByDistrictId(districtId);
    if (!acs || acs.length === 0) {
      throw new Error(`No acs found for district ID ${districtId}`);
    }
    return acs;
  }

  async totalCount(): Promise<number> {
    return this.acRepository.totalCount();
  }
}