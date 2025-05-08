// src/modules/financial-year/financialYear.repository.ts

import { FinancialYear } from './financialYear.entity';
import { BaseRepository } from '../../core/base.repository';

export class FinancialYearRepository extends BaseRepository<FinancialYear> {
    constructor() {
        super(FinancialYear);
    }
}