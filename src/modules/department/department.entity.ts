// src/modules/department/department.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../core/base.entity';

@Entity('Master_Department')
export class DepartmentEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'MD_Id' })
    id!: number;

    @Column({ name: 'MD_Name', length: 100 })
    name!: string;
}
