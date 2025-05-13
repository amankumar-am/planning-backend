// src/modules/subsector/subsector.type.ts

import { IsString, IsOptional, IsBoolean, IsDate, IsNumber } from 'class-validator';
import { BaseDtoFields } from '../../core/base.type';
import { SectorEntity } from '../sector/sector.entity';

export class CreateSubSectorDto extends BaseDtoFields {
  @IsString()
  nameEn!: string;

  @IsString()
  @IsOptional()
  nameGu?: string;

  @IsNumber()
  sector?: SectorEntity;

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
  sector?: SectorEntity;

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