// src/modules/taluka/taluka.repository.ts

import { TalukaEntity } from './taluka.entity';
import { BaseRepository } from '../../core/base.repository';

export class TalukaRepository extends BaseRepository<TalukaEntity> {
  constructor() {
    super(TalukaEntity);
  }
}