// src/modules/gpVillage/gpVillage.route.ts

import { Router } from 'express';
import { GpVillageController } from './gpVillage.controller';
import { GpVillageService } from './gpVillage.service';
import { GpVillageRepository } from './gpVillage.repository';

const repository = new GpVillageRepository();
const service = new GpVillageService(repository);
const controller = new GpVillageController(service);

const router = Router();

// Standard CRUD operations
router.get('/', controller.list.bind(controller));
router.get('/query', controller.listWithQuery.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

// Custom village routes (with specific path patterns to avoid conflicts)
router.get('/district/:districtId', controller.getByDistrictId.bind(controller));
router.get('/taluka/:talukaId', controller.getByTalukaId.bind(controller));

export default router;