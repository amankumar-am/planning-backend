// src/modules/officeLevel/officeLevel.route.ts

import { Router } from 'express';
import { OfficeLevelController } from './officeLevel.controller';
import { OfficeLevelService } from './officeLevel.service';
import { OfficeLevelRepository } from './officeLevel.repository';

const repository = new OfficeLevelRepository();
const service = new OfficeLevelService(repository);
const controller = new OfficeLevelController(service);

const router = Router();

router.get('/', controller.list.bind(controller));
router.get('/query', controller.listWithQuery.bind(controller));
// Add more explicit routes as needed

export default router;