// src/api/models/schemas/prant.schema.ts

import { commonSchemaFields, SchemaConfig } from "../base.dto";


export const prantSchema: SchemaConfig = {
    entity: 'Prant',
    tableName: 'Master_Prant',
    columns: [
        { field: 'id', label: 'ID', type: 'number', isPrimary: true },
        { field: 'code', label: 'Code', type: 'string' },
        { field: 'nameEn', label: 'Name (English)', type: 'string' },
        { field: 'nameGu', label: 'Name (Gujarati)', type: 'string' },
        ...commonSchemaFields,
    ],
    defaultVisibleColumns: ['code', 'nameEn', 'nameGu'],
};