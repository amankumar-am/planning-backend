// src/modules/officerClass/officerClass.route.ts

import { Router } from 'express';
import { OfficerClassController } from './officerClass.controller';
import { OfficerClassService } from './officerClass.service';
import { OfficerClassRepository } from './officerClass.repository';

const repository = new OfficerClassRepository();
const service = new OfficerClassService(repository);
const controller = new OfficerClassController(service);

const router = Router();

// Standard CRUD operations
router.get('/', controller.list.bind(controller));
router.get('/query', controller.listWithQuery.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;