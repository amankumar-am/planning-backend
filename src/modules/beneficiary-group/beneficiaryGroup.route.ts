// src/modules/beneficiary-group/beneficiaryGroup.route.ts

import { Router } from 'express';
import { BeneficiaryGroupController } from './beneficiaryGroup.controller';
import { BeneficiaryGroupService } from './beneficiaryGroup.service';
import { BeneficiaryGroupRepository } from './beneficiaryGroup.repository';

const repository = new BeneficiaryGroupRepository();
const service = new BeneficiaryGroupService(repository);
const controller = new BeneficiaryGroupController(service);

const router = Router();

// Standard CRUD operations
router.get('/', controller.list.bind(controller));
router.get('/query', controller.listWithQuery.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;