// src/modules/officerClass/officerClass.type.ts

import { IsString, IsOptional, IsBoolean, IsDate } from 'class-validator';
import { BaseDtoFields } from '../../core/base.type';
export class CreateOfficerClassDto extends BaseDtoFields {
  @IsString()
  code!: string;

  @IsString()
  name!: string;

  @IsString()
  nameEn!: string;

  @IsString()
  nameGu!: string;
}

export class UpdateOfficerClassDto implements Partial<CreateOfficerClassDto> {
  @IsString()
  code!: string;

  @IsString()
  name!: string;

  @IsString()
  nameEn!: string;

  @IsString()
  nameGu!: string;

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