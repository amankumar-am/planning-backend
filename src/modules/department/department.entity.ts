// src/modules/department/department.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../core/base.entity';

@Entity('Master_Department')
export class DepartmentEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'MDept_Id' })
    id!: number;

    @Column({ name: 'MDept_Code', length: 100 })
    code!: string;

    @Column({ name: 'MDept_Name_En', length: 100 })
    nameEn!: string;

    @Column({ name: 'MDept_Name_Gu', length: 100 })
    nameGu!: string;
}
