// src/modules/financial-year/financialYear.controller.ts

import { BaseController } from '../../core/base.controller';
import { FinancialYearService } from './financialYear.service';
import { FinancialYear } from './financialYear.entity';
import { financialYearSchema } from '../../api/models/schemas/financial-year.schema';



export class FinancialYearController extends BaseController<FinancialYear> {
    constructor(financialYearService: FinancialYearService) {
        super(financialYearService, financialYearSchema);
    }
}