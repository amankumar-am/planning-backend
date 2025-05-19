// src/modules/planningstage1/planningstage1.route.ts

import { createModuleRouter } from '../../core/module.factory';
import { PlanningStage1Controller } from './planningstage1.controller';
import { PlanningStage1Service } from './planningstage1.service';
import { PlanningStage1Repository } from './planningstage1.repository';
import { Router } from 'express';

const repository = new PlanningStage1Repository();
const service = new PlanningStage1Service(repository);
const controller = new PlanningStage1Controller(service);

const router: Router = createModuleRouter(controller, '');

router.get('/dashboard/global/total-records', controller.getGlobalTotalRecords);
router.get('/dashboard/global/distinct-financial-years', controller.getGlobalDistinctFinancialYears);
router.get('/dashboard/available-financial-years', controller.getAvailableFinancialYears);
router.get('/dashboard/count/:fyId/:columnName/:stageId', controller.getDashboardUniqueCount.bind(controller)); // For stage with stageId
router.get('/dashboard/count/:fyId/:columnName', controller.getDashboardUniqueCount.bind(controller)); // For all other columns
router.get('/dashboard/chart/:fyId/:groupByColumn', controller.getDashboardChartData.bind(controller));

export default router;