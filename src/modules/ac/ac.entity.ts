// src/modules/ac/ac.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../core/base.entity';
import { DistrictEntity } from '../district/district.entity';

@Entity('Master_AC')
export class ACEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'MAC_Id' })
  id!: number;

  @Column({ name: 'MAC_Code' })
  code!: number;

  @Column({ name: 'MAC_Name_En', length: 100 })
  nameEn!: string;

  @Column({ name: 'MAC_Name_En', length: 100 })
  name!: string;

  @Column({ name: 'MAC_Name_Gu', length: 100 })
  nameGu!: string;

  @ManyToOne(() => DistrictEntity, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'MAC_District', referencedColumnName: 'id' })
  district!: DistrictEntity;
}