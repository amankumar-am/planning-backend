import { commonSchemaFields, SchemaConfig } from "../base.dto";

export const UserSchema: SchemaConfig = {
    entity: 'User',
    tableName: 'Master_UserProfile',
    columns: [
        { field: 'MUsr_Id', label: 'ID', type: 'number', isPrimary: true },
        { field: 'MUsr_Username', label: 'Username', type: 'string' },
        { field: 'MUsr_FirstName', label: 'First Name', type: 'string' },
        { field: 'MUsr_LastName', label: 'Last Name', type: 'string' },
        { field: 'MUsr_DateOfBirth', label: 'Date of Birth', type: 'date' },
        { field: 'MUsr_Gender', label: 'Gender', type: 'string' },
        { field: 'MUsr_PermanentAddress', label: 'Permanent Address', type: 'string' },
        { field: 'MUsr_CurrentAddress', label: 'Current Address', type: 'string' },
        { field: 'MUsr_EmailId', label: 'Email ID', type: 'string' },
        { field: 'MUsr_Mobile', label: 'Mobile', type: 'string' },
        { field: 'MUsr_PAN', label: 'PAN', type: 'string' },
        { field: 'MUsr_Department', label: 'Department', type: 'number' },
        { field: 'MUsr_Office', label: 'Office', type: 'number' },
        { field: 'MUsr_Designation', label: 'Designation', type: 'number' },
        { field: 'MUsr_EmploymentType', label: 'Employment Type', type: 'number' },
        { field: 'MUsr_DateOfJoiningService', label: 'Date of Joining Service', type: 'date' },
        { field: 'MUsr_DateOfJoiningCurrentPost', label: 'Date of Joining Current Post', type: 'date' },
        { field: 'MUsr_OfficerClass', label: 'Officer Class', type: 'number' },
        { field: 'MUsr_Password', label: 'Password', type: 'string' },
        { field: 'MUsr_LastLogin', label: 'Last Login', type: 'date' },
        { field: 'MUsr_PasswordChangedAt', label: 'Password Changed At', type: 'date' },
        { field: 'MUsr_PasswordResetToken', label: 'Password Reset Token', type: 'string' },
        { field: 'MUsr_PasswordResetExpires', label: 'Password Reset Expires', type: 'date' },
        ...commonSchemaFields
    ],
    defaultVisibleColumns: ['MUsr_Username', 'MUsr_EmailId', 'MUsr_Mobile', 'MUsr_FirstName', 'MUsr_LastName'],
};
