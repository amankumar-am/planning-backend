// src/modules/designation/designation.type.ts

import { IsString, IsOptional, IsBoolean, IsDate, IsNumber } from 'class-validator';
import { BaseDtoFields } from '../../core/base.type';
import { DepartmentEntity } from '../department/department.entity';
export class CreateDesignationDto extends BaseDtoFields {
  @IsNumber()
  eDharaCode?: number;

  @IsString()
  code!: string;

  @IsString()
  nameEn!: string;

  @IsString()
  nameGu!: string;

  @IsNumber()
  department!: DepartmentEntity;
}

export class UpdateDesignationDto implements Partial<CreateDesignationDto> {
  @IsNumber()
  eDharaCode?: number;

  @IsString()
  nameEn!: string;

  @IsString()
  nameGu!: string;

  @IsNumber()
  department!: DepartmentEntity;

  @IsNumber()
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