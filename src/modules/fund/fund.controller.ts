// src/modules/fund/fund.controller.ts

import { BaseController } from '../../core/base.controller';
import { FundService } from './fund.service';
import { FundEntity } from './fund.entity';
import { fundSchema } from '../../api/models/schemas/fund.schema';
import { sendErrorResponse } from '../../core/response.util';
import { Request, Response } from 'express';


export class FundController extends BaseController<FundEntity> {
    constructor(private readonly fundService: FundService) {
        super(fundService, fundSchema);
    }

    async getTotalFunds(req: Request, res: Response): Promise<void> {
        try {
            const totalFunds = await this.fundService.totalCount();
            res.json({ title: 'Total Funds', uniqueCount: totalFunds });
        } catch (error: any) {
            sendErrorResponse(res, error.message || 'Error fetching total funds', 400);
        }
    }
}