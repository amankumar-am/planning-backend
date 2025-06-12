// src/modules/officeLevel/officeLevel.repository.ts

import { OfficeLevelEntity } from './officeLevel.entity';
import { BaseRepository } from '../../core/base.repository';

export class OfficeLevelRepository extends BaseRepository<OfficeLevelEntity> {
  constructor() {
    super(OfficeLevelEntity);
  }
}