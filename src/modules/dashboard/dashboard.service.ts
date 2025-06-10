// src/modules/dashboard/dashboard.service.ts

import { BaseService } from '../../core/base.service';
import { PlanningStage1Entity } from './dashboard.entity';
import { ChartDataPoint, PlanningStage1Repository, ApiAvailableFinancialYearDto } from './dashboard.repository';
import { CreatePlanningStage1Dto, UpdatePlanningStage1Dto } from './dashboard.type';

export interface UniqueCountResponse {
  uniqueCount: number;
  title: string;
}

export interface ChartDataResponse {
  data: ChartDataPoint[];
  title: string;
  xAxisTitle: string; // Or derive this from columnName
  // chartType?: string; // Frontend can decide this, or you can suggest one
}

export interface GlobalCountResponse { // Similar to UniqueCountResponse, but for global counts
  count: number;
  title: string;
}

export { ApiAvailableFinancialYearDto };
function generateTitle(columnName: string, type: 'count' | 'chart'): string {
  const friendlyName = columnName.charAt(0).toUpperCase() + columnName.slice(1);
  if (type === 'count') {
    return `Total Unique ${friendlyName}s`;
  }
  return `${friendlyName} Distribution`;
}

export class PlanningStage1Service extends BaseService<PlanningStage1Entity> {
  constructor(private readonly planningStage1Repository: PlanningStage1Repository) {
    super(planningStage1Repository);
  }

  async create(dto: CreatePlanningStage1Dto): Promise<PlanningStage1Entity> {
    return this.planningStage1Repository.create({
      ...dto,
      isActive: dto.isActive ?? true,
      createdBy: dto.createdBy ?? 'system',
      createdAt: dto.createdAt ?? new Date(),
      modifiedBy: dto.modifiedBy ?? 'system',
      modifiedAt: dto.modifiedAt ?? null,
    });
  }

  async update(id: number, dto: UpdatePlanningStage1Dto): Promise<PlanningStage1Entity> {
    const planningStage1 = await this.planningStage1Repository.findOneOrFail({ where: { id } });
    Object.assign(planningStage1, {
      ...dto,
      modifiedBy: dto.modifiedBy,
      modifiedAt: dto.modifiedAt,
    });
    return this.planningStage1Repository.save(planningStage1);
  }

  async findAll(): Promise<PlanningStage1Entity[]> {
    const planningStage1s = await this.planningStage1Repository.findAll();
    return planningStage1s;
  }

  async findOne(id: number): Promise<PlanningStage1Entity> {
    const planningStage1 = await this.planningStage1Repository.findById(id);
    if (!planningStage1) {
      throw new Error(`PlanningStage1 with id ${id} not found`);
    }
    return planningStage1;
  }

  async getUniqueCountForDashboard(
    columnName: 'fund' | 'taluka' | 'sector' | 'stage',
    financialYearId: number,
    title?: string // Optional title override
  ): Promise<UniqueCountResponse> {
    const count = await this.planningStage1Repository.getUniqueCountByFinancialYear(columnName, financialYearId);
    return {
      uniqueCount: count,
      title: title || generateTitle(columnName, 'count'),
    };
  }

  async getChartDataForDashboard(
    groupByColumn: 'fund' | 'taluka' | 'sector' | 'stage',
    financialYearId: number,
    title?: string, // Optional title override
    xAxisTitle?: string // Optional xAxisTitle override
  ): Promise<ChartDataResponse> {
    const data = await this.planningStage1Repository.getAggregatedDataByFinancialYear(groupByColumn, financialYearId);
    const defaultTitle = generateTitle(groupByColumn, 'chart');
    const defaultXAxisTitle = groupByColumn.charAt(0).toUpperCase() + groupByColumn.slice(1);

    return {
      data,
      title: title || defaultTitle,
      xAxisTitle: xAxisTitle || defaultXAxisTitle,
    };
  }

  async getGlobalTotalRecords(): Promise<GlobalCountResponse> {
    const count = await this.planningStage1Repository.getTotalRecordsCount();
    return {
      count: count,
      title: "Total Records" // Title can be set here or passed from controller
    };
  }

  async getGlobalDistinctFinancialYearsCount(): Promise<GlobalCountResponse> {
    const count = await this.planningStage1Repository.getDistinctFinancialYearsCountInPlanningStage1();
    return {
      count: count,
      title: "Financial Years Covered"
    };
  }

  async getApiAvailableFinancialYears(): Promise<ApiAvailableFinancialYearDto[]> {
    return this.planningStage1Repository.getAvailableFinancialYears();
  }

  async getTotalRecordsCountByFinancialYear(financialYearId: number): Promise<number> {
    return this.planningStage1Repository.countByFinancialYear(financialYearId);
  }

  async getCountByStageAndFinancialYear(stageId: number, financialYearId: number): Promise<number> {
    return this.planningStage1Repository.countByStageAndFinancialYear(stageId, financialYearId);
  }


}