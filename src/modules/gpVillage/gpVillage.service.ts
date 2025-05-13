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
      district: { id: dto.district } as any,
      taluka: { id: dto.taluka } as any,
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

  async findByDistrictId(districtId: number): Promise<GpVillageEntity[]> {
    const villages = await this.gpVillageRepository.findByDistrictId(districtId);
    if (!villages || villages.length === 0) {
      throw new Error(`No villages found for district ID ${districtId}`);
    }
    return villages;
  }

  async findByTalukaId(talukaId: number): Promise<GpVillageEntity[]> {
    const villages = await this.gpVillageRepository.findByTalukaId(talukaId);
    if (!villages || villages.length === 0) {
      throw new Error(`No villages found for district ID ${talukaId}`);
    }
    return villages;
  }
}