// src/api/models/schemas/user.schema.ts

import { commonSchemaFields, SchemaConfig } from "../base.dto";

export const UserSchema: SchemaConfig = {
    entity: 'User',
    tableName: 'Master_UserProfile',
    columns: [
        { field: 'id', label: 'ID', type: 'number', isPrimary: true },
        { field: 'username', label: 'Username', type: 'string' },
        { field: 'firstName', label: 'First Name', type: 'string' },
        { field: 'lastName', label: 'Last Name', type: 'string' },
        { field: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
        { field: 'gender', label: 'Gender', type: 'string' },
        { field: 'permanentAddress', label: 'Permanent Address', type: 'string' },
        { field: 'currentAddress', label: 'Current Address', type: 'string' },
        { field: 'email', label: 'Email ID', type: 'string' },
        { field: 'mobile', label: 'Mobile', type: 'string' },
        { field: 'pan', label: 'PAN', type: 'string' },
        { field: 'department', label: 'Department', type: 'number' },
        { field: 'office', label: 'Office', type: 'number' },
        { field: 'designation', label: 'Designation', type: 'number' },
        { field: 'employmentType', label: 'Employment Type', type: 'number' },
        { field: 'dateOfJoiningService', label: 'Date of Joining Service', type: 'date' },
        { field: 'dateOfJoiningCurrentPost', label: 'Date of Joining Current Post', type: 'date' },
        { field: 'officerClass', label: 'Officer Class', type: 'number' },
        { field: 'password', label: 'Password', type: 'string' },
        { field: 'lastLogin', label: 'Last Login', type: 'date' },
        { field: 'passwordChangedAt', label: 'Password Changed At', type: 'date' },
        { field: 'passwordResetToken', label: 'Password Reset Token', type: 'string' },
        { field: 'passwordResetExpires', label: 'Password Reset Expires', type: 'date' },
        ...commonSchemaFields
    ],
    defaultVisibleColumns: ['MUsr_Username', 'MUsr_EmailId', 'MUsr_Mobile', 'MUsr_FirstName', 'MUsr_LastName'],
};
