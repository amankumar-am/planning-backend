// src/modules/financial-year/financialYear.repository.ts

import { FinancialYearEntity } from './financialYear.entity';
import { BaseRepository } from '../../core/base.repository';

export class FinancialYearRepository extends BaseRepository<FinancialYearEntity> {
    constructor() {
        super(FinancialYearEntity);
    }
}