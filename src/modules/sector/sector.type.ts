// src/modules/sector/sector.type.ts

import { IsString, IsNumber, IsOptional, IsBoolean, IsDate } from 'class-validator';
import { BaseDtoFields } from '../../core/base.type';

export class CreateSectorDto extends BaseDtoFields {
    @IsString()
    scheme!: string;

    @IsNumber()
    @IsOptional()
    sectorNumber!: number;

    @IsString()
    @IsOptional()
    nameEn?: string;

    @IsString()
    @IsOptional()
    nameGu?: string;
}

export class UpdateSectorDto implements Partial<CreateSectorDto> {
    @IsString()
    scheme!: string;

    @IsNumber()
    @IsOptional()
    sectorNumber!: number;

    @IsString()
    @IsOptional()
    nameEn?: string;

    @IsString()
    @IsOptional()
    nameGu?: string;

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