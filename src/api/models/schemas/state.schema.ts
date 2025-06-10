// src/api/models/schemas/state.schema.ts

import { commonSchemaFields, SchemaConfig } from "../base.dto";


export const stateSchema: SchemaConfig = {
    entity: 'State',
    tableName: 'Master_State',
    columns: [
        { field: 'id', label: 'ID', type: 'number', isPrimary: true },
        { field: 'code', label: 'e-Dhara Code', type: 'number' },
        { field: 'nameEn', label: 'Name (English)', type: 'string' },
        { field: 'nameGu', label: 'Name (Gujarati)', type: 'string' },
        ...commonSchemaFields,
    ],
    defaultVisibleColumns: ['code', 'nameEn', 'nameGu'],
};