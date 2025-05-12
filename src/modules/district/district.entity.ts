// src/modules/district/district.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../core/base.entity';

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

  @Column({ name: 'MD_State' })
  state!: number;

  @Column({ name: 'MD_Name_En', length: 100 })
  name!: string;
}