import { commonSchemaFields, SchemaConfig } from "../base.dto";

export const roleSchema: SchemaConfig = {
    entity: 'Role',
    tableName: 'Master_Role',
    columns: [
        { field: 'id', label: 'ID', type: 'number', isPrimary: true },
        { field: 'name', label: 'Role Name', type: 'string' },
        { field: 'description', label: 'Description', type: 'string' },
        { field: 'code', label: 'Role Code', type: 'string' },
        { field: 'type', label: 'Role Type', type: 'string' },
        { field: 'priority', label: 'Priority', type: 'number' },
        ...commonSchemaFields, // Include common fields
    ],
    defaultVisibleColumns: ['name', 'code', 'type', 'description', 'priority'],
}; 