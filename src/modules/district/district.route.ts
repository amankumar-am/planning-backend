// src/modules/district/district.route.ts

import { Router } from 'express';
import { DistrictController } from './district.controller';
import { DistrictService } from './district.service';
import { DistrictRepository } from './district.repository';

const repository = new DistrictRepository();
const service = new DistrictService(repository);
const controller = new DistrictController(service);

const router = Router();

// Standard CRUD operations
router.get('/', controller.list.bind(controller));
router.get('/query', controller.listWithQuery.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;