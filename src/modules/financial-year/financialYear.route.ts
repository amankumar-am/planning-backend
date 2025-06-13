// src/modules/financial-year/financialYear.route.ts

import { Router } from 'express';
import { FinancialYearController } from './financialYear.controller';
import { FinancialYearService } from './financialYear.service';
import { FinancialYearRepository } from './financialYear.repository';

const repository = new FinancialYearRepository();
const service = new FinancialYearService(repository);
const controller = new FinancialYearController(service);

const router = Router();

router.get('/', controller.list.bind(controller));
router.get('/query', controller.listWithQuery.bind(controller));
// Add more explicit routes as needed

export default router;