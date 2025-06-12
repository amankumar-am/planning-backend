// src/modules/dashboard/dashboard.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../core/base.entity';
import { FinancialYearEntity } from '../financial-year/financialYear.entity';
import { FundEntity } from '../fund/fund.entity';
import { TalukaEntity } from '../taluka/taluka.entity';
import { SectorEntity } from '../sector/sector.entity';

@Entity('Planning_Stage1')
export class PlanningStage1Entity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'PS1_Id' })
  id!: number;

  @ManyToOne(() => FinancialYearEntity, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'PS1_FinancialYear', referencedColumnName: 'id' })
  financialYear!: FinancialYearEntity;

  @ManyToOne(() => FundEntity, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'PS1_Fund', referencedColumnName: 'id' })
  fund!: FundEntity;

  @ManyToOne(() => TalukaEntity, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'PS1_Taluka', referencedColumnName: 'id' })
  taluka!: TalukaEntity;

  @ManyToOne(() => SectorEntity, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'PS1_Sector', referencedColumnName: 'id' })
  sector!: SectorEntity;

  @Column({ name: 'PS1_Stage' })
  stage!: number;
}