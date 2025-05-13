// src/modules/subsector/subsector.route.ts

import { createModuleRouter } from '../../core/module.factory';
import { SubSectorController } from './subsector.controller';
import { SubSectorRepository } from './subsector.repository';
import { SubSectorService } from './subsector.service';

const repository = new SubSectorRepository();
const service = new SubSectorService(repository);
const controller = new SubSectorController(service);

const router = createModuleRouter(controller, '');
router.get('/sector/:sectorId', controller.getBySectorId.bind(controller));

export default router;