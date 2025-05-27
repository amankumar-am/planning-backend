import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../core/base.entity';

@Entity('Master_OfficerClass')
export class OfficerClassEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'MOC_Id' })
    id!: number;

    @Column({ name: 'MOC_Name', length: 100 })
    name!: string;
}
