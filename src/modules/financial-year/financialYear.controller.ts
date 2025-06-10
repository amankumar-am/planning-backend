// src/modules/financial-year/financialYear.controller.ts

import { BaseController } from '../../core/base.controller';
import { FinancialYearService } from './financialYear.service';
import { FinancialYear } from './financialYear.entity';
import { financialYearSchema } from '../../api/models/schemas/financial-year.schema';
import { sendErrorResponse, sendListResponse } from '../../core/response.util';
import { Request, Response } from 'express';



export class FinancialYearController extends BaseController<FinancialYear> {
    constructor(financialYearService: FinancialYearService) {
        super(financialYearService, financialYearSchema);
    }

    async list(req: Request, res: Response): Promise<void> {
        try {
            const items = await this.service.getAll();
            sendListResponse(res, this.schema, items);
        } catch (error: any) {
            sendErrorResponse(res, error.message || 'Error fetching financial years', 400);
        }
    }
}