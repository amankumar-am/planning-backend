// src/modules/taluka/taluka.route.ts

import { Router } from 'express';
import { TalukaController } from './taluka.controller';
import { TalukaService } from './taluka.service';
import { TalukaRepository } from './taluka.repository';

const repository = new TalukaRepository();
const service = new TalukaService(repository);
const controller = new TalukaController(service);

const router = Router();

// Standard CRUD operations
router.get('/', controller.list.bind(controller));
router.get('/query', controller.listWithQuery.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

// Custom taluka routes
router.get('/district/:districtId', controller.getByDistrictId.bind(controller));
router.get('/dashboard/global/district/:districtId/total-talukas', controller.getTotalTalukas.bind(controller));

export default router;