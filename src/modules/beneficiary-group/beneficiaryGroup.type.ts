// src/modules/beneficiary-group/beneficiaryGroup.type.ts

import { IsString, IsNumber, IsOptional, IsBoolean, IsDate } from 'class-validator';
import { BaseDtoFields } from '../../core/base.type';

export class CreateBeneficiaryGroupDto extends BaseDtoFields {
    @IsString()
    name_En!: string;

    @IsString()
    name_Gu!: string;

    @IsString()
    @IsOptional()
    description?: string;
}

export class UpdateBeneficiaryGroupDto implements Partial<CreateBeneficiaryGroupDto> {
    @IsString()
    name_En!: string;

    @IsString()
    name_Gu!: string;

    @IsString()
    @IsOptional()
    description?: string;

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