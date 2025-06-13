// src/modules/subsector/subsector.route.ts

import { Router } from 'express';
import { SubSectorController } from './subsector.controller';
import { SubSectorRepository } from './subsector.repository';
import { SubSectorService } from './subsector.service';

const repository = new SubSectorRepository();
const service = new SubSectorService(repository);
const controller = new SubSectorController(service);

const router = Router();

// Standard CRUD operations
router.get('/', controller.list.bind(controller));
router.get('/query', controller.listWithQuery.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

// Custom subsector routes (specific to subsector)
router.get('/sector/:sectorId', controller.getBySectorId.bind(controller));

export default router;