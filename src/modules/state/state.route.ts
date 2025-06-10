// src/modules/state/state.route.ts

import { Router } from 'express';
import { StateController } from './state.controller';
import { StateService } from './state.service';
import { StateRepository } from './state.repository';

const repository = new StateRepository();
const service = new StateService(repository);
const controller = new StateController(service);

const router = Router();

router.get('/', controller.list.bind(controller));
// Add more explicit routes as needed

export default router;