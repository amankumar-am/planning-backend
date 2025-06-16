// src/modules/prant/prant.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../core/base.entity';

@Entity('Master_Prant')
export class PrantEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'MP_Id' })
    id!: number;

    @Column({ name: 'MP_Code', length: 10 })
    code!: string;

    @Column({ name: 'MP_Name_En', length: 100 })
    nameEn!: string;

    @Column({ name: 'MP_Name_Gu', length: 100 })
    nameGu!: string;
}
