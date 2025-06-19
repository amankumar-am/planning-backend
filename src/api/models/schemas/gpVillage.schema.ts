// src/api/models/schemas/gpVillage.schema.ts

import { commonSchemaFields, SchemaConfig } from "../base.dto";

export const gpVillageSchema: SchemaConfig = {
  entity: 'GpVillage',
  tableName: 'Master_GpVillage',
  columns: [
    { field: 'id', label: 'ID', type: 'number', isPrimary: true },
    { field: 'lgdCode', label: 'LGD Code', type: 'string' },
    { field: 'nameEn', label: 'Name (English)', type: 'string' },
    { field: 'nameGu', label: 'Name (Gujarati)', type: 'string' },
    // { field: 'villagesIncluded', label: 'Villages Included', type: 'string' },
    { field: 'population2011', label: 'Population (2011)', type: 'number' },
    { field: 'district', label: 'District', type: 'number' },
    { field: 'taluka', label: 'Taluka', type: 'number' },
    ...commonSchemaFields, // Include common fields
  ],
  defaultVisibleColumns: ['nameEn', 'nameGu', 'lgdCode', 'population2011', 'taluka', 'district'],
};