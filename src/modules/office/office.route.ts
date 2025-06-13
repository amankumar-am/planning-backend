// src/modules/office/office.route.ts

import { Router } from 'express';
import { OfficeController } from './office.controller';
import { OfficeService } from './office.service';
import { OfficeRepository } from './office.repository';

const repository = new OfficeRepository();
const service = new OfficeService(repository);
const controller = new OfficeController(service);

const router = Router();

// Standard CRUD operations
router.get('/', controller.list.bind(controller));
router.get('/query', controller.listWithQuery.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;