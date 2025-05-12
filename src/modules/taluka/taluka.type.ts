// src/modules/taluka/taluka.type.ts

import { IsString, IsOptional, IsBoolean, IsDate, IsNumber } from 'class-validator';
import { BaseDtoFields } from '../../core/base.type';
export class CreateTalukaDto extends BaseDtoFields {
  @IsNumber()
  eDharaCode?: number;

  @IsString()
  nameEn!: string;

  @IsString()
  nameGu!: string;

  @IsString()
  district!: number;

  @IsString()
  prant!: number;
}

export class UpdateTalukaDto implements Partial<CreateTalukaDto> {
  @IsNumber()
  eDharaCode?: number;

  @IsString()
  nameEn!: string;

  @IsString()
  nameGu!: string;

  @IsString()
  district!: number;

  @IsString()
  prant!: number;

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