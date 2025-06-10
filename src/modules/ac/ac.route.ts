// src/modules/ac/ac.route.ts

import { Router } from 'express';
import { ACController } from './ac.controller';
import { ACService } from './ac.service';
import { ACRepository } from './ac.repository';

const repository = new ACRepository();
const service = new ACService(repository);
const controller = new ACController(service);

const router = Router();

router.get('/', controller.list.bind(controller));
router.get('/district/:districtId', controller.getByDistrictId.bind(controller));
router.get('/dashboard/global/district/:districtId/total-acs', controller.getTotalACs.bind(controller));

export default router;