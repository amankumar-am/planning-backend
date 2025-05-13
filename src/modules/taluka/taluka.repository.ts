// src/modules/taluka/taluka.repository.ts

import { TalukaEntity } from './taluka.entity';
import { BaseRepository } from '../../core/base.repository';
export class TalukaRepository extends BaseRepository<TalukaEntity> {
  constructor() {
    super(TalukaEntity);
  }

  async findByDistrictId(districtId: number): Promise<TalukaEntity[]> {
    return this.repository.find({
      where: { district: { id: districtId } },
      relations: ['district'],
    });
  }
}