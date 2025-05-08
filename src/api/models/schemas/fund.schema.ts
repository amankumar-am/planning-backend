// src/api/models/schemas/fund.schema.ts

import { SchemaConfig, commonSchemaFields } from '../base.dto';

export const fundSchema: SchemaConfig = {
    entity: 'Fund',
    tableName: 'Master_Fund',
    columns: [
        { field: 'id', label: 'ID', type: 'number', isPrimary: true },
        { field: 'fundingGroup', label: 'Funding Group', type: 'string' },
        { field: 'fundingSource_En', label: 'Funding Source En', type: 'string' },
        { field: 'fundingSource_Gu', label: 'Funding Source Gu', type: 'string' },
        { field: 'financialYear', label: 'Financial Year', type: 'string' },
        { field: 'grantValue', label: 'Grant Amount', type: 'number' },
        { field: 'act', label: 'Act', type: 'string' },
        ...commonSchemaFields,
    ],
    defaultVisibleColumns: ['fundingGroup', 'fundingSource_En', 'fundingSource_Gu', 'financialYear', 'grantValue'],
};