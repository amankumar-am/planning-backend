// src/modules/mpmla/mpmla.type.ts

import { IsString, IsOptional, IsBoolean, IsDate, IsNumber } from 'class-validator';
import { BaseDtoFields } from '../../core/base.type';
import { TalukaEntity } from '../taluka/taluka.entity';
import { ACEntity } from '../ac/ac.entity';

export class CreateMpmlaDto extends BaseDtoFields {
  @IsString()
  name!: string;

  @IsString()
  designation?: string;

  @IsDate()
  startDate?: Date;

  @IsDate()
  endDate?: Date;

  @IsNumber()
  legislativeConstituency?: TalukaEntity

  @IsNumber()
  parliamentaryConstituency?: ACEntity;

  @IsString()
  politicalParty?: string;

  @IsString()
  term?: string;
}

export class UpdateMpmlaDto implements Partial<CreateMpmlaDto> {
  @IsString()
  name!: string;

  @IsString()
  designation?: string;

  @IsDate()
  startDate?: Date;

  @IsDate()
  endDate?: Date;

  @IsNumber()
  legislativeConstituency?: TalukaEntity

  @IsNumber()
  parliamentaryConstituency?: ACEntity;

  @IsString()
  politicalParty?: string;

  @IsString()
  term?: string;

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