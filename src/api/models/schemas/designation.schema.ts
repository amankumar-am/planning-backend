// src/api/models/schemas/designation.schema.ts

import { commonSchemaFields, SchemaConfig } from "../base.dto";


export const designationSchema: SchemaConfig = {
    entity: 'Designation',
    tableName: 'Master_Designation',
    columns: [
        { field: 'id', label: 'ID', type: 'number', isPrimary: true },
        { field: 'code', label: 'Designation Code', type: 'string' },
        { field: 'nameEn', label: 'Name (English)', type: 'string' },
        { field: 'nameGu', label: 'Name (Gujarati)', type: 'string' },
        { field: 'department', label: 'Department', type: 'number' },
        ...commonSchemaFields,
    ],
    defaultVisibleColumns: ['code', 'nameEn', 'nameGu', 'department'],
};