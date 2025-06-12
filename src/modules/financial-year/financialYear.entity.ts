// src/modules/financial-year/financialYear.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../core/base.entity';

@Entity('Master_FinancialYear')
export class FinancialYearEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'MFY_Id' })
    id!: number;

    @Column({ name: 'MFY_Name', length: 20 })
    name!: string;

    @Column({ name: 'MFY_Duration', length: 20 })
    duration!: string;

    @Column({ name: 'MFY_StartDate', type: 'date' })
    startDate!: Date;

    @Column({ name: 'MFY_EndDate', type: 'date' })
    endDate!: Date;

    @Column({ name: 'MFY_IsCurrent', default: false })
    isCurrent!: boolean;
}