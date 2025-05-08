// src/modules/fund/fund.repository.ts

import { Fund } from './fund.entity';
import { BaseRepository } from '../../core/base.repository';

export class FundRepository extends BaseRepository<Fund> {
    constructor() {
        super(Fund);
    }
}