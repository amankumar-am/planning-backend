// src/modules/taluka/taluka.service.ts

import { BaseService } from '../../core/base.service';
import { TalukaEntity } from './taluka.entity';
import { TalukaRepository } from './taluka.repository';
import { CreateTalukaDto, UpdateTalukaDto } from './taluka.type';

export class TalukaService extends BaseService<TalukaEntity> {
  constructor(private readonly talukaRepository: TalukaRepository) {
    super(talukaRepository);
  }

  async create(dto: CreateTalukaDto): Promise<TalukaEntity> {
    return this.talukaRepository.create({
      ...dto,
      district: { id: dto.district } as any,
      prant: { id: dto.prant } as any,
      isActive: dto.isActive ?? true,
      createdBy: dto.createdBy ?? 'system',
      createdAt: dto.createdAt ?? new Date(),
      modifiedBy: dto.modifiedBy ?? 'system',
      modifiedAt: dto.modifiedAt ?? null,
    });
  }

  async update(id: number, dto: UpdateTalukaDto): Promise<TalukaEntity> {
    const taluka = await this.talukaRepository.findOneOrFail({ where: { id } });
    Object.assign(taluka, {
      ...dto,
      modifiedBy: dto.modifiedBy,
      modifiedAt: dto.modifiedAt,
    });
    return this.talukaRepository.save(taluka);
  }

  async findAll(): Promise<TalukaEntity[]> {
    const talukas = await this.talukaRepository.findAll();
    return talukas;
  }

  async findAllWithRelations(): Promise<TalukaEntity[]> {
    return this.talukaRepository.findAllWithRelations(['district', 'prant']);
  }

  async findOne(id: number): Promise<TalukaEntity> {
    const taluka = await this.talukaRepository.findById(id);
    if (!taluka) {
      throw new Error(`Taluka with id ${id} not found`);
    }
    return taluka;
  }

  async findByDistrictId(districtId: number): Promise<TalukaEntity[]> {
    const talukas = await this.talukaRepository.findByDistrictId(districtId);
    if (!talukas || talukas.length === 0) {
      throw new Error(`No talukas found for district ID ${districtId}`);
    }
    return talukas;
  }

  async totalCount(): Promise<number> {
    return this.talukaRepository.totalCount();
  }
}