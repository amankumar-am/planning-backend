// src/modules/ac/ac.controller.ts
import { Request, Response } from 'express';
import { sendListResponse, sendErrorResponse } from '../../core/response.util';
import { ACService } from './ac.service';
import { ACEntity } from './ac.entity';
import { BaseController } from '../../core/base.controller';
import { acSchema } from '../../api/models/schemas/ac.schema';


export class ACController extends BaseController<ACEntity> {

  constructor(private readonly acService: ACService) {
    super(acService, acSchema);
  }

  async getByDistrictId(req: Request, res: Response): Promise<void> {
    try {
      const districtId = parseInt(req.params.districtId);
      if (isNaN(districtId)) {
        throw new Error('Invalid district ID');
      }
      const acs = await this.acService.findByDistrictId(districtId);
      // Map district to string and prant to string
      const mappedACs = acs.map(ac => ({
        ...ac,
        district: ac.district || '',
      }));
      sendListResponse(res, this.schema, mappedACs);
    } catch (error: any) {
      sendErrorResponse(res, error.message || 'Error fetching acs', 400);
    }
  }

  async getTotalACs(req: Request, res: Response): Promise<void> {
    try {
      const districtId = parseInt(req.params.districtId);
      if (isNaN(districtId)) {
        throw new Error('Invalid district ID');
      }
      const totalACs = await this.acService.totalCount();

      res.json({ title: 'Total ACs', uniqueCount: totalACs });
    } catch (error: any) {
      sendErrorResponse(res, error.message || 'Error fetching total acs', 400);
    }
  }

  // Override the list endpoint to map district and prant to string values
  async list(req: Request, res: Response): Promise<void> {
    try {
      const acs = await this.acService.findAllWithRelations();
      const mappedACs = acs.map(ac => ({
        ...ac,
        district: ac.district || '',
      }));
      sendListResponse(res, this.schema, mappedACs);
    } catch (error: any) {
      sendErrorResponse(res, error.message || 'Error fetching acs', 400);
    }
  }
}