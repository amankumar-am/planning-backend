// src/modules/district/district.controller.ts

import { DistrictService } from './district.service';
import { DistrictEntity } from './district.entity';
import { BaseController } from '../../core/base.controller';
import { districtSchema } from '../../api/models/schemas/district.schema';


export class DistrictController extends BaseController<DistrictEntity> {
  constructor(private readonly districtService: DistrictService) {
    super(districtService, districtSchema);
  }
}