// src/modules/officerClass/officerClass.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../core/base.entity';

@Entity('Master_OfficerClass')
export class OfficerClassEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'MOffC_Id' })
    id!: number;

    @Column({ name: 'MOffC_Code', length: 10 })
    code!: string;

    @Column({ name: 'MOffC_Name_En', length: 30 })
    name!: string;

    @Column({ name: 'MOffC_Name_En', length: 10 })
    nameEn!: string;

    @Column({ name: 'MOffC_Name_Gu', length: 100 })
    nameGu!: string;
}
