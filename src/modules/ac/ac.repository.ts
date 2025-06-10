// src/modules/ac/ac.repository.ts

import { ACEntity } from './ac.entity';
import { BaseRepository } from '../../core/base.repository';
export class ACRepository extends BaseRepository<ACEntity> {
  constructor() {
    super(ACEntity);
  }

  async findByDistrictId(districtId: number): Promise<ACEntity[]> {
    return this.repository.find({
      where: { district: { id: districtId } },
      relations: ['district'],
    });
  }

  async totalCount(): Promise<number> {
    return this.repository.count();
  }
}