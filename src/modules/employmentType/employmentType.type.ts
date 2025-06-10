// src/modules/employmentType/employmentType.type.ts

import { IsString, IsOptional, IsBoolean, IsDate } from 'class-validator';
import { BaseDtoFields } from '../../core/base.type';
export class CreateEmploymentTypeDto extends BaseDtoFields {
  @IsString()
  name!: string;
}

export class UpdateEmploymentTypeDto implements Partial<CreateEmploymentTypeDto> {

  @IsString()
  name!: string;

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