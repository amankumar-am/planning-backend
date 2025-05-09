import { DistrictEntity } from './district.entity';
import { BaseRepository } from '../../core/base.repository';

export class DistrictRepository extends BaseRepository<DistrictEntity> {
  constructor() {
    super(DistrictEntity);
  }
}