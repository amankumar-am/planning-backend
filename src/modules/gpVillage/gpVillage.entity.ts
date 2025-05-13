// src/modules/gpVillage/gpVillage.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../core/base.entity';
import { TalukaEntity } from '../taluka/taluka.entity';
import { DistrictEntity } from '../district/district.entity';

@Entity('Master_GPVillage')
export class GpVillageEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'MGPV_Id' })
  id!: number;

  @Column({ name: 'MGPV_LGDCode', length: 10, nullable: true })
  lgdCode?: string;

  @Column({ name: 'MGPV_Name_En', })
  nameEn!: string;

  @Column({ name: 'MGPV_Name_En', })
  name!: string;

  @Column({ name: 'MGPV_Name_Gu', length: 100, })
  nameGu?: string;

  @Column({ name: 'MGPV_VillagesIncluded', length: 200, nullable: true })
  villagesIncluded?: string;


  @Column({ name: 'MGPV_Population(2011)', nullable: true })
  population2011?: number;

  @ManyToOne(() => DistrictEntity, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'MGPV_District', referencedColumnName: 'id' })
  district?: DistrictEntity;

  @ManyToOne(() => TalukaEntity, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'MGPV_Taluka', referencedColumnName: 'id' })
  taluka?: TalukaEntity;
}