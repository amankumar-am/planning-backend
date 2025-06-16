// src/modules/taluka/taluka.controller.ts
import { Request, Response } from 'express';
import { sendListResponse, sendErrorResponse } from '../../core/response.util';
import { TalukaService } from './taluka.service';
import { TalukaEntity } from './taluka.entity';
import { BaseController } from '../../core/base.controller';
import { talukaSchema } from '../../api/models/schemas/taluka.schema';


export class TalukaController extends BaseController<TalukaEntity> {

  constructor(private readonly talukaService: TalukaService) {
    super(
      talukaService,
      talukaSchema,
      ['district', 'prant'], // relations
      ['name', 'nameEn', 'nameGu', 'code'] // searchable fields
    );
  }

  async getByDistrictId(req: Request, res: Response): Promise<void> {
    try {
      const districtId = parseInt(req.params.districtId);
      if (isNaN(districtId)) {
        throw new Error('Invalid district ID');
      }
      const talukas = await this.talukaService.findByDistrictId(districtId);
      // Map district to string and prant to string
      const mappedTalukas = talukas.map(taluka => ({
        ...taluka,
        district: taluka.district?.nameEn || '',
        prant: taluka.prant?.nameEn || '',
      }));
      sendListResponse(res, this.schema, mappedTalukas);
    } catch (error: any) {
      sendErrorResponse(res, error.message || 'Error fetching talukas', 400);
    }
  }

  async getTotalTalukas(req: Request, res: Response): Promise<void> {
    try {
      const districtId = parseInt(req.params.districtId);
      if (isNaN(districtId)) {
        throw new Error('Invalid district ID');
      }
      const totalTalukas = await this.talukaService.totalCount();

      res.json({ title: 'Total Talukas', uniqueCount: totalTalukas });
    } catch (error: any) {
      sendErrorResponse(res, error.message || 'Error fetching total talukas', 400);
    }
  }

  // Override the list endpoint to map district and prant to string values
  async list(req: Request, res: Response): Promise<void> {
    try {
      const talukas = await this.talukaService.findAllWithRelations();
      const mappedTalukas = talukas.map(taluka => ({
        ...taluka,
        district: taluka.district || null,
        prant: taluka.prant || null,
      }));
      sendListResponse(res, this.schema, mappedTalukas);
    } catch (error: any) {
      sendErrorResponse(res, error.message || 'Error fetching talukas', 400);
    }
  }

  async listWithQuery(req: Request, res: Response): Promise<void> {
    await this.getAllWithQuery(req, res);
  }
}