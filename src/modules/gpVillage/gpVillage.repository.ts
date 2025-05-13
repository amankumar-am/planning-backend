// src/modules/gpVillage/gpVillage.repository.ts

import { GpVillageEntity } from './gpVillage.entity';
import { BaseRepository } from '../../core/base.repository';

export class GpVillageRepository extends BaseRepository<GpVillageEntity> {
  constructor() {
    super(GpVillageEntity);
  }
  async findByDistrictId(districtId: number): Promise<GpVillageEntity[]> {
    return this.repository.find({ where: { district: { id: districtId } }, });
  }

  async findByTalukaId(talukaId: number): Promise<GpVillageEntity[]> {
    return this.repository.find({
      where: { taluka: { id: talukaId } },
      relations: ['taluka', 'district'],
    });
  }

}