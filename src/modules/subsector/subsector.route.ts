// src/modules/subsector/subsector.route.ts

import { Router } from 'express';
import { SubSectorController } from './subsector.controller';
import { SubSectorRepository } from './subsector.repository';
import { SubSectorService } from './subsector.service';

const repository = new SubSectorRepository();
const service = new SubSectorService(repository);
const controller = new SubSectorController(service);

const router = Router();

router.get('/', controller.list.bind(controller));
router.get('/query', controller.listWithQuery.bind(controller));
router.get('/sector/:sectorId', controller.getBySectorId.bind(controller));

export default router;