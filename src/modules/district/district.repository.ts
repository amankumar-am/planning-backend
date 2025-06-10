// src/modules/district/district.repository.ts

import { DistrictEntity } from './district.entity';
import { BaseRepository } from '../../core/base.repository';

export class DistrictRepository extends BaseRepository<DistrictEntity> {
  constructor() {
    super(DistrictEntity);
  }

  async findByDistrictId(stateId: number): Promise<DistrictEntity[]> {
    return this.repository.find({
      where: { state: { id: stateId } },
      relations: ['state'],
    });
  }
}