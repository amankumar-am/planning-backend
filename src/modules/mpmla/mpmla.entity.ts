// src/modules/mpmla/mpmla.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../core/base.entity';
import { DistrictEntity } from '../district/district.entity';
import { TalukaEntity } from '../taluka/taluka.entity';
import { ACEntity } from '../ac/ac.entity';

@Entity('Master_MPMLA')
export class MpmlaEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'MMP_Id' })
  id!: number;

  @Column({ name: 'MMP_Name', length: 200 })
  name!: string;

  @Column({ name: 'MMP_Designation', length: 30 })
  designation?: string;

  @Column({ name: 'MMP_StartDt' })
  startDate?: Date;

  @Column({ name: 'MMP_EndDt' })
  endDate?: Date;

  @ManyToOne(() => TalukaEntity, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'MMP_LegislativeConstituency', referencedColumnName: 'id' })
  legislativeConstituency?: TalukaEntity;

  @ManyToOne(() => ACEntity, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'MMP_ParliamentaryConstituency', referencedColumnName: 'id' })
  parliamentaryConstituency?: ACEntity;

  @Column({ name: 'MMP_PoliticalParty', length: 100 })
  politicalParty?: string;

  @Column({ name: 'MMP_Term', length: 100 })
  term?: string;
}