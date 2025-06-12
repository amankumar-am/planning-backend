// src/modules/forms/ps1/ps1.entity.ts


import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../core/base.entity';
import { TalukaEntity } from '../../taluka/taluka.entity';
import { GpVillageEntity } from '../../gpVillage/gpVillage.entity';
import { DistrictEntity } from '../../district/district.entity';
import { FinancialYearEntity } from '../../financial-year/financialYear.entity';
import { FundEntity } from '../../fund/fund.entity';
import { MpmlaEntity } from '../../mpmla/mpmla.entity';
import { SectorEntity } from '../../sector/sector.entity';
import { SubSectorEntity } from '../../subsector/subsector.entity';
import { OfficeEntity } from '../../office/office.entity';
import { UserEntity } from '../../auth/user.entity';
import { BeneficiaryGroup } from '../../beneficiary-group/beneficiaryGroup.entity';

@Entity('Master_PS1')
export class PS1Entity extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'PS1_Id' })
    id!: number;

    @Column({ name: 'PS1_Number' })
    number?: number;

    @Column({ name: 'PS1_RequestDate' })
    requestDate!: Date;

    @Column({ name: 'PS1_ProposalAmount', length: 100 })
    proposalAmount!: string;

    @Column({ name: 'PS1_ProposalDate' })
    proposalDate!: Date;

    @Column({ name: 'PS1_DemandNumber', length: 20 })
    demandNumber?: string;

    @Column({ name: 'PS1_ProposerName', length: 100 })
    proposerName?: string;

    @Column({ name: 'PS1_SchemeName', length: 50 })
    schemaName?: string;

    @Column({ name: 'PS1_EstCompletionDate' })
    completionDate?: Date;

    @Column({ name: 'PS1_WorkDescription', length: 500 })
    workDescription?: string;

    @Column({ name: 'PS1_ImportanceWork', length: 200 })
    importanceWork?: string;

    @Column({ name: 'PS1_AreaType' })
    areaType?: string;

    @Column({ name: 'PS1_Trust' })
    trust?: boolean;

    @Column({ name: 'PS1_TrustName', length: 100 })
    trustName?: string;

    @Column({ name: 'PS1_TrustAddress', length: 200 })
    trustAddress?: string;

    @Column({ name: 'PS1_TrustRegNo', length: 50 })
    trustRegNo?: string;

    @Column({ name: 'PS1_TrustRegDate' })
    trustRegDate?: Date;

    @Column({ name: 'PS1_DemandDate' })
    demandDate?: Date;

    @Column({ name: 'PS1_DemandStatus' })
    demandStatus?: boolean;


    @ManyToOne(() => FinancialYearEntity, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'PS1_FinancialYear', referencedColumnName: 'id' })
    financialYear?: FinancialYearEntity;

    @ManyToOne(() => FundEntity, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'PS1_Fund', referencedColumnName: 'id' })
    fund?: FundEntity;

    @ManyToOne(() => MpmlaEntity, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'PS1_MpMla', referencedColumnName: 'id' })
    mpmla?: MpmlaEntity;

    @ManyToOne(() => SectorEntity, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'PS1_Sector', referencedColumnName: 'id' })
    sector?: SectorEntity;

    @ManyToOne(() => SubSectorEntity, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'PS1_SubSector', referencedColumnName: 'id' })
    subSector?: SubSectorEntity;

    @ManyToOne(() => DistrictEntity, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'PS1_BeneficiaryDistrict', referencedColumnName: 'id' })
    district?: DistrictEntity;

    @ManyToOne(() => TalukaEntity, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'PS1_BeneficiaryTaluka', referencedColumnName: 'id' })
    taluka?: TalukaEntity;

    @ManyToOne(() => GpVillageEntity, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'PS1_BeneficiaryVillage', referencedColumnName: 'id' })
    village?: GpVillageEntity;

    @ManyToOne(() => OfficeEntity, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'PS1_BeneficiaryNagarpalika', referencedColumnName: 'id' })
    nagarpalika?: OfficeEntity;

    @ManyToOne(() => UserEntity, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'PS1_DemandOfficer', referencedColumnName: 'id' })
    demandOfficer?: UserEntity;

    @ManyToOne(() => UserEntity, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'PS1_AssignPSTo', referencedColumnName: 'id' })
    assignPSTo?: UserEntity;

    @ManyToOne(() => UserEntity, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'PS1_ImplementationOfficer', referencedColumnName: 'id' })
    implementationOfficer?: UserEntity;

    @ManyToOne(() => UserEntity, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'PS1_BeneficiaryGroup', referencedColumnName: 'id' })
    beneficiaryGroup?: BeneficiaryGroup;


}
