// src/modules/financial-year/financialYear.routes.ts

import { BaseRepository } from '../../core/base.repository';
import { createModuleRouter } from '../../core/module.factory';
import { FinancialYear } from './financialYear.entity';
import { FinancialYearService } from './financialYear.service';
import { FinancialYearController } from './financialYear.controller';

const fyRepository = new BaseRepository(FinancialYear);
const fyService = new FinancialYearService(fyRepository);
const fyController = new FinancialYearController(fyService);

export default createModuleRouter(fyController, '/fy');