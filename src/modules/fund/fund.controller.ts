// src/modules/fund/fund.controller.ts

import { BaseController } from '../../core/base.controller';
import { FundService } from './fund.service';
import { FundEntity } from './fund.entity';
import { fundSchema } from '../../api/models/schemas/fund.schema';
import { sendErrorResponse, sendListResponse } from '../../core/response.util';
import { Request, Response } from 'express';


export class FundController extends BaseController<FundEntity> {
    constructor(private readonly fundService: FundService) {
        super(
            fundService,
            fundSchema,
            [], // no relations
            ['name', 'nameEn', 'nameGu', 'code'] // searchable fields
        );
    }

    async getTotalFunds(req: Request, res: Response): Promise<void> {
        try {
            const totalFunds = await this.fundService.totalCount();
            res.json({ title: 'Total Funds', uniqueCount: totalFunds });
        } catch (error: any) {
            sendErrorResponse(res, error.message || 'Error fetching total funds', 400);
        }
    }

    async list(req: Request, res: Response): Promise<void> {
        try {
            const items = await this.service.getAll();

            sendListResponse(res, this.schema, items);
        } catch (error: any) {
            sendErrorResponse(res, error.message || 'Error fetching Funds', 400);
        }
    }

    async listWithQuery(req: Request, res: Response): Promise<void> {
        await this.getAllWithQuery(req, res);
    }
}