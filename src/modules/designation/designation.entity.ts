import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../core/base.entity';

@Entity('Master_Designation')
export class DesignationEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'MD_Id' })
    id!: number;

    @Column({ name: 'MD_Name', length: 100 })
    name!: string;
}
