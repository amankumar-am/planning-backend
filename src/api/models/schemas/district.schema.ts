// src/api/models/schemas/district.schema.ts

import { commonSchemaFields, SchemaConfig } from "../base.dto";


export const districtSchema: SchemaConfig = {
  entity: 'District',
  tableName: 'Master_District',
  columns: [
    { field: 'id', label: 'ID', type: 'number', isPrimary: true },
    { field: 'eDharaCode', label: 'e-Dhara Code', type: 'number' },
    { field: 'nameEn', label: 'Name (English)', type: 'string' },
    { field: 'nameGu', label: 'Name (Gujarati)', type: 'string' },
    { field: 'state', label: 'State', type: 'number' },
    ...commonSchemaFields,
  ],
  defaultVisibleColumns: ['eDharaCode', 'nameEn', 'nameGu', 'state'],
};