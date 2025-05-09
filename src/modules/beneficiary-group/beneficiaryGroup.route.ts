// src/modules/beneficiary-group/beneficiaryGroup.route.ts

import { BaseRepository } from '../../core/base.repository';
import { createModuleRouter } from '../../core/module.factory';
import { BeneficiaryGroupController } from './beneficiaryGroup.controller';
import { BeneficiaryGroup } from './beneficiaryGroup.entity';
import { BeneficiaryGroupService } from './beneficiaryGroup.service';

const bgRepository = new BaseRepository(BeneficiaryGroup);
const bgService = new BeneficiaryGroupService(bgRepository);
const bgController = new BeneficiaryGroupController(bgService);

export default createModuleRouter(bgController, '/bg');