// src/modules/prant/prant.type.ts

import { IsString, IsOptional, IsBoolean, IsDate } from 'class-validator';
import { BaseDtoFields } from '../../core/base.type';
export class CreatePrantDto extends BaseDtoFields {
  @IsString()
  code!: string;

  @IsString()
  name!: string;

  @IsString()
  nameEn!: string;

  @IsString()
  nameGu!: string;
}

export class UpdatePrantDto implements Partial<CreatePrantDto> {
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