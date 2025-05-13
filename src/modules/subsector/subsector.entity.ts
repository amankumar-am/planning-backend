// src/modules/subsector/subsector.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../core/base.entity';
import { SectorEntity } from '../sector/sector.entity';

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

  @ManyToOne(() => SectorEntity, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'MSS_Sector', referencedColumnName: 'id' })
  sector!: SectorEntity;

  @Column({ name: 'MSS_SubSectorNumber', nullable: true })
  subsectorNumber?: number;
}