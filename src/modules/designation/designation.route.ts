// src/modules/designation/designation.route.ts

import { Router } from 'express';
import { DesignationController } from './designation.controller';
import { DesignationService } from './designation.service';
import { DesignationRepository } from './designation.repository';

const repository = new DesignationRepository();
const service = new DesignationService(repository);
const controller = new DesignationController(service);

const router = Router();

// Standard CRUD operations
router.get('/', controller.list.bind(controller));
router.get('/query', controller.listWithQuery.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

// Custom designation routes
router.get('/department/:departmentId', controller.getByDepartmentId.bind(controller));
router.get('/dashboard/global/department/:departmentId/total-designations', controller.getTotalDesignations.bind(controller));

export default router;