import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../core/base.entity';

@Entity('Master_EmploymentType')
export class EmploymentTypeEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'MET_Id' })
    id!: number;

    @Column({ name: 'MET_Name', length: 100 })
    name!: string;
}
