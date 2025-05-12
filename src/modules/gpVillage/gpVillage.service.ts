// src/modules/gpVillage/gpvillage.service.ts

import { BaseService } from '../../core/base.service';
import { GpVillageEntity } from './gpVillage.entity';
import { GpVillageRepository } from './gpVillage.repository';
import { CreateGpVillageDto, UpdateGpVillageDto } from './gpVillage.type';


export class GpVillageService extends BaseService<GpVillageEntity> {
  constructor(private readonly gpVillageRepository: GpVillageRepository) {
    super(gpVillageRepository);
  }

  async create(dto: CreateGpVillageDto): Promise<GpVillageEntity> {
    return this.gpVillageRepository.create({
      ...dto,
      isActive: dto.isActive ?? true,
      createdBy: dto.createdBy ?? 'system',
      createdAt: dto.createdAt ?? new Date(),
      modifiedBy: dto.modifiedBy ?? 'system',
      modifiedAt: dto.modifiedAt ?? null,
    });
  }

  async update(id: number, dto: UpdateGpVillageDto): Promise<GpVillageEntity> {
    const gpVillage = await this.gpVillageRepository.findOneOrFail({ where: { id } });
    Object.assign(gpVillage, {
      ...dto,
      modifiedBy: dto.modifiedBy,
      modifiedAt: dto.modifiedAt,
    });
    return this.gpVillageRepository.save(gpVillage);
  }

  async findAll(): Promise<GpVillageEntity[]> {
    const gpVillages = await this.gpVillageRepository.findAll();
    console.log('GpVillages:', gpVillages); // Debug log
    return gpVillages;
  }

  async findOne(id: number): Promise<GpVillageEntity> {
    const gpVillage = await this.gpVillageRepository.findById(id);
    if (!gpVillage) {
      throw new Error(`GpVillage with id ${id} not found`);
    }
    return gpVillage;
  }
}