// src/modules/taluka/taluka.route.ts

import { createModuleRouter } from '../../core/module.factory';
import { TalukaController } from './taluka.controller';
import { TalukaService } from './taluka.service';
import { TalukaRepository } from './taluka.repository';
import { Router } from 'express';

const repository = new TalukaRepository();
const service = new TalukaService(repository);
const controller = new TalukaController(service);

const defaultRouter = createModuleRouter(controller, '/talukas');

const router = Router();
router.get('/', defaultRouter);
router.get('/getTalukasByDistrict/:districtId', controller.getTalukasByDistrict.bind(controller));

