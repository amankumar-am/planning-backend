// src/modules/beneficiary-group/beneficiaryGroup.route.ts

import { BaseRepository } from '../../core/base.repository';
import { createModuleRouter } from '../../core/module.factory';
import { BeneficiaryGroupController } from './beneficiaryGroup.controller';
import { BeneficiaryGroup } from './beneficiaryGroup.entity';
import { BeneficiaryGroupRepository } from './beneficiaryGroup.repository';
import { BeneficiaryGroupService } from './beneficiaryGroup.service';

const repository = new BeneficiaryGroupRepository();
const service = new BeneficiaryGroupService(repository);
const controller = new BeneficiaryGroupController(service);

const router = createModuleRouter(controller, '');

export default router;