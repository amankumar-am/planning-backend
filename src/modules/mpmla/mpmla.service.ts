// src/modules/mpmla/mpmla.service.ts

import { BaseService } from '../../core/base.service';
import { MpmlaEntity } from './mpmla.entity';
import { MpmlaRepository } from './mpmla.repository';
import { CreateMpmlaDto, UpdateMpmlaDto } from './mpmla.type';

export class MpmlaService extends BaseService<MpmlaEntity> {
  constructor(private readonly mpmlaRepository: MpmlaRepository) {
    super(mpmlaRepository);
  }

  async create(dto: CreateMpmlaDto): Promise<MpmlaEntity> {
    return this.mpmlaRepository.create({
      ...dto,
      legislativeConstituency: { id: dto.legislativeConstituency } as any,
      parliamentaryConstituency: { id: dto.parliamentaryConstituency } as any,
      isActive: dto.isActive ?? true,
      createdBy: dto.createdBy ?? 'system',
      createdAt: dto.createdAt ?? new Date(),
      modifiedBy: dto.modifiedBy ?? 'system',
      modifiedAt: dto.modifiedAt ?? null,
    });
  }

  async update(id: number, dto: UpdateMpmlaDto): Promise<MpmlaEntity> {
    const mpmla = await this.mpmlaRepository.findOneOrFail({ where: { id } });
    Object.assign(mpmla, {
      ...dto,
      modifiedBy: dto.modifiedBy,
      modifiedAt: dto.modifiedAt,
    });
    return this.mpmlaRepository.save(mpmla);
  }

  async findAll(): Promise<MpmlaEntity[]> {
    const mpmlas = await this.mpmlaRepository.findAll();
    return mpmlas;
  }

  async findAllWithRelations(): Promise<MpmlaEntity[]> {
    return this.mpmlaRepository.findAllWithRelations(['legislativeConstituency', 'parliamentaryConstituency']);
  }

  async findOne(id: number): Promise<MpmlaEntity> {
    const mpmla = await this.mpmlaRepository.findById(id);
    if (!mpmla) {
      throw new Error(`Mpmla with id ${id} not found`);
    }
    return mpmla;
  }

  async findByTalukaId(talukaId: number): Promise<MpmlaEntity[]> {
    const mpmlas = await this.mpmlaRepository.findByTalukaId(talukaId);
    if (!mpmlas || mpmlas.length === 0) {
      throw new Error(`No mpmlas found for district ID ${talukaId}`);
    }
    return mpmlas;
  }

  async findByACId(acId: number): Promise<MpmlaEntity[]> {
    const mpmlas = await this.mpmlaRepository.findByACId(acId);
    if (!mpmlas || mpmlas.length === 0) {
      throw new Error(`No mpmlas found for district ID ${acId}`);
    }
    return mpmlas;
  }

  async totalCount(): Promise<number> {
    return this.mpmlaRepository.totalCount();
  }
}