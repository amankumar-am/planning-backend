// src/modules/state/state.type.ts

import { IsString, IsOptional, IsBoolean, IsDate, IsNumber } from 'class-validator';
import { BaseDtoFields } from '../../core/base.type';
export class CreateStateDto extends BaseDtoFields {
  @IsNumber()
  code!: number;

  @IsString()
  nameEn!: string;

  @IsString()
  nameGu!: string;
}

export class UpdateStateDto implements Partial<CreateStateDto> {
  @IsNumber()
  code!: number;

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