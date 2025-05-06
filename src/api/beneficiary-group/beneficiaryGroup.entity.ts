// src/models/financial-year.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Master_BeneficiaryGroup')
export class BeneficiaryGroup {
    @PrimaryGeneratedColumn({ name: 'MFY_Id' })
    id!: number;

    @Column({ name: 'MFY_Name', length: 20 })
    name!: string;

    @Column({ name: 'MFY_Duration', length: 20 })
    duration!: string;

    @Column({ name: 'MFY_StartDate', type: 'date' })
    startDate!: Date;

    @Column({ name: 'MFY_EndDate', type: 'date' })
    endDate!: Date;

    @Column({ name: 'MFY_IsActive', default: true })
    isActive!: boolean;

    @Column({ name: 'MFY_IsCurrent', default: false })
    isCurrent!: boolean;

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