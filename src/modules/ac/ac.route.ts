// src/modules/ac/ac.route.ts

import { Router } from 'express';
import { ACController } from './ac.controller';
import { ACService } from './ac.service';
import { ACRepository } from './ac.repository';

const repository = new ACRepository();
const service = new ACService(repository);
const controller = new ACController(service);

const router = Router();

// Standard CRUD operations
router.get('/', controller.list.bind(controller));
router.get('/query', controller.listWithQuery.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

// Custom AC routes
router.get('/district/:districtId', controller.getByDistrictId.bind(controller));
router.get('/dashboard/global/district/:districtId/total-acs', controller.getTotalACs.bind(controller));

export default router;