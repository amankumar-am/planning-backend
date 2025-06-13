// src/modules/fund/fund.route.ts

import { Router } from 'express';
import { FundController } from './fund.controller';
import { FundService } from './fund.service';
import { FundRepository } from './fund.repository';

const repository = new FundRepository();
const service = new FundService(repository);
const controller = new FundController(service);

const router = Router();

// Standard CRUD operations
router.get('/', controller.list.bind(controller));
router.get('/query', controller.listWithQuery.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

// Custom fund routes
router.get('/dashboard/global/total-funds', controller.getTotalFunds.bind(controller));

export default router;

