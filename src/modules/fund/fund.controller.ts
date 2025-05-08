// src/modules/fund/fund.controller.ts

import { BaseController } from '../../core/base.controller';
import { FundService } from './fund.service';
import { Fund } from './fund.entity';
import { fundSchema } from '../../api/models/schemas/fund.schema';


export class FundController extends BaseController<Fund> {
    constructor(fundService: FundService) {
        super(fundService, fundSchema);
    }
}