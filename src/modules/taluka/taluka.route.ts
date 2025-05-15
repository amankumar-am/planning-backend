// src/modules/taluka/taluka.route.ts

import { createModuleRouter } from '../../core/module.factory';
import { TalukaController } from './taluka.controller';
import { TalukaService } from './taluka.service';
import { TalukaRepository } from './taluka.repository';

const repository = new TalukaRepository();
const service = new TalukaService(repository);
const controller = new TalukaController(service);

const router = createModuleRouter(controller, '');
router.get('/district/:districtId', controller.getByDistrictId.bind(controller));

export default router;