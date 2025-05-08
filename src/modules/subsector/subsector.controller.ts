// src/modules/subSector/subSector.controller.ts

import { BaseController } from '../../core/base.controller';
import { SubSectorEntity } from './subsector.entity';
import { SubSectorService } from './subsector.service';
import { SubSectorSchema } from 'api/models/schemas/subSector.schema';


export class SubSectorController extends BaseController<SubSectorEntity> {
  constructor(subSectorService: SubSectorService) {
    super(subSectorService, SubSectorSchema);
  }
}