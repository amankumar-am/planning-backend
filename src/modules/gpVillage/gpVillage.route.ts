// src/modules/gpVillage/gpvillage.route.ts

import { Router } from 'express';
import { GpVillageController } from './gpVillage.controller';
import { GpVillageService } from './gpVillage.service';
import { GpVillageRepository } from './gpVillage.repository';

const repository = new GpVillageRepository();
const service = new GpVillageService(repository);
const controller = new GpVillageController(service);

const router = Router();

router.get('/district/:districtId', controller.getByDistrictId.bind(controller));
router.get('/taluka/:talukaId', controller.getByTalukaId.bind(controller));

export default router;