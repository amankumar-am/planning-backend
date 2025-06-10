// src/modules/office/office.type.ts

// import { IsString, IsOptional, IsBoolean, IsDate, IsNumber } from 'class-validator';
// import { BaseDtoFields } from '../../core/base.type';
// import { SectorEntity } from '../sector/sector.entity';

// export class CreateOfficeDto extends BaseDtoFields {
//   @IsString()
//   nameEn!: string;

//   @IsString()
//   @IsOptional()
//   nameGu?: string;

//   @IsNumber()
//   sector?: SectorEntity;

//   @IsNumber()
//   @IsOptional()
//   officeNumber?: number;
// }

// export class UpdateOfficeDto implements Partial<CreateOfficeDto> {
//   @IsString()
//   nameEn!: string;

//   @IsString()
//   @IsOptional()
//   nameGu?: string;

//   @IsString()
//   sector?: SectorEntity;

//   @IsNumber()
//   @IsOptional()
//   officeNumber?: number;

//   @IsBoolean()
//   @IsOptional()
//   isActive?: boolean;

//   @IsString()
//   @IsOptional()
//   createdBy?: string;

//   @IsDate()
//   @IsOptional()
//   createdAt?: Date;

//   @IsString()
//   modifiedBy!: string;

//   @IsDate()
//   modifiedAt!: Date;
// }