// src/modules/taluka/taluka.controller.ts
import { Request, Response } from 'express';
import { sendListResponse, sendErrorResponse } from '../../core/response.util';
import { TalukaService } from './taluka.service';
import { TalukaEntity } from './taluka.entity';
import { BaseController } from '../../core/base.controller';
import { talukaSchema } from '../../api/models/schemas/taluka.schema';


export class TalukaController extends BaseController<TalukaEntity> {

  constructor(private readonly talukaService: TalukaService) {
    super(talukaService, talukaSchema);
  }

  async getByDistrictId(req: Request, res: Response): Promise<void> {
    try {
      const districtId = parseInt(req.params.districtId);
      if (isNaN(districtId)) {
        throw new Error('Invalid district ID');
      }
      const talukas = await this.talukaService.findByDistrictId(districtId);
      sendListResponse(res, this.schema, talukas);
    } catch (error: any) {
      sendErrorResponse(res, error.message || 'Error fetching talukas', 400);
    }
  }
}