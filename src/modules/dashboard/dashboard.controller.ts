// src/modules/dashboard/dashboard.controller.ts


import { UniqueCountResponse, ChartDataResponse, PlanningStage1Service, ApiAvailableFinancialYearDto, GlobalCountResponse } from './dashboard.service';
import { PlanningStage1Entity } from './dashboard.entity';
import { BaseController } from '../../core/base.controller';
import { PlanningStage1Schema } from '../../api/models/schemas/dashboard.schema';
import { NextFunction, Request, Response } from 'express';

const ALLOWED_DASHBOARD_COLUMNS = ['fund', 'taluka', 'sector', 'stage', 'total_count'] as const;
type AllowedDashboardColumn = Exclude<typeof ALLOWED_DASHBOARD_COLUMNS[number], 'total_count'>;

function isValidDashboardColumn(column: string): column is typeof ALLOWED_DASHBOARD_COLUMNS[number] {
  return ALLOWED_DASHBOARD_COLUMNS.includes(column as typeof ALLOWED_DASHBOARD_COLUMNS[number]);
}

export class PlanningStage1Controller extends BaseController<PlanningStage1Entity> {
  constructor(private readonly planningStage1Service: PlanningStage1Service) {
    super(planningStage1Service, PlanningStage1Schema);
  }

  public getPS1ByFy = async (req: Request, res: Response, next: NextFunction): Promise<void> => { // Explicitly Promise<void>
    try {
      const fyId = parseInt(req.params.fy, 10);
      if (isNaN(fyId)) {
        res.status(400).json({ message: "Invalid financial year ID." }); // Don't return this
        return; // Explicit return to satisfy Promise<void> if an early exit
      }
      // Replace with actual logic
      res.json({ message: `Placeholder for getPS1ByFy with FY ID: ${fyId}.` });
    } catch (error) {
      next(error);
    }
  }

  public getDashboardUniqueCount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const financialYearId = parseInt(req.params.fyId, 10);
      const columnName = req.params.columnName;
      const stageIdRaw = req.params.stageId;
      const title = req.query.title as string | undefined;

      if (isNaN(financialYearId)) {
        res.status(400).json({ message: "Invalid financial year ID." });
        return;
      }
      if (!isValidDashboardColumn(columnName)) {
        res.status(400).json({ message: `Invalid column name for count: ${columnName}.Allowed: ${ALLOWED_DASHBOARD_COLUMNS.join(', ')} ` });
        return;
      }

      if (columnName === 'total_count') {
        const count = await this.planningStage1Service.getTotalRecordsCountByFinancialYear(financialYearId);
        res.json({ uniqueCount: count, title: title || 'Total Records' });
        return;
      }

      if (columnName === 'stage' && stageIdRaw !== undefined) {
        const stageId = parseInt(stageIdRaw, 10);
        if (isNaN(stageId) || stageId < 1 || stageId > 12) {
          res.status(400).json({ message: 'Invalid stageId. Must be an integer between 1 and 12.' });
          return;
        }
        const count = await this.planningStage1Service.getCountByStageAndFinancialYear(stageId, financialYearId);
        res.json({ uniqueCount: count, title: title || `Total Records for Stage ${stageId}` });
        return;
      }

      const result: UniqueCountResponse = await this.planningStage1Service.getUniqueCountForDashboard(
        columnName as AllowedDashboardColumn,
        financialYearId,
        title
      );
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  public getDashboardChartData = async (req: Request, res: Response, next: NextFunction): Promise<void> => { // Explicitly Promise<void>
    try {
      const financialYearId = parseInt(req.params.fyId, 10);
      const groupByColumn = req.params.groupByColumn;
      const title = req.query.title as string | undefined;
      const xAxisTitle = req.query.xAxisTitle as string | undefined;
      if (isNaN(financialYearId)) {
        res.status(400).json({ message: "Invalid financial year ID." }); // Don't return
        return; // Explicit return
      }
      if (!isValidDashboardColumn(groupByColumn)) {
        res.status(400).json({ message: `Invalid column name for chart grouping: ${groupByColumn}.Allowed: ${ALLOWED_DASHBOARD_COLUMNS.join(', ')} ` }); // Don't return
        return; // Explicit return
      }

      const result: ChartDataResponse = await this.planningStage1Service.getChartDataForDashboard(
        groupByColumn as AllowedDashboardColumn,
        financialYearId,
        title,
        xAxisTitle
      );
      res.json(result); // Don't return
    } catch (error) {
      next(error);
    }
  }

  public getGlobalTotalRecords = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result: GlobalCountResponse = await this.planningStage1Service.getGlobalTotalRecords();
      // The Angular service expects { uniqueCount: number, title: string } based on ApiUniqueCountResponse
      // Let's adapt the response to match that or change Angular's expectation.
      // For now, adapting here:
      res.json({ uniqueCount: result.count, title: result.title });
    } catch (error) {
      next(error);
    }
  }

  public getGlobalDistinctFinancialYears = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result: GlobalCountResponse = await this.planningStage1Service.getGlobalDistinctFinancialYearsCount();
      // Adapt response:
      res.json({ uniqueCount: result.count, title: result.title });
    } catch (error) {
      next(error);
    }
  }

  public getAvailableFinancialYears = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result: ApiAvailableFinancialYearDto[] = await this.planningStage1Service.getApiAvailableFinancialYears();
      res.json(result); // This directly matches Angular's ApiAvailableFinancialYear[]
    } catch (error) {
      next(error);
    }
  }
}