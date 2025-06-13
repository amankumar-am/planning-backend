// src/modules/mpmla/mpmla.controller.ts
import { Request, Response } from 'express';
import { sendListResponse, sendErrorResponse } from '../../core/response.util';
import { MpmlaService } from './mpmla.service';
import { MpmlaEntity } from './mpmla.entity';
import { BaseController } from '../../core/base.controller';
import { mpmlaSchema } from '../../api/models/schemas/mpmla.schema';


export class MpmlaController extends BaseController<MpmlaEntity> {

  constructor(private readonly mpmlaService: MpmlaService) {
    super(
      mpmlaService,
      mpmlaSchema,
      ['legislativeConstituency', 'parliamentaryConstituency'], // relations
      ['name', 'nameEn', 'nameGu', 'code'] // searchable fields
    );
  }

  // async getByRelatedId(req: Request, res: Response): Promise<void> {
  //   try {
  //     const talukaId = parseInt(req.params.talukaId);
  //     if (isNaN(talukaId)) {
  //       throw new Error('Invalid taluka ID');
  //     }
  //     const mpmlas = await this.mpmlaService.findByTalukaId(talukaId);
  //     // Map taluka to string and prant to string
  //     const mappedMpmlas = mpmlas.map(mpmla => ({
  //       ...mpmla,
  //       legislativeConstituency: mpmla.legislativeConstituency || '',
  //       parliamentaryConstituency: mpmla.parliamentaryConstituency || '',
  //     }));
  //     sendListResponse(res, this.schema, mappedMpmlas);
  //   } catch (error: any) {
  //     sendErrorResponse(res, error.message || 'Error fetching mpmlas', 400);
  //   }
  // }

  // async getTotalMpmlas(req: Request, res: Response): Promise<void> {
  //   try {
  //     const districtId = parseInt(req.params.districtId);
  //     if (isNaN(districtId)) {
  //       throw new Error('Invalid district ID');
  //     }
  //     const totalMpmlas = await this.mpmlaService.totalCount();

  //     res.json({ title: 'Total Mpmlas', uniqueCount: totalMpmlas });
  //   } catch (error: any) {
  //     sendErrorResponse(res, error.message || 'Error fetching total mpmlas', 400);
  //   }
  // }

  // Override the list endpoint to map district and prant to string values
  async list(req: Request, res: Response): Promise<void> {
    try {
      const mpmlas = await this.mpmlaService.findAllWithRelations();
      const mappedMpmlas = mpmlas.map(mpmla => ({
        ...mpmla,
        legislativeConstituency: mpmla.legislativeConstituency || null,
        parliamentaryConstituency: mpmla.parliamentaryConstituency || null,
      }));
      sendListResponse(res, this.schema, mappedMpmlas);
    } catch (error: any) {
      sendErrorResponse(res, error.message || 'Error fetching mpmlas', 400);
    }
  }

  async listWithQuery(req: Request, res: Response): Promise<void> {
    await this.getAllWithQuery(req, res);
  }
}