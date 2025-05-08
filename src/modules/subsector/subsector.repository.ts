import { SubSectorEntity } from './subsector.entity';
import { BaseRepository } from '../../core/base.repository';

export class SubSectorRepository extends BaseRepository<SubSectorEntity> {
  constructor() {
    super(SubSectorEntity);
  }
}