// src/api/models/schemas/sector.schema.ts

import { SchemaConfig } from "../base.dto";


export const sectorSchema: SchemaConfig = {
    entity: 'Sector',
    tableName: 'Master_Sector',
    columns: [
        { field: 'id', label: 'ID', type: 'number', isPrimary: true },
        { field: 'fundingGroup', label: 'Funding Group', type: 'string' },
        { field: 'fundingSource_En', label: 'Funding Source En', type: 'string' },
        { field: 'fundingSource_Gu', label: 'Funding Source Gu', type: 'string' },
        { field: 'financialYear', label: 'Financial Year', type: 'string' },
        { field: 'grantValue', label: 'Grant Amount', type: 'number' },
        { field: 'act', label: 'Act', type: 'string' },
        { field: 'isActive', label: 'Active', type: 'boolean' },
        { field: 'createdBy', label: 'Created By', type: 'string' },
        { field: 'createdAt', label: 'Created At', type: 'datetime' },
        { field: 'modifiedBy', label: 'Modified By', type: 'string' },
        { field: 'modifiedAt', label: 'Modified At', type: 'datetime' },
    ],
    defaultVisibleColumns: ['fundingGroup', 'fundingSource_En', 'fundingSource_Gu', 'financialYear', 'grantValue'],
};