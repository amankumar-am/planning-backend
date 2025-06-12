// src/modules/forms/ps1/ps1.type.ts

import { IsString, IsOptional, IsBoolean, IsDate, IsNumber } from 'class-validator';
import { BaseDtoFields } from '../../../core/base.type';
import { TalukaEntity } from '../../taluka/taluka.entity';
import { GpVillageEntity } from '../../gpVillage/gpVillage.entity';
import { DistrictEntity } from '../../district/district.entity';
import { FinancialYearEntity } from '../../financial-year/financialYear.entity';
import { MpmlaEntity } from '../../mpmla/mpmla.entity';
import { SectorEntity } from '../../sector/sector.entity';
import { SubSectorEntity } from '../../subsector/subsector.entity';
import { OfficeEntity } from '../../office/office.entity';
import { UserEntity } from '../../auth/user.entity';
import { FundEntity } from '../../fund/fund.entity';
import { BeneficiaryGroup } from '../../beneficiary-group/beneficiaryGroup.entity';

export class CreatePS1Dto extends BaseDtoFields {
    @IsNumber()
    number?: Number;

    @IsDate()
    requestDate!: Date;

    @IsString()
    proposalAmount!: string;

    @IsDate()
    proposalDate!: Date;

    @IsString()
    demandNumber!: string;

    @IsString()
    proposerName!: string;

    @IsString()
    schemaName!: string;

    @IsDate()
    completionDate!: Date;

    @IsString()
    workDescription!: string;

    @IsString()
    importanceWork!: string;

    @IsString()
    areaType!: string;

    @IsBoolean()
    trust?: Boolean;

    @IsString()
    trustName?: string;

    @IsString()
    trustAddress?: string;

    @IsString()
    trustRegNo?: string;

    @IsDate()
    trustRegDate?: Date;

    @IsDate()
    demandDate?: Date;

    @IsBoolean()
    demandStatus?: Boolean;

    @IsNumber()
    financialYear?: FinancialYearEntity;

    @IsNumber()
    fund?: FundEntity;

    @IsNumber()
    mpmla?: MpmlaEntity;

    @IsNumber()
    sector?: SectorEntity;

    @IsNumber()
    subSector?: SubSectorEntity;

    @IsNumber()
    district?: DistrictEntity;

    @IsNumber()
    taluka?: TalukaEntity;

    @IsNumber()
    village?: GpVillageEntity;

    @IsNumber()
    nagarpalika?: OfficeEntity;

    @IsNumber()
    demandOfficer?: UserEntity;

    @IsNumber()
    assignPSTo?: UserEntity;

    @IsNumber()
    implementationOfficer?: UserEntity;

    @IsNumber()
    beneficiaryGroup?: BeneficiaryGroup
}

export class UpdatePS1Dto implements Partial<CreatePS1Dto> {
    @IsNumber()
    number?: Number;

    @IsDate()
    requestDate!: Date;

    @IsString()
    proposalAmount!: string;

    @IsDate()
    proposalDate!: Date;

    @IsString()
    demandNumber!: string;

    @IsString()
    proposerName!: string;

    @IsString()
    schemaName!: string;

    @IsDate()
    completionDate!: Date;

    @IsString()
    workDescription!: string;

    @IsString()
    importanceWork!: string;

    @IsString()
    areaType!: string;

    @IsBoolean()
    trust?: Boolean;

    @IsString()
    trustName?: string;

    @IsString()
    trustAddress?: string;

    @IsString()
    trustRegNo?: string;

    @IsDate()
    trustRegDate?: Date;

    @IsDate()
    demandDate?: Date;

    @IsBoolean()
    demandStatus?: Boolean;

    @IsNumber()
    financialYear?: FinancialYearEntity;

    @IsNumber()
    fund?: FundEntity;

    @IsNumber()
    mpmla?: MpmlaEntity;

    @IsNumber()
    sector?: SectorEntity;

    @IsNumber()
    subSector?: SubSectorEntity;

    @IsNumber()
    district?: DistrictEntity;

    @IsNumber()
    taluka?: TalukaEntity;

    @IsNumber()
    village?: GpVillageEntity;

    @IsNumber()
    nagarpalika?: OfficeEntity;

    @IsNumber()
    demandOfficer?: UserEntity;

    @IsNumber()
    assignPSTo?: UserEntity;

    @IsNumber()
    implementationOfficer?: UserEntity;

    @IsNumber()
    beneficiaryGroup?: BeneficiaryGroup

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