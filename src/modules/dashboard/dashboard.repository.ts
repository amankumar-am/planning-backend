// src/modules/dashboard/planningstage1.repository.ts

import { PlanningStage1Entity } from './dashboard.entity';
import { BaseRepository } from '../../core/base.repository';
import { Brackets, Repository } from 'typeorm';
import { AppDataSource } from '../../config/database';

export interface ChartDataPoint {
  label: string | number; // The value of the grouped column (e.g., fund name, stage number)
  value: number;         // The count
}

export interface ApiAvailableFinancialYearDto { // DTO for the API response
  id: number | string; // Match the type of FinancialYear.id
  name: string;
}

// Define allowed column names for dynamic queries to prevent SQL injection
const ALLOWED_AGGREGATION_COLUMNS = ['fund', 'taluka', 'sector', 'stage'];
const ALLOWED_COUNT_COLUMNS = ['fund', 'taluka', 'sector', 'stage']; // Can be different if needed

export class PlanningStage1Repository extends BaseRepository<PlanningStage1Entity> {
  private typeOrmRepository: Repository<PlanningStage1Entity>;
  constructor() {
    super(PlanningStage1Entity);
    this.typeOrmRepository = AppDataSource.getRepository(PlanningStage1Entity);
  }

  async findAll(): Promise<PlanningStage1Entity[]> {
    return this.repository.find({
      relations: ['financialYear', 'fund', 'taluka', 'sector'], // Specify relations to load
    });
  }

  async findById(id: number): Promise<PlanningStage1Entity | null> {
    return this.repository.findOne({
      where: { id } as any,
      relations: ['financialYear', 'fund', 'taluka', 'sector'], // Specify relations to load
    });
  }

  async getUniqueCountByFinancialYear(
    columnName: keyof PlanningStage1Entity | 'fund' | 'taluka' | 'sector', // More type-safe
    financialYearId: number
  ): Promise<number> {
    if (!ALLOWED_COUNT_COLUMNS.includes(columnName as string)) {
      throw new Error(`Counting by column '${columnName}' is not allowed.`);
    }

    const query = this.typeOrmRepository.createQueryBuilder("ps1")
      .innerJoin("ps1.financialYear", "fy", "fy.id = :financialYearId", { financialYearId });

    let distinctColumnExpression: string;

    // Map user-friendly names to actual entity properties or relations
    switch (columnName) {
      case 'fund':
        distinctColumnExpression = "ps1.fund"; // Counts distinct fund IDs
        break;
      case 'taluka':
        distinctColumnExpression = "ps1.taluka"; // Counts distinct taluka IDs
        break;
      case 'sector':
        distinctColumnExpression = "ps1.sector"; // Counts distinct sector IDs
        break;
      case 'stage':
        distinctColumnExpression = "ps1.stage";
        break;
      default:
        // This case might be needed if columnName is a direct property of PlanningStage1Entity
        // and not one of the specific relations we handle above.
        // For safety, ensure it's a valid column of PlanningStage1Entity.
        // This example focuses on the specified relational columns.
        throw new Error(`Unsupported column for unique count: ${String(columnName)}`);
    }

    // If you want to count distinct related *entities* (e.g. how many unique funds were involved)
    // and not just distinct IDs in the PS1_Fund column, you'd join and count distinct IDs from the related table.
    // For this example, we are counting distinct foreign key values in Planning_Stage1.
    // Example: COUNT(DISTINCT PS1_Fund)

    query.select(`COUNT(DISTINCT ${distinctColumnExpression})`, "uniqueCount");

    const result = await query.getRawOne();
    return result ? parseInt(result.uniqueCount, 10) : 0;
  }

  async getAggregatedDataByFinancialYear(
    groupByColumn: 'fund' | 'taluka' | 'sector' | 'stage',
    financialYearId: number
  ): Promise<ChartDataPoint[]> {
    if (!ALLOWED_AGGREGATION_COLUMNS.includes(groupByColumn)) {
      throw new Error(`Aggregation by column '${groupByColumn}' is not allowed.`);
    }

    const query = this.typeOrmRepository.createQueryBuilder("ps1")
      .select("COUNT(ps1.id)", "value")
      .innerJoin("ps1.financialYear", "fy", "fy.id = :financialYearId", { financialYearId });

    switch (groupByColumn) {
      case 'fund':
        query.innerJoin("ps1.fund", "fund_entity") // Join with FundEntity
          .addSelect("fund_entity.name", "label") // Select the name from FundEntity
          .groupBy("fund_entity.name");
        break;
      case 'taluka':
        query.innerJoin("ps1.taluka", "taluka_entity")
          .addSelect("taluka_entity.name", "label")
          .groupBy("taluka_entity.name");
        break;
      case 'sector':
        query.innerJoin("ps1.sector", "sector_entity")
          .addSelect("sector_entity.name", "label")
          .groupBy("sector_entity.name");
        break;
      case 'stage':
        query.addSelect("ps1.stage", "label") // Stage is a direct column
          .groupBy("ps1.stage");
        break;
      default:
        throw new Error(`Unsupported column for aggregation: ${groupByColumn}`);
    }

    query.orderBy("value", "DESC"); // Optional: order by count

    return query.getRawMany<ChartDataPoint>();
  }

  async getTotalRecordsCount(): Promise<number> {
    return this.typeOrmRepository.count();
  }

  async getDistinctFinancialYearsCountInPlanningStage1(): Promise<number> {
    // Counts distinct financial year IDs present in the Planning_Stage1 table
    const result = await this.typeOrmRepository.createQueryBuilder("ps1")
      .select("COUNT(DISTINCT ps1.financialYear)", "distinctCount") // Assumes ps1.financialYear is the foreign key column name or relation ID
      .getRawOne();
    return result && result.distinctCount ? parseInt(result.distinctCount, 10) : 0;
  }

  async getAvailableFinancialYears(): Promise<ApiAvailableFinancialYearDto[]> {
    // This method could fetch ALL financial years from the FinancialYear table,
    // or only those referenced in PlanningStage1. Let's fetch all distinct ones
    // that are actually *used* in PlanningStage1 for relevance to the dashboard.
    // If you want ALL financial years regardless of usage, query financialYearRepository directly.

    const distinctFinancialYearsInPS1 = await this.typeOrmRepository.createQueryBuilder("ps1")
      .select("fy_entity.id", "id")           // Select ID from the joined FinancialYear table
      .addSelect("fy_entity.name", "name")   // Select Name from the joined FinancialYear table
      .innerJoin("ps1.financialYear", "fy_entity") // Join with the FinancialYear entity
      .groupBy("fy_entity.id")               // Group by FinancialYear ID
      .addGroupBy("fy_entity.name")          // Also group by FinancialYear Name to ensure distinct pairs
      .orderBy("fy_entity.name", "DESC")     // Optional: order them
      .getRawMany<{ id: number | string; name: string }>();

    return distinctFinancialYearsInPS1.map(fy => ({
      id: fy.id,
      name: fy.name
    }));
  }

  async countByFinancialYear(financialYearId: number): Promise<number> {
    return this.typeOrmRepository.createQueryBuilder("ps1")
      .where("ps1.financialYear = :financialYearId", { financialYearId })
      .getCount();
  }

  async countByStageAndFinancialYear(stageId: number, financialYearId: number): Promise<number> {
    return this.typeOrmRepository.createQueryBuilder("ps1")
      .where("ps1.financialYear = :financialYearId", { financialYearId })
      .andWhere("ps1.stage = :stageId", { stageId })
      .getCount();
  }

}