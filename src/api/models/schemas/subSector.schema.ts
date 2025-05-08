// src/api/models/schemas/subSector.schema.ts

import { commonSchemaFields, SchemaConfig } from "../base.dto";


export const SubSectorSchema: SchemaConfig = {
    entity: 'SubSector',
    tableName: 'Master_SubSector',
    columns: [
        { field: 'id', label: 'ID', type: 'number', isPrimary: true },
        { field: 'nameEn', label: 'Name En', type: 'string' },
        { field: 'nameGu', label: 'Name Gu', type: 'number' },
        { field: 'sector', label: 'Sector', type: 'string' },
        { field: 'SubsectorNumber', label: 'Subsector Number', type: 'number' },
        ...commonSchemaFields
    ],
    defaultVisibleColumns: ['scheme', 'sectorNumber', 'nameEn', 'nameGu'],
};