// src/api/beneficiary-group/beneficiaryGroup.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Master_BeneficiaryGroup')
export class BeneficiaryGroup {
    @PrimaryGeneratedColumn({ name: 'MBG_Id' })
    id!: number;

    @Column({ name: 'MBG_Name_En', length: 50 })
    name!: string;

    @Column({ name: 'MBG_Name_Gu', length: 50 })
    name_gu!: string;

    @Column({ name: 'MBG_Description', length: 100 })
    description!: string;

    @Column({ name: 'IsActive', default: true })
    isActive!: boolean;

    @Column({ name: 'CreatedBy', default: 'system', length: 100 })
    createdBy!: string;

    @Column({ name: 'CreatedAt', type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @Column({ name: 'ModifiedBy', default: 'system', length: 100 })
    modifiedBy!: string;

    @Column({ name: 'ModifiedAt', type: 'timestamp with time zone', nullable: true })
    modifiedAt!: Date | null;


    constructor(partial?: Partial<BeneficiaryGroup>) {
        if (partial) {
            Object.assign(this, partial);
        }
    }
}