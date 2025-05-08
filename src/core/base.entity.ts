// src/core/base.entity.ts

import { Column, BaseEntity as TypeOrmBaseEntity } from 'typeorm';

export abstract class BaseEntity extends TypeOrmBaseEntity {
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
}