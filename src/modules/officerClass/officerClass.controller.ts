// src/modules/officerClass/officerClass.controller.ts

import { OfficerClassService } from './officerClass.service';
import { OfficerClassEntity } from './officerClass.entity';
import { BaseController } from '../../core/base.controller';
import { officerClassSchema } from '../../api/models/schemas/officerClass.schema';
import { sendErrorResponse, sendListResponse } from '../../core/response.util';
import { Request, Response } from 'express';


export class OfficerClassController extends BaseController<OfficerClassEntity> {
  constructor(private readonly officerClassService: OfficerClassService) {
    super(officerClassService, officerClassSchema);
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