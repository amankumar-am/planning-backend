// src/modules/gpVillage/gpVillage.controller.ts



import { gpVillageSchema } from '../../api/models/schemas/gpVillage.schema';
import { BaseController } from '../../core/base.controller';
import { GpVillageEntity } from './gpVillage.entity';
import { GpVillageService } from './gpVillage.service';



export class GpVillageController extends BaseController<GpVillageEntity> {
  constructor(private readonly gpVillageService: GpVillageService) {
    super(gpVillageService, gpVillageSchema);
  }
}