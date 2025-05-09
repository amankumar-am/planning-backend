// src/modules/sector/sector.controller.ts


import { SectorSchema } from '../../api/models/schemas/sector.schema';
import { BaseController } from '../../core/base.controller';
import { SectorEntity } from './sector.entity';
import { SectorService } from './sector.service';



export class SectorController extends BaseController<SectorEntity> {
    constructor(sectorService: SectorService) {
        super(sectorService, SectorSchema);
    }
}