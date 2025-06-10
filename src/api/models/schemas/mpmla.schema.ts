// src/api/models/schemas/mpmla.schema.ts

import { SchemaConfig, commonSchemaFields } from '../base.dto';

export const mpmlaSchema: SchemaConfig = {
  entity: 'Mpmla',
  tableName: 'Master_Mpmla',
  columns: [
    { field: 'id', label: 'ID', type: 'number', isPrimary: true },
    { field: 'name', label: 'Name', type: 'string' },
    { field: 'designation', label: 'Designation', type: 'string' },
    { field: 'startDate', label: 'Start Date', type: 'date' },
    { field: 'endDate', label: 'End Dte', type: 'date' },
    { field: 'legislativeConstituency', label: 'Legislative Constituency', type: 'string' },
    { field: 'parliamentaryConstituency', label: 'Parliamentary Constituency', type: 'string' },
    { field: 'politicalParty', label: 'Political Party', type: 'string' },
    { field: 'term', label: 'Term', type: 'string' },
    // Add more fields, use type: 'string' for relations that will be mapped to names
    ...commonSchemaFields,
  ],
  defaultVisibleColumns: ['name', 'designation', 'legislativeConstituency', 'parliamentaryConstituency', 'politicalParty', 'term'],
};