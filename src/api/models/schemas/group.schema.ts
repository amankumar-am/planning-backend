import { commonSchemaFields, SchemaConfig } from "../base.dto";

export const groupSchema: SchemaConfig = {
    entity: 'Group',
    tableName: 'Master_Group',
    columns: [
        { field: 'id', label: 'ID', type: 'number', isPrimary: true },
        { field: 'name', label: 'Group Name', type: 'string' },
        { field: 'description', label: 'Description', type: 'string' },
        { field: 'code', label: 'Group Code', type: 'string' },
        { field: 'type', label: 'Group Type', type: 'string' },
        { field: 'parentId', label: 'Parent Group', type: 'number' },
        ...commonSchemaFields, // Include common fields
    ],
    defaultVisibleColumns: ['name', 'code', 'type', 'description', 'parentId'],
}; 