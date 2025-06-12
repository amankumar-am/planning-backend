// src/modules/auth/user.type.ts

import { IsString, IsOptional, IsBoolean, IsDate, IsNumber } from 'class-validator';
import { BaseDtoFields } from '../../core/base.type';
import { DepartmentEntity } from '../department/department.entity';
import { OfficeEntity } from '../office/office.entity';
import { DesignationEntity } from '../designation/designation.entity';
import { EmploymentTypeEntity } from '../employmentType/employmentType.entity';
import { OfficerClassEntity } from '../officerClass/officerClass.entity';
export class CreateUserDto extends BaseDtoFields {
    @IsString()
    username!: string;

    @IsString()
    name!: string;

    @IsString()
    firstName!: string;

    @IsString()
    lastName!: string;

    @IsString()
    dateOfBirth?: Date;

    @IsString()
    gender?: string;

    @IsString()
    permanentAddress?: string;

    @IsString()
    currentAddress?: string;

    @IsString()
    email?: string;

    @IsString()
    mobile?: string;

    @IsString()
    pan?: string;

    @IsNumber()
    department?: DepartmentEntity;

    @IsNumber()
    office?: OfficeEntity;

    @IsNumber()
    designation?: DesignationEntity;

    @IsNumber()
    employmentType?: EmploymentTypeEntity;

    @IsNumber()
    officerClass?: OfficerClassEntity;

    @IsDate()
    dateOfJoiningService?: Date;

    @IsDate()
    dateOfJoiningCurrentPost?: Date;

    @IsString()
    password?: string;

    @IsDate()
    lastLogin?: Date;

    @IsDate()
    passwordChangedAt?: Date;

    @IsString()
    passwordResetToken?: string;

    @IsDate()
    passwordResetExpires?: Date;

}

export class UpdateUserDto implements Partial<CreateUserDto> {
    @IsString()
    username!: string;

    @IsString()
    name!: string;

    @IsString()
    firstName!: string;

    @IsString()
    lastName!: string;

    @IsString()
    dateOfBirth?: Date;

    @IsString()
    gender?: string;

    @IsString()
    permanentAddress?: string;

    @IsString()
    currentAddress?: string;

    @IsString()
    email?: string;

    @IsString()
    mobile?: string;

    @IsString()
    pan?: string;

    @IsNumber()
    department?: DepartmentEntity;

    @IsNumber()
    office?: OfficeEntity;

    @IsNumber()
    designation?: DesignationEntity;

    @IsNumber()
    employmentType?: EmploymentTypeEntity;

    @IsNumber()
    officerClass?: OfficerClassEntity;

    @IsDate()
    dateOfJoiningService?: Date;

    @IsDate()
    dateOfJoiningCurrentPost?: Date;

    @IsString()
    password?: string;

    @IsDate()
    lastLogin?: Date;

    @IsDate()
    passwordChangedAt?: Date;

    @IsString()
    passwordResetToken?: string;

    @IsDate()
    passwordResetExpires?: Date;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @IsString()
    @IsOptional()
    createdBy?: string;

    @IsDate()
    @IsOptional()
    createdAt?: Date;

    @IsString()
    modifiedBy!: string;

    @IsDate()
    modifiedAt!: Date;
}