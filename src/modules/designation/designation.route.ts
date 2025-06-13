// src/modules/designation/designation.route.ts

import { Router } from 'express';
import { DesignationController } from './designation.controller';
import { DesignationService } from './designation.service';
import { DesignationRepository } from './designation.repository';

const repository = new DesignationRepository();
const service = new DesignationService(repository);
const controller = new DesignationController(service);

const router = Router();

router.get('/', controller.list.bind(controller));
router.get('/query', controller.listWithQuery.bind(controller));
router.get('/department/:departmentId', controller.getByDepartmentId.bind(controller));
router.get('/dashboard/global/department/:departmentId/total-designations', controller.getTotalDesignations.bind(controller));

export default router;