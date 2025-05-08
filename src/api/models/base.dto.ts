// src/api/models/base.dto.ts

export interface BaseDto {
    [key: string]: string | number | boolean | Date | null | undefined;
}

export interface SchemaConfig {
    entity: string;
    tableName: string;
    columns: Array<{
        field: string;
        label: string;
        type: 'string' | 'number' | 'boolean' | 'datetime' | 'date';
        isPrimary?: boolean;
    }>;
    defaultVisibleColumns: string[];
}

export const commonSchemaFields: SchemaConfig['columns'] = [
    { field: 'isActive', label: 'Active', type: 'boolean' },
    { field: 'createdBy', label: 'Created By', type: 'string' },
    { field: 'createdAt', label: 'Created At', type: 'datetime' },
    { field: 'modifiedBy', label: 'Modified By', type: 'string' },
    { field: 'modifiedAt', label: 'Modified At', type: 'datetime' },
];