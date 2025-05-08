// src/modules/subsector/subsector.route.ts

import { BaseRepository } from '../../core/base.repository';
import { createModuleRouter } from '../../core/module.factory';
import { SubSectorController } from './subsector.controller';
import { SubSectorEntity } from './subsector.entity';
import { SubSectorService } from './subsector.service';


const subSectorRepository = new BaseRepository(SubSectorEntity);
const subSectorService = new SubSectorService(subSectorRepository);
const subSectorController = new SubSectorController(subSectorService);

export default createModuleRouter(subSectorController, '/subSectors');