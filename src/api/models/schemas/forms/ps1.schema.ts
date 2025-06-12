// src/api/models/schemas/forms/ps1.schema.ts

import { commonSchemaFields, SchemaConfig } from "../../base.dto";

export const PS1Schema: SchemaConfig = {
    entity: 'PS1',
    tableName: 'Master_PS1',
    columns: [
        { field: 'id', label: 'ID', type: 'number', isPrimary: true },
        { field: 'number', label: 'Number', type: 'string' },
        { field: 'financialYear', label: 'Financial Year', type: 'number' },
        { field: 'requestDate', label: 'Request Date', type: 'date' },
        { field: 'proposalAmount', label: 'Proposal Amount', type: 'string' },
        { field: 'proposalDate', label: 'Proposal Date', type: 'date' },
        { field: 'demandNumber', label: 'Demand Number', type: 'string' },
        { field: 'proposerName', label: 'Proposer Name', type: 'string' },
        { field: 'schemaName', label: 'Schema Name', type: 'string' },
        { field: 'completionDate', label: 'Completion Date', type: 'date' },
        { field: 'workDescription', label: 'Work Description', type: 'string' },
        { field: 'importanceWork', label: 'Importance of Work', type: 'string' },
        { field: 'trust', label: 'Trust', type: 'boolean' },
        { field: 'trustName', label: 'Trust Name', type: 'string' },
        { field: 'trustAddress', label: 'Trust Address', type: 'string' },
        { field: 'trustRegNo', label: 'Trust Registration Number', type: 'string' },
        { field: 'trustRegDate', label: 'Trust Registration Date', type: 'date' },
        { field: 'demandDate', label: 'Demand Date', type: 'date' },
        { field: 'demandStatus', label: 'Demand Status', type: 'boolean' },
        { field: 'fund', label: 'Fund', type: 'number' },
        { field: 'mpmla', label: 'MP/MLA', type: 'number' },
        { field: 'sector', label: 'Sector', type: 'number' },
        { field: 'subSector', label: 'Sub Sector', type: 'number' },
        { field: 'district', label: 'District', type: 'number' },
        { field: 'taluka', label: 'Taluka', type: 'number' },
        { field: 'village', label: 'Village', type: 'number' },
        { field: 'nagarpalika', label: 'Nagarpalika', type: 'number' },
        { field: 'demandOfficer', label: 'Demand Officer', type: 'number' },
        { field: 'assignPSTo', label: 'Assign PS to', type: 'number' },
        { field: 'implementationOfficer', label: 'Implementation Officer', type: 'number' },
        { field: 'beneficiaryGroup', label: 'Beneficiary Group', type: 'number' },
        ...commonSchemaFields
    ],
    defaultVisibleColumns: ['number', 'financialYear', 'requestDate', 'proposalAmount', 'proposalDate', 'demandNumber', 'proposerName', 'schemaName', 'completionDate'],
};
