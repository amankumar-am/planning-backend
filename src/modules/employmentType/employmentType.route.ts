// src/modules/employmentType/employmentType.route.ts

import { Router } from 'express';
import { EmploymentTypeController } from './employmentType.controller';
import { EmploymentTypeService } from './employmentType.service';
import { EmploymentTypeRepository } from './employmentType.repository';

const repository = new EmploymentTypeRepository();
const service = new EmploymentTypeService(repository);
const controller = new EmploymentTypeController(service);

const router = Router();

router.get('/', controller.list.bind(controller));
// Add more explicit routes as needed

export default router;