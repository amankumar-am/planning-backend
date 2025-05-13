// src/modules/subsector/subsector.repository.ts

import { SubSectorEntity } from './subsector.entity';
import { BaseRepository } from '../../core/base.repository';

export class SubSectorRepository extends BaseRepository<SubSectorEntity> {
  constructor() {
    super(SubSectorEntity);
  }

  async findBySectorId(sectorId: number): Promise<SubSectorEntity[]> {
    return this.repository.find({
      where: { sector: { id: sectorId } },
      relations: ['sector'],
    });
  }
}