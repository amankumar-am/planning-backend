import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../core/base.entity';

@Entity('Master_Office')
export class OfficeEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'MO_Id' })
    id!: number;

    @Column({ name: 'MO_Name', length: 100 })
    name!: string;
}
