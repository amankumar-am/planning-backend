// src/modules/officeLevel/officeLevel.controller.ts

import { OfficeLevelService } from './officeLevel.service';
import { OfficeLevelEntity } from './officeLevel.entity';
import { BaseController } from '../../core/base.controller';
import { officeLevelSchema } from '../../api/models/schemas/officeLevel.schema';
import { sendErrorResponse, sendListResponse } from '../../core/response.util';
import { Request, Response } from 'express';


export class OfficeLevelController extends BaseController<OfficeLevelEntity> {
  constructor(private readonly officeLevelService: OfficeLevelService) {
    super(officeLevelService, officeLevelSchema);
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const items = await this.service.getAll();

      sendListResponse(res, this.schema, items);
    } catch (error: any) {
      sendErrorResponse(res, error.message || 'Error fetching Office Levels', 400);
    }
  }
}