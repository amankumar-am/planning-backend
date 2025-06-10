// src/modules/fund/fund.route.ts

import { Router } from 'express';
import { FundController } from './fund.controller';
import { FundService } from './fund.service';
import { FundRepository } from './fund.repository';

const repository = new FundRepository();
const service = new FundService(repository);
const controller = new FundController(service);

const router = Router();

router.get('/dashboard/global/total-funds', controller.getTotalFunds.bind(controller));
// Add more explicit routes as needed

export default router;

