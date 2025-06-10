// src/api/models/schemas/department.schema.ts

import { commonSchemaFields, SchemaConfig } from "../base.dto";


export const departmentSchema: SchemaConfig = {
    entity: 'Department',
    tableName: 'Master_Department',
    columns: [
        { field: 'id', label: 'ID', type: 'number', isPrimary: true },
        { field: 'code', label: 'Department Code', type: 'string' },
        { field: 'nameEn', label: 'Name (English)', type: 'string' },
        { field: 'nameGu', label: 'Name (Gujarati)', type: 'string' },
        ...commonSchemaFields,
    ],
    defaultVisibleColumns: ['code', 'nameEn', 'nameGu'],
};