// src/modules/prant/prant.route.ts

import { Router } from 'express';
import { PrantController } from './prant.controller';
import { PrantService } from './prant.service';
import { PrantRepository } from './prant.repository';

const repository = new PrantRepository();
const service = new PrantService(repository);
const controller = new PrantController(service);

const router = Router();

// Standard CRUD operations
router.get('/', controller.list.bind(controller));
router.get('/query', controller.listWithQuery.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;