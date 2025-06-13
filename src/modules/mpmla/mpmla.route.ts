// src/modules/mpmla/mpmla.route.ts

import { Router } from 'express';
import { MpmlaController } from './mpmla.controller';
import { MpmlaService } from './mpmla.service';
import { MpmlaRepository } from './mpmla.repository';

const repository = new MpmlaRepository();
const service = new MpmlaService(repository);
const controller = new MpmlaController(service);

const router = Router();

// Standard CRUD operations
router.get('/', controller.list.bind(controller));
router.get('/query', controller.listWithQuery.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

// router.get('/district/:talukaId', controller.getByRelatedId.bind(controller));

// router.get('/dashboard/global/district/:districtId/total-mpmlas', controller.getTotalMpmlas.bind(controller));

export default router;