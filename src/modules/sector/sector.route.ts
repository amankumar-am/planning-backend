// src/modules/sector/sector.route.ts

import { Router } from 'express';
import { SectorController } from './sector.controller';
import { SectorService } from './sector.service';
import { SectorRepository } from './sector.repository';

const repository = new SectorRepository();
const service = new SectorService(repository);
const controller = new SectorController(service);

const router = Router();

router.get('/dashboard/global/total-sectors', controller.getTotalSectors.bind(controller));
// Add more explicit routes as needed

export default router;