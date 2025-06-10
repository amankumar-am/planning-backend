// src/modules/office/office.entity.ts


import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../core/base.entity';

@Entity('Master_Office')
export class OfficeEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'MOff_Id' })
    id!: number;

    @Column({ name: 'MOff_Code', length: 10 })
    code?: string;

    @Column({ name: 'MOff_NICCode', length: 10 })
    nicCode?: string;

    @Column({ name: 'MOff_Name_En', length: 100 })
    nameEn!: string;

    @Column({ name: 'MOff_Name_En', length: 100 })
    name!: string;

    @Column({ name: 'MOff_Name_Gu', length: 100 })
    nameGu!: string;

    @Column({ name: 'MOff_Level', length: 100 })
    level?: string;

    @Column({ name: 'MOff_Department', length: 100 })
    department?: string;

    @Column({ name: 'MOff_ReportsTo', length: 100 })
    reportsTo?: string;

    @Column({ name: 'MOff_EmailId', length: 100 })
    email?: string;

    @Column({ name: 'MOff_Landline', length: 100 })
    landline?: string;

    @Column({ name: 'MOff_ControlRoomPhNo', length: 100 })
    controlRoomPhNo?: string;

    @Column({ name: 'MO_MOff_AddressName', length: 100 })
    address?: string;

    @Column({ name: 'MOff_State', length: 100 })
    state?: string;

    @Column({ name: 'MOff_Prant', length: 100 })
    prant?: string;

    @Column({ name: 'MOff_Taluka', length: 100 })
    taluka?: string;

    @Column({ name: 'MOff_Village', length: 100 })
    village?: string;
}
