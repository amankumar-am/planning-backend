// src/modules/dashboard/dashboard.type.ts

import { IsString, IsOptional, IsBoolean, IsDate, IsNumber } from 'class-validator';
import { BaseDtoFields } from '../../core/base.type';
import { FundEntity } from '../fund/fund.entity';
import { FinancialYearEntity } from '../financial-year/financialYear.entity';
import { TalukaEntity } from '../taluka/taluka.entity';
import { SectorEntity } from '../sector/sector.entity';

export class CreatePlanningStage1Dto extends BaseDtoFields {
  @IsNumber()
  financialYear!: FinancialYearEntity;

  @IsNumber()
  fund!: FundEntity;

  @IsNumber()
  taluka!: TalukaEntity;

  @IsNumber()
  sector!: SectorEntity;

  @IsNumber()
  stage!: number;
}

export class UpdatePlanningStage1Dto implements Partial<CreatePlanningStage1Dto> {
  @IsNumber()
  financialYear!: FinancialYearEntity;

  @IsNumber()
  fund!: FundEntity;

  @IsNumber()
  taluka!: TalukaEntity;

  @IsNumber()
  sector!: SectorEntity;

  @IsNumber()
  stage!: number;

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