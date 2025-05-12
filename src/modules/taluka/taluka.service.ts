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
    console.log('Talukas:', talukas); // Debug log
    return talukas;
  }

  async findOne(id: number): Promise<TalukaEntity> {
    const taluka = await this.talukaRepository.findById(id);
    if (!taluka) {
      throw new Error(`Taluka with id ${id} not found`);
    }
    return taluka;
  }

  async getTalukasByDistrict(districtId: number): Promise<Taluka[]> {
    return await this.talukaRepository.find({
      where: { MT_District: districtId },
    });
  }
}