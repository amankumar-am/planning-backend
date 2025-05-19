// src/api/models/schemas/planningstage1.schema.ts

import { ChartingSchemaConfig, SchemaConfig, commonSchemaFields } from '../base.dto';

export const PlanningStage1Schema: SchemaConfig = {
  entity: 'PlanningStage1',
  tableName: 'Planning_Stage1',
  columns: [
    { field: 'id', label: 'ID', type: 'number', isPrimary: true },
    { field: 'financialYear', label: 'Financial year', type: 'number' },
    { field: 'fund', label: 'Fund', type: 'number' },
    { field: 'taluka', label: 'Taluka', type: 'number' },
    { field: 'sector', label: 'Sector', type: 'number' },
    { field: 'stage', label: 'Stage', type: 'number' },
    ...commonSchemaFields,
  ],
  defaultVisibleColumns: ['financialYear', 'fund', 'taluka', 'sector', 'stage'],
};

export const dashboardSchema: ChartingSchemaConfig = {
  globalCountDataArray: [],
  countDataArray: [],
  chartDataArray: [],
  financialYears: [],
}


// Stage - 1 - Demand
// Stage - 2 - Primary Sanction
// Stage - 3 - Technical Sanction
// Stage - 4 - Administrative Sanction
// Stage - 5 - Grant
// Stage - 6 - Work Order
// Stage - 7 - Pre Inspection
// Stage - 8 - Mid Inspection
// Stage - 9 - Post Inspection
// Stage - 10 - Final Payment
// Stage - 11 - UTC
// Stage - 12 - Completion