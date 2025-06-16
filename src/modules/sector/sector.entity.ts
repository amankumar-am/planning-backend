// src/modules/sector/sector.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../core/base.entity';

@Entity('Master_Sector')
export class SectorEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'MS_Id' })
    id!: number;

    @Column({ name: 'MS_Scheme', length: 100 })
    scheme!: string;

    @Column({ name: 'MS_SectorNumber' })
    sectorNumber!: number;

    @Column({ name: 'MS_Name_En', length: 100, nullable: true })
    nameEn?: string;

    @Column({ name: 'MS_Name_Gu', length: 100, nullable: true })
    nameGu?: string;
}