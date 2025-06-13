// src/modules/employmentType/employmentType.route.ts

import { Router } from 'express';
import { EmploymentTypeController } from './employmentType.controller';
import { EmploymentTypeService } from './employmentType.service';
import { EmploymentTypeRepository } from './employmentType.repository';

const repository = new EmploymentTypeRepository();
const service = new EmploymentTypeService(repository);
const controller = new EmploymentTypeController(service);

const router = Router();

// Standard CRUD operations
router.get('/', controller.list.bind(controller));
router.get('/query', controller.listWithQuery.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;