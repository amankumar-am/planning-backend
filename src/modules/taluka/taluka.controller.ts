// src/modules/taluka/taluka.controller.ts

import { TalukaService } from './taluka.service';
import { TalukaEntity } from './taluka.entity';
import { BaseController } from '../../core/base.controller';
import { talukaSchema } from '../../api/models/schemas/taluka.schema';


export class TalukaController extends BaseController<TalukaEntity> {
  constructor(private readonly talukaService: TalukaService) {
    super(talukaService, talukaSchema);
  }
}