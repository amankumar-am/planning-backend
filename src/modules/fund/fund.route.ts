// src/modules/fund/fund.route.ts

import { FundController } from './fund.controller';
import { FundService } from './fund.service';
import { BaseRepository } from '../../core/base.repository';
import { FundEntity } from './fund.entity';
import { createModuleRouter } from '../../core/module.factory';
import { FundRepository } from './fund.repository';


const repository = new FundRepository();
const service = new FundService(repository);
const controller = new FundController(service);

const router = createModuleRouter(controller, '');

export default router;

