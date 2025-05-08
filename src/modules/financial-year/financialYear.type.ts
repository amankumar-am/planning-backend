// src/modules/financial-year/financialYear.type.ts

import { IsString, IsNumber, IsOptional, IsBoolean, IsDate } from 'class-validator';
import { BaseDtoFields } from '../../core/base.type';

export class CreateFinancialYearDto extends BaseDtoFields {
    @IsString()
    name!: string;

    @IsString()
    duration!: string;

    @IsDate()
    startDate!: Date;

    @IsDate()
    endDate!: Date;

    @IsBoolean()
    isCurrent?: boolean;
}

export class UpdateFinancialYearDto implements Partial<CreateFinancialYearDto> {
    @IsString()
    name!: string;

    @IsString()
    duration!: string;

    @IsDate()
    startDate!: Date;

    @IsDate()
    endDate!: Date;

    @IsBoolean()
    isCurrent?: boolean;
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