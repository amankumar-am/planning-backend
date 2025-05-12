// src/modules/subsector/subsector.type.ts

import { IsString, IsOptional, IsBoolean, IsDate, IsNumber } from 'class-validator';
import { BaseDtoFields } from '../../core/base.type';

export class CreateSubSectorDto extends BaseDtoFields {
  @IsString()
  nameEn!: string;

  @IsString()
  @IsOptional()
  nameGu?: string;

  @IsString()
  sector?: number;

  @IsNumber()
  @IsOptional()
  subsectorNumber?: number;
}

export class UpdateSubSectorDto implements Partial<CreateSubSectorDto> {
  @IsString()
  nameEn!: string;

  @IsString()
  @IsOptional()
  nameGu?: string;

  @IsString()
  sector?: number;

  @IsNumber()
  @IsOptional()
  subsectorNumber?: number;

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