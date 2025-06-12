// src/api/models/schemas/office.schema.ts

import { commonSchemaFields, SchemaConfig } from "../base.dto";

export const OfficeSchema: SchemaConfig = {
    entity: 'Office',
    tableName: 'Master_Office',
    columns: [
        { field: 'id', label: 'ID', type: 'number', isPrimary: true },
        { field: 'code', label: 'code', type: 'string' },
        { field: 'nicCode', label: 'NIC Code', type: 'string' },
        { field: 'nameEn', label: 'Name (English)', type: 'string' },
        { field: 'nameGu', label: 'Name (Gujarati)', type: 'string' },
        { field: 'officeLevel', label: 'Office Level', type: 'number' },
        { field: 'department', label: 'Department', type: 'number' },
        { field: 'reportsTo', label: 'Reports To', type: 'number' },
        { field: 'email', label: 'email', type: 'string' },
        { field: 'landline', label: 'Landline', type: 'string' },
        { field: 'controlRoomPhNo', label: 'Control Room Phone Number', type: 'string' },
        { field: 'address', label: 'Address', type: 'string' },
        { field: 'state', label: 'State', type: 'number' },
        { field: 'district', label: 'District', type: 'number' },
        { field: 'prant', label: 'Prant', type: 'number' },
        { field: 'taluka', label: 'Taluka', type: 'number' },
        { field: 'village', label: 'Village', type: 'number' },
        ...commonSchemaFields
    ],
    defaultVisibleColumns: ['nicCode', 'nameEn', 'officeLevel', 'department', 'reportsTo'],
};
