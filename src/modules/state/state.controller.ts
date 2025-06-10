// src/modules/state/state.controller.ts

import { StateService } from './state.service';
import { StateEntity } from './state.entity';
import { BaseController } from '../../core/base.controller';
import { stateSchema } from '../../api/models/schemas/state.schema';
import { sendErrorResponse, sendListResponse } from '../../core/response.util';
import { Request, Response } from 'express';


export class StateController extends BaseController<StateEntity> {
  constructor(private readonly stateService: StateService) {
    super(stateService, stateSchema);
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const items = await this.service.getAll();
      sendListResponse(res, this.schema, items);
    } catch (error: any) {
      sendErrorResponse(res, error.message || 'Error fetching states', 400);
    }
  }
}