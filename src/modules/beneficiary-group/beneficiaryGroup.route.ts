// src/modules/beneficiary-group/beneficiaryGroup.route.ts

import { Router } from 'express';
import { BeneficiaryGroupController } from './beneficiaryGroup.controller';
import { BeneficiaryGroupService } from './beneficiaryGroup.service';
import { BeneficiaryGroupRepository } from './beneficiaryGroup.repository';

const repository = new BeneficiaryGroupRepository();
const service = new BeneficiaryGroupService(repository);
const controller = new BeneficiaryGroupController(service);

const router = Router();

router.get('/', controller.list.bind(controller));
// Add more explicit routes as needed

export default router;