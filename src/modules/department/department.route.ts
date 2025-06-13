// src/modules/department/department.route.ts

import { Router } from 'express';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { DepartmentRepository } from './department.repository';

const repository = new DepartmentRepository();
const service = new DepartmentService(repository);
const controller = new DepartmentController(service);

const router = Router();

router.get('/', controller.list.bind(controller));
router.get('/query', controller.listWithQuery.bind(controller));
// Add more explicit routes as needed

export default router;