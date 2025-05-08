// src/api/models/schemas/financial-year.schema.ts

import { commonSchemaFields, SchemaConfig } from "../base.dto";


export const financialYearSchema: SchemaConfig = {
    entity: 'Financial Year',
    tableName: 'Master_FinancialYear',
    columns: [
        { field: 'id', label: 'ID', type: 'number' },
        { field: 'name', label: 'Name', type: 'string' },
        { field: 'duration', label: 'Duration', type: 'string' },
        { field: 'startDate', label: 'Start Date', type: 'date' },
        { field: 'endDate', label: 'End Date', type: 'date' },
        { field: 'isCurrent', label: 'Current', type: 'boolean' },
        ...commonSchemaFields,
    ],
    defaultVisibleColumns: ['id', 'name', 'duration', 'startDate', 'endDate', 'isCurrent'],
};