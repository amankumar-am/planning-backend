import { SchemaConfig, commonSchemaFields } from '../../api/models/base.dto';

export const subSectorSchema: SchemaConfig = {
  entity: 'SubSector',
  tableName: 'Master_SubSector',
  columns: [
    { field: 'id', label: 'ID', type: 'number', isPrimary: true },
    { field: 'nameEn', label: 'Name (English)', type: 'string' },
    { field: 'nameGu', label: 'Name (Gujarati)', type: 'string' },
    { field: 'descriptionEn', label: 'Description (English)', type: 'string' },
    { field: 'descriptionGu', label: 'Description (Gujarati)', type: 'string' },
    ...commonSchemaFields, // Include common fields
  ],
  defaultVisibleColumns: ['nameEn', 'nameGu', 'descriptionEn'],
};