// src/modules/district/district.route.ts

import { Router } from 'express';
import { DistrictController } from './district.controller';
import { DistrictService } from './district.service';
import { DistrictRepository } from './district.repository';

const repository = new DistrictRepository();
const service = new DistrictService(repository);
const controller = new DistrictController(service);

const router = Router();

router.get('/', controller.list.bind(controller));
router.get('/query', controller.listWithQuery.bind(controller));
// Add more explicit routes as needed

export default router;