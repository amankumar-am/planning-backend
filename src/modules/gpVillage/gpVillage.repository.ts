import { GpVillageEntity } from './gpVillage.entity';
import { BaseRepository } from '../../core/base.repository';

export class GpVillageRepository extends BaseRepository<GpVillageEntity> {
  constructor() {
    super(GpVillageEntity);
  }
}