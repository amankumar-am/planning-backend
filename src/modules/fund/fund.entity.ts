// src/modules/fund/fund.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../core/base.entity';

@Entity('Master_Fund')
export class Fund extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'MF_Id' })
    id!: number;

    @Column({ name: 'MF_FundingGroup', length: 100 })
    fundingGroup!: string;

    @Column({ name: 'MF_FundingSource_En', length: 50 })
    fundingSource_En!: string;

    @Column({ name: 'MF_FundingSource_Gu', length: 100, nullable: true })
    fundingSource_Gu?: string;

    @Column({ name: 'MF_FinancialYear', length: 20, nullable: true })
    financialYear?: string;

    @Column({ name: 'MF_GrantValue', nullable: true })
    grantValue?: number;

    @Column({ name: 'MF_Act', length: 50, nullable: true })
    act?: string;
}