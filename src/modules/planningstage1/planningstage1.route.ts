// src/modules/planningstage1/planningstage1.route.ts

import { createModuleRouter } from '../../core/module.factory';
import { PlanningStage1Controller } from './planningstage1.controller';
import { PlanningStage1Service } from './planningstage1.service';
import { PlanningStage1Repository } from './planningstage1.repository';

const repository = new PlanningStage1Repository();
const service = new PlanningStage1Service(repository);
const controller = new PlanningStage1Controller(service);

export default createModuleRouter(controller, '');