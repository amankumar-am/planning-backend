// src/modules/sector/sector.route.ts

import { Router } from 'express';
import { SectorController } from './sector.controller';
import { SectorService } from './sector.service';
import { SectorRepository } from './sector.repository';

const repository = new SectorRepository();
const service = new SectorService(repository);
const controller = new SectorController(service);

const router = Router();

// Standard CRUD operations
router.get('/', controller.list.bind(controller));
router.get('/query', controller.listWithQuery.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

// Custom sector routes
router.get('/dashboard/global/total-sectors', controller.getTotalSectors.bind(controller));

export default router;