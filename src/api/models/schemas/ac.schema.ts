// src/api/models/schemas/ac.schema.ts

import { commonSchemaFields, SchemaConfig } from "../base.dto";


export const acSchema: SchemaConfig = {
    entity: 'AC',
    tableName: 'Master_AC',
    columns: [
        { field: 'id', label: 'ID', type: 'number', isPrimary: true },
        { field: 'code', label: 'E-Dhara Code', type: 'number' },
        { field: 'nameEn', label: 'Name (English)', type: 'string' },
        { field: 'name', label: 'Name (English)', type: 'string' },
        { field: 'nameGu', label: 'Name (Gujarati)', type: 'string' },
        { field: 'district', label: 'District', type: 'string' },
        ...commonSchemaFields, // Include common fields
    ],
    defaultVisibleColumns: ['code', 'nameEn', 'nameGu', 'district'],
};