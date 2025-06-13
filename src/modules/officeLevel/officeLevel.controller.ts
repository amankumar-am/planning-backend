// src/modules/officeLevel/officeLevel.controller.ts

import { OfficeLevelService } from './officeLevel.service';
import { OfficeLevelEntity } from './officeLevel.entity';
import { BaseController } from '../../core/base.controller';
import { officeLevelSchema } from '../../api/models/schemas/officeLevel.schema';
import { sendErrorResponse, sendListResponse } from '../../core/response.util';
import { Request, Response } from 'express';


export class OfficeLevelController extends BaseController<OfficeLevelEntity> {
  constructor(private readonly officeLevelService: OfficeLevelService) {
    super(
      officeLevelService,
      officeLevelSchema,
      [], // no relations
      ['name', 'nameEn', 'nameGu', 'code'] // searchable fields
    );
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const items = await this.service.getAll();

      sendListResponse(res, this.schema, items);
    } catch (error: any) {
      sendErrorResponse(res, error.message || 'Error fetching Office Levels', 400);
    }
  }

  async listWithQuery(req: Request, res: Response): Promise<void> {
    await this.getAllWithQuery(req, res);
  }
}