// src/modules/officeLevel/officeLevel.route.ts

import { Router } from 'express';
import { OfficeLevelController } from './officeLevel.controller';
import { OfficeLevelService } from './officeLevel.service';
import { OfficeLevelRepository } from './officeLevel.repository';

const repository = new OfficeLevelRepository();
const service = new OfficeLevelService(repository);
const controller = new OfficeLevelController(service);

const router = Router();

// Standard CRUD operations
router.get('/', controller.list.bind(controller));
router.get('/query', controller.listWithQuery.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;