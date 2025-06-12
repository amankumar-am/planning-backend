// src/api/models/schemas/officerClass.schema.ts

import { commonSchemaFields, SchemaConfig } from "../base.dto";


export const officerClassSchema: SchemaConfig = {
    entity: 'OfficerClass',
    tableName: 'Master_OfficerClass',
    columns: [
        { field: 'id', label: 'ID', type: 'number', isPrimary: true },
        { field: 'code', label: 'Code', type: 'string' },
        { field: 'nameEn', label: 'Name (English)', type: 'string' },
        { field: 'nameGu', label: 'Name (Gujarati)', type: 'string' },
        ...commonSchemaFields,
    ],
    defaultVisibleColumns: ['code', 'nameEn', 'nameGu'],
};