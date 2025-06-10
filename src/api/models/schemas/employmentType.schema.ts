// src/api/models/schemas/employmentType.schema.ts

import { commonSchemaFields, SchemaConfig } from "../base.dto";


export const employmentTypeSchema: SchemaConfig = {
    entity: 'EmploymentType',
    tableName: 'Master_EmploymentType',
    columns: [
        { field: 'id', label: 'ID', type: 'number', isPrimary: true },
        { field: 'name', label: 'Name', type: 'string' },
        ...commonSchemaFields,
    ],
    defaultVisibleColumns: ['code', 'name'],
};