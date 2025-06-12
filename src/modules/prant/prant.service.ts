// src/modules/prant/prant.service.ts

import { BaseService } from '../../core/base.service';
import { PrantEntity } from './prant.entity';
import { PrantRepository } from './prant.repository';
import { CreatePrantDto, UpdatePrantDto } from './prant.type';

export class PrantService extends BaseService<PrantEntity> {
  constructor(private readonly prantRepository: PrantRepository) {
    super(prantRepository);
  }

  async create(dto: CreatePrantDto): Promise<PrantEntity> {
    return this.prantRepository.create({
      ...dto,
      isActive: dto.isActive ?? true,
      createdBy: dto.createdBy ?? 'system',
      createdAt: dto.createdAt ?? new Date(),
      modifiedBy: dto.modifiedBy ?? 'system',
      modifiedAt: dto.modifiedAt ?? null,
    });
  }

  async update(id: number, dto: UpdatePrantDto): Promise<PrantEntity> {
    const prant = await this.prantRepository.findOneOrFail({ where: { id } });
    Object.assign(prant, {
      ...dto,
      modifiedBy: dto.modifiedBy,
      modifiedAt: dto.modifiedAt,
    });
    return this.prantRepository.save(prant);
  }

  async findAll(): Promise<PrantEntity[]> {
    const prants = await this.prantRepository.findAll();
    return prants;
  }

  async findOne(id: number): Promise<PrantEntity> {
    const prant = await this.prantRepository.findById(id);
    if (!prant) {
      throw new Error(`Prant with id ${id} not found`);
    }
    return prant;
  }
}