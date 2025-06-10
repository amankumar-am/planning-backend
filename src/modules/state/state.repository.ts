// src/modules/state/state.repository.ts

import { StateEntity } from './state.entity';
import { BaseRepository } from '../../core/base.repository';

export class StateRepository extends BaseRepository<StateEntity> {
  constructor() {
    super(StateEntity);
  }
}