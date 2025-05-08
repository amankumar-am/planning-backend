// src/core/base.type.ts

import { IsString, IsBoolean, IsDate, IsOptional } from 'class-validator';

export class BaseDtoFields {
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
    @IsOptional()
    modifiedBy?: string;

    @IsDate()
    @IsOptional()
    modifiedAt?: Date | null;
}