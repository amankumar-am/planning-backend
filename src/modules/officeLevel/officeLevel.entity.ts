// src/modules/officeLevel/officeLevel.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../core/base.entity';

@Entity('Master_OfficeLevel')
export class OfficeLevelEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'MOL_Id' })
    id!: number;

    @Column({ name: 'MOL_Code', length: 20 })
    code!: string;

    @Column({ name: 'MOL_NameEn', length: 30 })
    name!: string;

    @Column({ name: 'MOL_NameEn', length: 30 })
    nameEn!: string;

    @Column({ name: 'MOL_NameGu', length: 30 })
    nameGu!: string;
}
