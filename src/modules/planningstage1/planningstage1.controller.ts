import { PlanningStage1Service } from './planningstage1.service';
import { PlanningStage1Entity } from './planningstage1.entity';
import { BaseController } from '../../core/base.controller';
import { PlanningStage1Schema } from '../../api/models/schemas/planningstage1.schema';

export class PlanningStage1Controller extends BaseController<PlanningStage1Entity> {
  constructor(private readonly planningStage1Service: PlanningStage1Service) {
    super(planningStage1Service, PlanningStage1Schema);
  }
}