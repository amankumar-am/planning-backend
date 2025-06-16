// src/modules/office/office.entity.ts


import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../core/base.entity';
import { OfficeLevelEntity } from '../officeLevel/officeLevel.entity';
import { DepartmentEntity } from '../department/department.entity';
import { StateEntity } from '../state/state.entity';
import { PrantEntity } from '../prant/prant.entity';
import { TalukaEntity } from '../taluka/taluka.entity';
import { GpVillageEntity } from '../gpVillage/gpVillage.entity';
import { DistrictEntity } from '../district/district.entity';

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

    @Column({ name: 'MOff_Name_Gu', length: 100 })
    nameGu!: string;

    @ManyToOne(() => OfficeLevelEntity, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'MOff_Level', referencedColumnName: 'id' })
    officeLevel!: OfficeLevelEntity;

    @ManyToOne(() => DepartmentEntity, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'MOff_Department', referencedColumnName: 'id' })
    department!: DepartmentEntity;

    @ManyToOne(() => OfficeEntity, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'MOff_ReportsTo', referencedColumnName: 'id' })
    reportsTo!: OfficeEntity;

    @Column({ name: 'MOff_EmailId', length: 100 })
    email?: string;

    @Column({ name: 'MOff_Landline', length: 100 })
    landline?: string;

    @Column({ name: 'MOff_ControlRoomPhNo', length: 100 })
    controlRoomPhNo?: string;

    @Column({ name: 'MOff_Address', length: 100 })
    address?: string;

    @ManyToOne(() => StateEntity, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'MOff_State', referencedColumnName: 'id' })
    state!: StateEntity;

    @ManyToOne(() => DistrictEntity, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'MOff_District', referencedColumnName: 'id' })
    district!: DistrictEntity;

    @ManyToOne(() => PrantEntity, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'MOff_Prant', referencedColumnName: 'id' })
    prant!: PrantEntity;

    @ManyToOne(() => TalukaEntity, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'MOff_Taluka', referencedColumnName: 'id' })
    taluka!: TalukaEntity;

    @ManyToOne(() => GpVillageEntity, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'MOff_Village', referencedColumnName: 'id' })
    village!: GpVillageEntity;
}
