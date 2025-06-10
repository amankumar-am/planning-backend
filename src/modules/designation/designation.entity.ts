// src/modules/designation/designation.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../core/base.entity';
import { DepartmentEntity } from '../department/department.entity';

@Entity('Master_Designation')
export class DesignationEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'MDsg_Id' })
    id!: number;

    @Column({ name: 'MDsg_Code', length: 10 })
    code!: string;

    @ManyToOne(() => DepartmentEntity, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'MDsg_Department', referencedColumnName: 'id' })
    department!: DepartmentEntity;

    @Column({ name: 'MDsg_Name_En', length: 100 })
    nameEn!: string;

    @Column({ name: 'MDsg_Name_En', length: 100 })
    name!: string;

    @Column({ name: 'MDsg_Name_Gu', length: 100 })
    nameGu!: string;
}
