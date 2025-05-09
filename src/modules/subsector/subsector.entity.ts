// src/modules/subsector/subsector.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../core/base.entity';

@Entity('Master_SubSector')
export class SubSectorEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'MSS_Id' })
  id!: number;

  @Column({ name: 'MSS_Name_En', length: 100 })
  name!: string;

  @Column({ name: 'MSS_Name_En', length: 100 })
  nameEn!: string;

  @Column({ name: 'MSS_Name_Gu', length: 100, nullable: true })
  nameGu?: string;

  @Column({ name: 'MSS_Sector', length: 100 })
  sector!: string;

  @Column({ name: 'MSS_SubSectorNumber', nullable: true })
  SubsectorNumber?: number;
}