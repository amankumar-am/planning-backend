// src/modules/district/district.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../core/base.entity';
import { StateEntity } from '../state/state.entity';

@Entity('Master_District')
export class DistrictEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'MD_Id' })
  id!: number;

  @Column({ name: 'MD_eDharaCode' })
  eDharaCode!: number;

  @Column({ name: 'MD_Name_En', length: 100 })
  nameEn!: string;

  @Column({ name: 'MD_Name_Gu', length: 500 })
  nameGu!: string;

  @ManyToOne(() => StateEntity, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'MD_State', referencedColumnName: 'id' })
  state!: StateEntity;

  @Column({ name: 'MD_Name_En', length: 100 })
  name!: string;
}