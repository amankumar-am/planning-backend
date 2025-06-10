// src/modules/district/district.type.ts

import { IsString, IsOptional, IsBoolean, IsDate, IsNumber } from 'class-validator';
import { BaseDtoFields } from '../../core/base.type';
import { StateEntity } from '../state/state.entity';
export class CreateDistrictDto extends BaseDtoFields {
  @IsNumber()
  eDharaCode!: number;

  @IsString()
  nameEn!: string;

  @IsString()
  nameGu!: string;

  @IsString()
  state!: StateEntity;
}

export class UpdateDistrictDto implements Partial<CreateDistrictDto> {
  @IsNumber()
  eDharaCode!: number;

  @IsString()
  nameEn!: string;

  @IsString()
  nameGu!: string;

  @IsString()
  state!: StateEntity;

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