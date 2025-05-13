// src/modules/financial-year/financialYear.route.ts

import { BaseRepository } from '../../core/base.repository';
import { createModuleRouter } from '../../core/module.factory';
import { FinancialYear } from './financialYear.entity';
import { FinancialYearService } from './financialYear.service';
import { FinancialYearController } from './financialYear.controller';
import { FinancialYearRepository } from './financialYear.repository';

const repository = new FinancialYearRepository();
const service = new FinancialYearService(repository);
const controller = new FinancialYearController(service);

const router = createModuleRouter(controller, '');

export default router;