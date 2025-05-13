// src/modules/subsector/subsector.controller.ts
import { Request, Response } from 'express';
import { sendListResponse, sendErrorResponse } from '../../core/response.util';
import { BaseController } from '../../core/base.controller';
import { SubSectorEntity } from './subsector.entity';
import { SubSectorService } from './subsector.service';
import { SubSectorSchema } from '../../api/models/schemas/subSector.schema';


export class SubSectorController extends BaseController<SubSectorEntity> {
  constructor(private subSectorService: SubSectorService) {
    super(subSectorService, SubSectorSchema);
  }

  async getBySectorId(req: Request, res: Response): Promise<void> {
    try {
      const sectorId = parseInt(req.params.sectorId);
      if (isNaN(sectorId)) {
        throw new Error('Invalid sector ID');
      }
      const subSectors = await this.subSectorService.findBySectorId(sectorId);
      sendListResponse(res, this.schema, subSectors);
    } catch (error: any) {
      sendErrorResponse(res, error.message || 'Error fetching subSectors', 400);
    }
  }
}