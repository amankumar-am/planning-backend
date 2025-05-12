// src/modules/gpVillage/gpvillage.route.ts

import { createModuleRouter } from '../../core/module.factory';



import { GpVillageController } from './gpVillage.controller';
import { GpVillageRepository } from './gpVillage.repository';
import { GpVillageService } from './gpVillage.service';

const repository = new GpVillageRepository();
const service = new GpVillageService(repository);
const controller = new GpVillageController(service);

export default createModuleRouter(controller, '/gpVillages');