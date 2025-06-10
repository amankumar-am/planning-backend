// src/modules/mpmla/mpmla.repository.ts

import { MpmlaEntity } from './mpmla.entity';
import { BaseRepository } from '../../core/base.repository';
export class MpmlaRepository extends BaseRepository<MpmlaEntity> {
  constructor() {
    super(MpmlaEntity);
  }

  async findByTalukaId(talukaId: number): Promise<MpmlaEntity[]> {
    return this.repository.find({
      where: { legislativeConstituency: { id: talukaId } },
      relations: ['legislativeConstituency'],
    });
  }


  async findByACId(acId: number): Promise<MpmlaEntity[]> {
    return this.repository.find({
      where: { parliamentaryConstituency: { id: acId } },
      relations: ['parliamentaryConstituency'],
    });
  }

  async totalCount(): Promise<number> {
    return this.repository.count();
  }
}