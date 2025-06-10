// src/modules/beneficiary-group/beneficiaryGroup.controller.ts

import { BaseController } from '../../core/base.controller';
import { BeneficiaryGroup } from './beneficiaryGroup.entity';
import { BeneficiaryGroupService } from './beneficiaryGroup.service';
import { beneficiaryGroupSchema } from '../../api/models/schemas/beneficiary-group.schema';
import { Request, Response } from 'express';
import { sendListResponse, sendErrorResponse } from '../../core/response.util';

export class BeneficiaryGroupController extends BaseController<BeneficiaryGroup> {
    constructor(bgService: BeneficiaryGroupService) {
        super(bgService, beneficiaryGroupSchema);
    }

    async list(req: Request, res: Response): Promise<void> {
        try {
            const items = await this.service.getAll();
            sendListResponse(res, this.schema, items);
        } catch (error: any) {
            sendErrorResponse(res, error.message || 'Error fetching beneficiary groups', 400);
        }
    }
}