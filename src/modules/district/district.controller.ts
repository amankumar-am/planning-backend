// src/modules/district/district.controller.ts

import { DistrictService } from './district.service';
import { DistrictEntity } from './district.entity';
import { BaseController } from '../../core/base.controller';
import { districtSchema } from '../../api/models/schemas/district.schema';
import { sendErrorResponse, sendListResponse } from '../../core/response.util';
import { Request, Response } from 'express';


export class DistrictController extends BaseController<DistrictEntity> {
  constructor(private readonly districtService: DistrictService) {
    super(districtService, districtSchema);
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const districts = await this.districtService.findAllWithRelations();
      const mappedTalukas = districts.map(district => ({
        ...district,
        district: district.state || '',
      }));
      sendListResponse(res, this.schema, mappedTalukas);
    } catch (error: any) {
      sendErrorResponse(res, error.message || 'Error fetching districts', 400);
    }
  }
}