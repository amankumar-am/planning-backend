// src/modules/gpVillage/gpVillage.type.ts

import { IsString, IsOptional, IsBoolean, IsDate, IsNumber } from 'class-validator';
import { BaseDtoFields } from '../../core/base.type';
import { DistrictEntity } from '../district/district.entity';
import { TalukaEntity } from '../taluka/taluka.entity';

export class CreateGpVillageDto extends BaseDtoFields {
  @IsString()
  @IsOptional()
  lgdCode?: string;

  @IsString()
  nameEn?: string;

  @IsString()
  nameGu?: string;

  // @IsString()
  // @IsOptional()
  // villagesIncluded?: string;

  @IsString()
  @IsOptional()
  population2011?: number;

  @IsNumber()
  @IsOptional()
  district?: DistrictEntity;

  @IsNumber()
  @IsOptional()
  taluka?: TalukaEntity;
}

export class UpdateGpVillageDto implements Partial<CreateGpVillageDto> {
  @IsString()
  @IsOptional()
  lgdCode?: string;

  @IsString()
  nameEn?: string;

  @IsString()
  nameGu?: string;

  // @IsString()
  // @IsOptional()
  // villagesIncluded?: string;

  @IsString()
  @IsOptional()
  population2011?: number;

  @IsNumber()
  @IsOptional()
  district?: DistrictEntity;

  @IsNumber()
  @IsOptional()
  taluka?: TalukaEntity;

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