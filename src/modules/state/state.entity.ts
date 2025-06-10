// src/modules/state/state.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../core/base.entity';

@Entity('Master_State')
export class StateEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'MSt_Id' })
  id!: number;

  @Column({ name: 'MSt_Code' })
  code!: number;

  @Column({ name: 'MSt_Name_En', length: 100 })
  nameEn!: string;

  @Column({ name: 'MSt_Name_Gu', length: 500 })
  nameGu!: string;
}