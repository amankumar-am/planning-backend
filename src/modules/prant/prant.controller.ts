// src/modules/prant/prant.controller.ts

import { PrantService } from './prant.service';
import { PrantEntity } from './prant.entity';
import { BaseController } from '../../core/base.controller';
import { prantSchema } from '../../api/models/schemas/prant.schema';
import { sendErrorResponse, sendListResponse } from '../../core/response.util';
import { Request, Response } from 'express';


export class PrantController extends BaseController<PrantEntity> {
  constructor(private readonly prantService: PrantService) {
    super(
      prantService,
      prantSchema,
      ['district'], // relations
      ['name', 'nameEn', 'nameGu', 'code'] // searchable fields
    );
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const items = await this.service.getAll();

      sendListResponse(res, this.schema, items);
    } catch (error: any) {
      sendErrorResponse(res, error.message || 'Error fetching Prants', 400);
    }
  }

  async listWithQuery(req: Request, res: Response): Promise<void> {
    await this.getAllWithQuery(req, res);
  }
}