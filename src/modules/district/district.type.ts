// src/modules/district/district.type.ts

import { IsString, IsOptional, IsBoolean, IsDate, IsNumber } from 'class-validator';
import { BaseDtoFields } from '../../core/base.type';
export class CreateDistrictDto extends BaseDtoFields {
  @IsNumber()
  eDharaCode!: number;

  @IsString()
  nameEn!: string;

  @IsString()
  nameGu!: string;

  @IsString()
  state!: string;
}

export class UpdateDistrictDto implements Partial<CreateDistrictDto> {
  @IsNumber()
  eDharaCode!: number;

  @IsString()
  nameEn!: string;

  @IsString()
  nameGu!: string;

  @IsString()
  state!: string;

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