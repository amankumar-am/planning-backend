// src/modules/prant/prant.repository.ts

import { PrantEntity } from './prant.entity';
import { BaseRepository } from '../../core/base.repository';

export class PrantRepository extends BaseRepository<PrantEntity> {
  constructor() {
    super(PrantEntity);
  }
}