// src/api/financial-year/financial-year.routes.ts
import { Router } from 'express';
import { FinancialYearController } from './financialYear.controller';
import { FinancialYearService } from './financialYear.service';
import { FinancialYearRepository } from './financialYear.repository';

const router = Router();
// Dependency injection
const financialYearRepository = new FinancialYearRepository();
const financialYearService = new FinancialYearService(financialYearRepository);
const financialYearController = new FinancialYearController(financialYearService);

// Routes
router.get('/', financialYearController.getAllFinancialYears.bind(financialYearController));
router.get('/current', financialYearController.getCurrentFinancialYear.bind(financialYearController));
router.get('/:id', financialYearController.getFinancialYearById.bind(financialYearController));
router.post('/', financialYearController.createFinancialYear.bind(financialYearController));
router.put('/:id', financialYearController.updateFinancialYear.bind(financialYearController));
router.delete('/:id', financialYearController.deleteFinancialYear.bind(financialYearController));
router.patch('/:id/set-current', financialYearController.setCurrentFinancialYear.bind(financialYearController));

export default router;