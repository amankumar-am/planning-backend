// src/modules/beneficiary-group/beneficiaryGroup.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../core/base.entity';

@Entity('Master_BeneficiaryGroup')
export class BeneficiaryGroup extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'MBG_Id' })
    id!: number;

    @Column({ name: 'MBG_Name_En', length: 50 })
    name!: string;

    @Column({ name: 'MBG_Name_Gu', length: 50 })
    name_gu!: string;

    @Column({ name: 'MBG_Description', length: 100 })
    description!: string;
}