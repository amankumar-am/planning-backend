// src/modules/taluka/taluka.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../core/base.entity';
import { DistrictEntity } from '../district/district.entity';

@Entity('Master_Taluka')
export class TalukaEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'MT_Id' })
  id!: number;

  @Column({ name: 'MT_eDharaCode' })
  eDharaCode!: number;

  @Column({ name: 'MT_Name_En', length: 100 })
  nameEn!: string;

  @Column({ name: 'MT_Name_En', length: 100 })
  name!: string;

  @Column({ name: 'MT_Name_Gu', length: 100 })
  nameGu!: string;

  @ManyToOne(() => DistrictEntity, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'MT_District', referencedColumnName: 'MD_Id' })
  @Column({ name: 'MT_District' })
  district!: number;

  @Column({ name: 'MT_Prant' })
  prant!: number;
}