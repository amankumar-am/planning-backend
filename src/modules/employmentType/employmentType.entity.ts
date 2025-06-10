// src/modules/employmentType/employmentType.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../core/base.entity';

@Entity('Master_EmploymentType')
export class EmploymentTypeEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'MEmpT_Id' })
    id!: number;

    @Column({ name: 'MEmpT_Name', length: 30 })
    name!: string;
}
