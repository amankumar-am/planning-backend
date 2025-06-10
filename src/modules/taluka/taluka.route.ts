// src/modules/taluka/taluka.route.ts

import { Router } from 'express';
import { TalukaController } from './taluka.controller';
import { TalukaService } from './taluka.service';
import { TalukaRepository } from './taluka.repository';

const repository = new TalukaRepository();
const service = new TalukaService(repository);
const controller = new TalukaController(service);

const router = Router();

router.get('/', controller.list.bind(controller));
router.get('/district/:districtId', controller.getByDistrictId.bind(controller));
router.get('/dashboard/global/district/:districtId/total-talukas', controller.getTotalTalukas.bind(controller));

export default router;