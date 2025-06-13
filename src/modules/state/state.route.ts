// src/modules/state/state.route.ts

import { Router } from 'express';
import { StateController } from './state.controller';
import { StateService } from './state.service';
import { StateRepository } from './state.repository';

const repository = new StateRepository();
const service = new StateService(repository);
const controller = new StateController(service);

const router = Router();

// Standard CRUD operations
router.get('/', controller.list.bind(controller));
router.get('/query', controller.listWithQuery.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;