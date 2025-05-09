// src/modules/district/district.route.ts

import { BaseRepository } from '../../core/base.repository';
import { createModuleRouter } from '../../core/module.factory';
import { DistrictController } from './district.controller';
import { DistrictEntity } from './district.entity';
import { DistrictService } from './district.service';

const repository = new BaseRepository(DistrictEntity);
const service = new DistrictService(repository);
const controller = new DistrictController(service);

export default createModuleRouter(controller, '/districts');