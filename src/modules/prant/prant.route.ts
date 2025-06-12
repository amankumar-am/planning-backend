// src/modules/prant/prant.route.ts

import { Router } from 'express';
import { PrantController } from './prant.controller';
import { PrantService } from './prant.service';
import { PrantRepository } from './prant.repository';

const repository = new PrantRepository();
const service = new PrantService(repository);
const controller = new PrantController(service);

const router = Router();

router.get('/', controller.list.bind(controller));
// Add more explicit routes as needed

export default router;