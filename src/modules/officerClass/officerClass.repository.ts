// src/modules/officerClass/officerClass.repository.ts

import { OfficerClassEntity } from './officerClass.entity';
import { BaseRepository } from '../../core/base.repository';

export class OfficerClassRepository extends BaseRepository<OfficerClassEntity> {
  constructor() {
    super(OfficerClassEntity);
  }
}