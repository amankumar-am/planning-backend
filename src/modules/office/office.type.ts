// src/modules/office/office.type.ts

import { IsString, IsOptional, IsBoolean, IsDate, IsNumber } from 'class-validator';
import { BaseDtoFields } from '../../core/base.type';
import { OfficeLevelEntity } from '../officeLevel/officeLevel.entity';
import { DepartmentEntity } from '../department/department.entity';
import { OfficeEntity } from './office.entity';
import { StateEntity } from '../state/state.entity';
import { PrantEntity } from '../prant/prant.entity';
import { TalukaEntity } from '../taluka/taluka.entity';
import { GpVillageEntity } from '../gpVillage/gpVillage.entity';
import { DistrictEntity } from '../district/district.entity';

export class CreateOfficeDto extends BaseDtoFields {
    @IsString()
    code?: string;

    @IsString()
    nicCode!: string;

    @IsString()
    name!: string;

    @IsString()
    nameEn!: string;

    @IsString()
    nameGu!: string;

    @IsNumber()
    officeLevel?: OfficeLevelEntity;

    @IsNumber()
    department?: DepartmentEntity;

    @IsNumber()
    reportsTo?: OfficeEntity;

    @IsString()
    email?: string;

    @IsString()
    landline?: string;

    @IsString()
    controlRoomPhNo?: string;

    @IsString()
    address?: string;

    @IsNumber()
    state?: StateEntity;

    @IsNumber()
    district?: DistrictEntity;

    @IsNumber()
    prant?: PrantEntity;

    @IsNumber()
    taluka?: TalukaEntity;

    @IsNumber()
    village?: GpVillageEntity;

}

export class UpdateOfficeDto implements Partial<CreateOfficeDto> {
    @IsString()
    code?: string;

    @IsString()
    nicCode!: string;

    @IsString()
    name!: string;

    @IsString()
    nameEn!: string;

    @IsString()
    nameGu!: string;

    @IsNumber()
    officeLevel?: OfficeLevelEntity;

    @IsNumber()
    department?: DepartmentEntity;

    @IsNumber()
    reportsTo?: OfficeEntity;

    @IsString()
    email?: string;

    @IsString()
    landline?: string;

    @IsString()
    controlRoomPhNo?: string;

    @IsString()
    address?: string;

    @IsString()
    state?: StateEntity;

    @IsString()
    district?: DistrictEntity;

    @IsString()
    prant?: PrantEntity;

    @IsString()
    taluka?: TalukaEntity;

    @IsString()
    village?: GpVillageEntity;

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