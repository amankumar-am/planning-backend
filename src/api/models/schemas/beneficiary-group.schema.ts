// src/api/models/schemas/beneficiary-group.schema.ts

import { commonSchemaFields, SchemaConfig } from "../base.dto";


export const beneficiaryGroupSchema: SchemaConfig = {
    entity: 'Beneficiary Group',
    tableName: 'Master_BeneficiaryGroup',
    columns: [
        { field: 'id', label: 'ID', type: 'number' },
        { field: 'name', label: 'Name', type: 'string' },
        { field: 'name_gu', label: 'Name Gu', type: 'string' },
        { field: 'description', label: 'Description', type: 'string' },
        ...commonSchemaFields,
    ],
    defaultVisibleColumns: ['name', 'name_gu', 'description'],
};