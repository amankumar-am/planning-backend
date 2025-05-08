// src/api/models/schemas/sector.schema.ts

import { commonSchemaFields, SchemaConfig } from "../base.dto";


export const SectorSchema: SchemaConfig = {
    entity: 'Sector',
    tableName: 'Master_Sector',
    columns: [
        { field: 'id', label: 'ID', type: 'number', isPrimary: true },
        { field: 'scheme', label: 'Scheme', type: 'string' },
        { field: 'sectorNumber', label: 'Sector Number', type: 'number' },
        { field: 'nameEn', label: 'Name En', type: 'string' },
        { field: 'nameGu', label: 'Name Gu', type: 'string' },
        ...commonSchemaFields
    ],
    defaultVisibleColumns: ['scheme', 'sectorNumber', 'nameEn', 'nameGu'],
};