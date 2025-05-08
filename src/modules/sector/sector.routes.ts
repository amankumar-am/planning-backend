// src/modules/sector/sector.routes.ts

import { BaseRepository } from '../../core/base.repository';
import { createModuleRouter } from '../../core/module.factory';
import { SectorController } from './sector.controller';
import { SectorEntity } from './sector.entity';
import { SectorService } from './sector.service';

const sectorRepository = new BaseRepository(SectorEntity);
const sectorService = new SectorService(sectorRepository);
const sectorController = new SectorController(sectorService);

export default createModuleRouter(sectorController, '/sectors');