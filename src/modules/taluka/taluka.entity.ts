// src/modules/taluka/taluka.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../core/base.entity';

@Entity('Master_Taluka')
export class TalukaEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'MT_Id' })
  id!: number;

  @Column({ name: 'MT_eDharaCode' })
  eDharaCode!: number;

  @Column({ name: 'MT_Name_En', length: 100 })
  nameEn!: string;

  @Column({ name: 'MT_Name_Gu', length: 100 })
  nameGu!: string;

  @Column({ name: 'MT_District', length: 100 })
  district!: string;

  @Column({ name: 'MT_Prant', length: 100 })
  prant!: string;
}