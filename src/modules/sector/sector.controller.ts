// src/modules/sector/sector.controller.ts


import { SectorSchema } from '../../api/models/schemas/sector.schema';
import { BaseController } from '../../core/base.controller';
import { sendErrorResponse } from '../../core/response.util';
import { SectorEntity } from './sector.entity';
import { SectorService } from './sector.service';
import { Request, Response } from 'express';



export class SectorController extends BaseController<SectorEntity> {
    constructor(private readonly sectorService: SectorService) {
        super(sectorService, SectorSchema);
    }

    async getTotalSectors(req: Request, res: Response): Promise<void> {
        try {
            const totalSectors = await this.sectorService.totalCount();
            res.json({ title: 'Total Sectors', uniqueCount: totalSectors });
        } catch (error: any) {
            sendErrorResponse(res, error.message || 'Error fetching total sectors', 400);
        }
    }
}