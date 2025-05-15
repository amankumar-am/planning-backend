// src/api/models/schemas/planningstage1.schema.ts

import { SchemaConfig, commonSchemaFields } from '../base.dto';

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