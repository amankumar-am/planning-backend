// src/modules/officerClass/officerClass.route.ts

import { Router } from 'express';
import { OfficerClassController } from './officerClass.controller';
import { OfficerClassService } from './officerClass.service';
import { OfficerClassRepository } from './officerClass.repository';

const repository = new OfficerClassRepository();
const service = new OfficerClassService(repository);
const controller = new OfficerClassController(service);

const router = Router();

router.get('/', controller.list.bind(controller));
router.get('/query', controller.listWithQuery.bind(controller));
// Add more explicit routes as needed

export default router;