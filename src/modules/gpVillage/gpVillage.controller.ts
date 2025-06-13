// src/modules/gpVillage/gpVillage.controller.ts

import { Request, Response } from 'express';
import { sendListResponse, sendErrorResponse } from '../../core/response.util';
import { gpVillageSchema } from '../../api/models/schemas/gpVillage.schema';
import { BaseController } from '../../core/base.controller';
import { GpVillageEntity } from './gpVillage.entity';
import { GpVillageService } from './gpVillage.service';



export class GpVillageController extends BaseController<GpVillageEntity> {
  constructor(private readonly gpVillageService: GpVillageService) {
    super(
      gpVillageService,
      gpVillageSchema,
      ['district', 'taluka'], // relations
      ['name', 'nameEn', 'nameGu', 'code'] // searchable fields
    );
  }

  async getByDistrictId(req: Request, res: Response): Promise<void> {
    try {
      const districtId = parseInt(req.params.districtId);
      if (isNaN(districtId)) {
        throw new Error('Invalid district ID');
      }
      const villages = await this.gpVillageService.findByDistrictId(districtId);
      sendListResponse(res, this.schema, villages);
    } catch (error: any) {
      sendErrorResponse(res, error.message || 'Error fetching villages', 400);
    }
  }

  async getByTalukaId(req: Request, res: Response): Promise<void> {
    try {
      const talukaId = parseInt(req.params.talukaId);
      if (isNaN(talukaId)) {
        throw new Error('Invalid taluka ID');
      }
      const villages = await this.gpVillageService.findByTalukaId(talukaId);
      sendListResponse(res, this.schema, villages);
    } catch (error: any) {
      sendErrorResponse(res, error.message || 'Error fetching villages', 400);
    }
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const items = await this.service.getAll();
      sendListResponse(res, this.schema, items);
    } catch (error: any) {
      sendErrorResponse(res, error.message || 'Error fetching villages', 400);
    }
  }

  async listWithQuery(req: Request, res: Response): Promise<void> {
    await this.getAllWithQuery(req, res);
  }
}