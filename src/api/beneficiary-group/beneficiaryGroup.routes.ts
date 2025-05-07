// src/api/beneficiary-group/beneficiaryGroup.routes.ts
import { Router } from 'express';
import { BeneficiaryGroupController } from './beneficiaryGroup.controller';
import { BeneficiaryGroupService } from './beneficiaryGroup.service';
import { BeneficiaryGroupRepository } from './beneficiaryGroup.repository';

const router = Router();

// Dependency injection
const beneficiaryGroupRepository = new BeneficiaryGroupRepository();
const beneficiaryGroupService = new BeneficiaryGroupService(beneficiaryGroupRepository);
const beneficiaryGroupController = new BeneficiaryGroupController(beneficiaryGroupService);

// Routes
router.get('/', beneficiaryGroupController.getAllBeneficiaryGroups.bind(beneficiaryGroupController));
router.get('/:id', beneficiaryGroupController.getBeneficiaryGroupById.bind(beneficiaryGroupController));
router.post('/', beneficiaryGroupController.createBeneficiaryGroup.bind(beneficiaryGroupController));
router.put('/:id', beneficiaryGroupController.updateBeneficiaryGroup.bind(beneficiaryGroupController));
router.delete('/:id', beneficiaryGroupController.deleteBeneficiaryGroup.bind(beneficiaryGroupController));

export default router;