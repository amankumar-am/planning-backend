// src/modules/dashboard/planningstage1.route.ts

import { Router } from 'express';
import { PlanningStage1Controller } from './dashboard.controller';
import { PlanningStage1Service } from './dashboard.service';
import { PlanningStage1Repository } from './dashboard.repository';

const repository = new PlanningStage1Repository();
const service = new PlanningStage1Service(repository);
const controller = new PlanningStage1Controller(service);

const router = Router();

router.get('/dashboard/global/total-records', controller.getGlobalTotalRecords);
router.get('/dashboard/global/distinct-financial-years', controller.getGlobalDistinctFinancialYears);
router.get('/dashboard/available-financial-years', controller.getAvailableFinancialYears);
router.get('/dashboard/count/:fyId/:columnName/:stageId', controller.getDashboardUniqueCount.bind(controller)); // For stage with stageId
router.get('/dashboard/count/:fyId/:columnName', controller.getDashboardUniqueCount.bind(controller)); // For all other columns
router.get('/dashboard/chart/:fyId/:groupByColumn', controller.getDashboardChartData.bind(controller));
export default router;