// src/modules/subSector/subSector.type.ts

import { IsString, IsOptional, IsBoolean, IsDate, IsNumber } from 'class-validator';
import { BaseDtoFields } from '../../core/base.type';

export class CreateSubSectorDto extends BaseDtoFields {
  @IsString()
  nameEn!: string;

  @IsString()
  @IsOptional()
  nameGu?: string;

  @IsString()
  sector?: string;

  @IsNumber()
  @IsOptional()
  SubsectorNumber?: number;
}

export class UpdateSubSectorDto implements Partial<CreateSubSectorDto> {
  @IsString()
  nameEn!: string;

  @IsString()
  @IsOptional()
  nameGu?: string;

  @IsString()
  sector?: string;

  @IsNumber()
  @IsOptional()
  SubsectorNumber?: number;
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