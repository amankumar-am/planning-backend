// src/modules/sector/sector.route.ts

import { createModuleRouter } from '../../core/module.factory';
import { SectorController } from './sector.controller';
import { SectorRepository } from './sector.repository';
import { SectorService } from './sector.service';

const repository = new SectorRepository();
const service = new SectorService(repository);
const controller = new SectorController(service);

const router = createModuleRouter(controller, '');

export default router;