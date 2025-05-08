// src/modules/fund/fund.type.ts

import { IsString, IsNumber, IsOptional, IsBoolean, IsDate } from 'class-validator';
import { BaseDtoFields } from '../../core/base.type';

export class CreateFundDto extends BaseDtoFields {
    @IsString()
    fundingGroup!: string;

    @IsString()
    fundingSource_En!: string;

    @IsString()
    @IsOptional()
    fundingSource_Gu?: string;

    @IsString()
    @IsOptional()
    financialYear?: string;

    @IsNumber()
    @IsOptional()
    grantValue?: number;

    @IsString()
    @IsOptional()
    act?: string;
}

export class UpdateFundDto implements Partial<CreateFundDto> {
    @IsString()
    @IsOptional()
    fundingGroup?: string;

    @IsString()
    @IsOptional()
    fundingSource_En?: string;

    @IsString()
    @IsOptional()
    fundingSource_Gu?: string;

    @IsString()
    @IsOptional()
    financialYear?: string;

    @IsNumber()
    @IsOptional()
    grantValue?: number;

    @IsString()
    @IsOptional()
    act?: string;

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