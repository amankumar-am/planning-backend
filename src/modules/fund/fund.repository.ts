// src/modules/fund/fund.repository.ts

import { FundEntity } from './fund.entity';
import { BaseRepository } from '../../core/base.repository';

export class FundRepository extends BaseRepository<FundEntity> {
    constructor() {
        super(FundEntity);
    }

    async totalCount(): Promise<number> {
        return this.repository.count();
    }
}