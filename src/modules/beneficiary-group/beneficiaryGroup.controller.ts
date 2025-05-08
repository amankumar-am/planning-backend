// src/modules/beneficiary-group/beneficiaryGroup.controller.ts

import { BaseController } from '../../core/base.controller';
import { BeneficiaryGroup } from './beneficiaryGroup.entity';
import { BeneficiaryGroupService } from './beneficiaryGroup.service';
import { beneficiaryGroupSchema } from '../../api/models/schemas/beneficiary-group.schema';


export class BeneficiaryGroupController extends BaseController<BeneficiaryGroup> {
    constructor(bgService: BeneficiaryGroupService) {
        super(bgService, beneficiaryGroupSchema);
    }
}