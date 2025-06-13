// src/modules/employmentType/employmentType.controller.ts

import { EmploymentTypeService } from './employmentType.service';
import { EmploymentTypeEntity } from './employmentType.entity';
import { BaseController } from '../../core/base.controller';
import { employmentTypeSchema } from '../../api/models/schemas/employmentType.schema';
import { sendErrorResponse, sendListResponse } from '../../core/response.util';
import { Request, Response } from 'express';


export class EmploymentTypeController extends BaseController<EmploymentTypeEntity> {
  constructor(private readonly employmentTypeService: EmploymentTypeService) {
    super(
      employmentTypeService,
      employmentTypeSchema,
      [], // no relations
      ['name', 'nameEn', 'nameGu', 'code'] // searchable fields
    );
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const items = await this.service.getAll();

      sendListResponse(res, this.schema, items);
    } catch (error: any) {
      sendErrorResponse(res, error.message || 'Error fetching Employment Types', 400);
    }
  }

  async listWithQuery(req: Request, res: Response): Promise<void> {
    await this.getAllWithQuery(req, res);
  }
}