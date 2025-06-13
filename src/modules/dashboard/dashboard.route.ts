// src/modules/dashboard/dashboard.route.ts

import { Router } from 'express';
import { PlanningStage1Controller } from './dashboard.controller';
import { PlanningStage1Service } from './dashboard.service';
import { PlanningStage1Repository } from './dashboard.repository';

const repository = new PlanningStage1Repository();
const service = new PlanningStage1Service(repository);
const controller = new PlanningStage1Controller(service);

const router = Router();

router.get('/query', controller.listWithQuery.bind(controller));
router.get('/ps1/:fy', controller.getPS1ByFy.bind(controller));
router.get('/global/total-records', controller.getGlobalTotalRecords.bind(controller));
router.get('/global/distinct-financial-years', controller.getGlobalDistinctFinancialYears.bind(controller));
router.get('/available-financial-years', controller.getAvailableFinancialYears.bind(controller));
router.get('/:fyId/:columnName', controller.getDashboardUniqueCount.bind(controller));
router.get('/:fyId/:columnName/:stageId', controller.getDashboardUniqueCount.bind(controller));
router.get('/chart/:fyId/:groupByColumn', controller.getDashboardChartData.bind(controller));

export default router;