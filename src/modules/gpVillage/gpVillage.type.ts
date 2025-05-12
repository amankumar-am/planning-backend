// src/modules/gpvillage/gpvillage.type.ts

import { IsString, IsOptional, IsBoolean, IsDate } from 'class-validator';
import { BaseDtoFields } from '../../core/base.type';

export class CreateGpVillageDto extends BaseDtoFields {
  @IsString()
  @IsOptional()
  lgdCode?: string;

  @IsString()
  nameEn?: string;

  @IsString()
  nameGu?: string;

  @IsString()
  @IsOptional()
  villagesIncluded?: string;

  @IsString()
  @IsOptional()
  population2011?: number;

  @IsString()
  @IsOptional()
  district?: number;

  @IsString()
  @IsOptional()
  taluka?: number;
}

export class UpdateGpVillageDto implements Partial<CreateGpVillageDto> {
  @IsString()
  @IsOptional()
  lgdCode?: string;

  @IsString()
  nameEn?: string;

  @IsString()
  nameGu?: string;

  @IsString()
  @IsOptional()
  villagesIncluded?: string;

  @IsString()
  @IsOptional()
  population2011?: number;

  @IsString()
  @IsOptional()
  district?: number;

  @IsString()
  @IsOptional()
  taluka?: number;
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