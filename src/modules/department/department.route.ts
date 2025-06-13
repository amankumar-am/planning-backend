// src/modules/department/department.route.ts

import { Router } from 'express';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { DepartmentRepository } from './department.repository';

const repository = new DepartmentRepository();
const service = new DepartmentService(repository);
const controller = new DepartmentController(service);

const router = Router();

// Standard CRUD operations
router.get('/', controller.list.bind(controller));
router.get('/query', controller.listWithQuery.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

// Custom department routes
router.get('/dashboard/global/total-departments', controller.getTotalDepartments.bind(controller));

export default router;