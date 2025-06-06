// src/modules/fund/fund.route.ts

import { FundController } from './fund.controller';
import { FundService } from './fund.service';
import { createModuleRouter } from '../../core/module.factory';
import { FundRepository } from './fund.repository';


const repository = new FundRepository();
const service = new FundService(repository);
const controller = new FundController(service);

const router = createModuleRouter(controller, '');
router.get('/dashboard/global/total-funds', controller.getTotalFunds.bind(controller));
export default router;

