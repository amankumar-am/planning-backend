// src/api/models/schemas/taluka.schema.ts

import { commonSchemaFields, SchemaConfig } from "../base.dto";


export const talukaSchema: SchemaConfig = {
  entity: 'Taluka',
  tableName: 'Master_Taluka',
  columns: [
    { field: 'id', label: 'ID', type: 'number', isPrimary: true },
    { field: 'eDharaCode', label: 'E-Dhara Code', type: 'number' },
    { field: 'nameEn', label: 'Name (English)', type: 'string' },
    { field: 'name', label: 'Name (English)', type: 'string' },
    { field: 'nameGu', label: 'Name (Gujarati)', type: 'string' },
    { field: 'district', label: 'District', type: 'string' },
    { field: 'prant', label: 'Prant', type: 'number' },
    ...commonSchemaFields, // Include common fields
  ],
  defaultVisibleColumns: ['eDharaCode', 'nameEn', 'nameGu', 'district', 'prant'],
};