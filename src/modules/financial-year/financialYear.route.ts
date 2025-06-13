// src/modules/financial-year/financialYear.route.ts

import { Router } from 'express';
import { FinancialYearController } from './financialYear.controller';
import { FinancialYearService } from './financialYear.service';
import { FinancialYearRepository } from './financialYear.repository';

const repository = new FinancialYearRepository();
const service = new FinancialYearService(repository);
const controller = new FinancialYearController(service);

const router = Router();

// Standard CRUD operations
router.get('/', controller.list.bind(controller));
router.get('/query', controller.listWithQuery.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;