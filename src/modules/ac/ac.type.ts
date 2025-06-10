// src/modules/ac/ac.type.ts

import { IsString, IsOptional, IsBoolean, IsDate, IsNumber } from 'class-validator';
import { BaseDtoFields } from '../../core/base.type';
import { DistrictEntity } from '../district/district.entity';
export class CreateACDto extends BaseDtoFields {
  @IsNumber()
  code?: number;

  @IsString()
  nameEn!: string;

  @IsString()
  nameGu!: string;

  @IsNumber()
  district!: DistrictEntity;
}

export class UpdateACDto implements Partial<CreateACDto> {
  @IsNumber()
  code?: number;

  @IsString()
  nameEn!: string;

  @IsString()
  nameGu!: string;

  @IsNumber()
  district!: DistrictEntity;

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