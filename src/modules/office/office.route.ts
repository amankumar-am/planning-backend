// src/modules/office/office.route.ts

import { Router } from 'express';
import { OfficeController } from './office.controller';
import { OfficeRepository } from './office.repository';
import { OfficeService } from './office.service';

const repository = new OfficeRepository();
const service = new OfficeService(repository);
const controller = new OfficeController(service);

const router = Router();

router.get('/', controller.list.bind(controller));
router.get('/query', controller.listWithQuery.bind(controller));

export default router;