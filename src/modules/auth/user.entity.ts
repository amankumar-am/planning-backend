// src/modules/auth/user.entity.ts

import { BaseEntity } from '../../core/base.entity';
import { DepartmentEntity } from '../department/department.entity';
import { OfficeEntity } from '../office/office.entity';
import { DesignationEntity } from '../designation/designation.entity';
import { EmploymentTypeEntity } from '../employmentType/employmentType.entity';
import { OfficerClassEntity } from '../officerClass/officerClass.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('Master_UserProfile')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'MUsr_Id' })
    id!: number;

    @Column({ name: 'MUsr_Username', length: 100, unique: true })
    username!: string;

    @Column({ name: 'MUsr_FirstName', length: 100, nullable: true })
    firstName?: string;

    @Column({ name: 'MUsr_LastName', length: 100, nullable: true })
    lastName?: string;

    @Column({ name: 'MUsr_DateOfBirth', type: 'date', nullable: true })
    dateOfBirth?: Date;

    @Column({ name: 'MUsr_Gender', length: 20, nullable: true })
    gender?: string;

    @Column({ name: 'MUsr_PermanentAddress', length: 500, nullable: true })
    permanentAddress?: string;

    @Column({ name: 'MUsr_CurrentAddress', length: 500, nullable: true })
    currentAddress?: string;

    @Column({ name: 'MUsr_EmailId', length: 100, unique: true })
    email?: string;

    @Column({ name: 'MUsr_Mobile', length: 100, unique: true })
    mobile?: string;

    @Column({ name: 'MUsr_PAN', length: 20, nullable: true })
    pan?: string;

    @ManyToOne(() => DepartmentEntity, { onUpdate: 'CASCADE', onDelete: 'SET NULL' })
    @JoinColumn({ name: 'MUsr_Department', referencedColumnName: 'id' })
    department?: DepartmentEntity;

    @ManyToOne(() => OfficeEntity, { onUpdate: 'CASCADE', onDelete: 'SET NULL' })
    @JoinColumn({ name: 'MUsr_Office', referencedColumnName: 'id' })
    office?: OfficeEntity;

    @ManyToOne(() => DesignationEntity, { onUpdate: 'CASCADE', onDelete: 'SET NULL' })
    @JoinColumn({ name: 'MUsr_Designation', referencedColumnName: 'id' })
    designation?: DesignationEntity;

    @ManyToOne(() => EmploymentTypeEntity, { onUpdate: 'CASCADE', onDelete: 'SET NULL' })
    @JoinColumn({ name: 'MUsr_EmploymentType', referencedColumnName: 'id' })
    employmentType?: EmploymentTypeEntity;

    @Column({ name: 'MUsr_DateOfJoiningService', type: 'date', nullable: true })
    dateOfJoiningService?: Date;

    @Column({ name: 'MUsr_DateOfJoiningCurrentPost', type: 'date', nullable: true })
    dateOfJoiningCurrentPost?: Date;

    @ManyToOne(() => OfficerClassEntity, { onUpdate: 'CASCADE', onDelete: 'SET NULL' })
    @JoinColumn({ name: 'MUsr_OfficerClass', referencedColumnName: 'id' })
    officerClass?: OfficerClassEntity;

    @Column({ name: 'MUsr_Password', length: 60 })
    password!: string;

    @Column({ name: 'MUsr_LastLogin', type: 'timestamp', nullable: true })
    lastLogin?: Date;

    @Column({ name: 'MUsr_PasswordChangedAt', type: 'timestamp', nullable: true })
    passwordChangedAt?: Date;

    @Column({ name: 'MUsr_PasswordResetToken', length: 100, nullable: true })
    passwordResetToken?: string;

    @Column({ name: 'MUsr_PasswordResetExpires', type: 'timestamp', nullable: true })
    passwordResetExpires?: Date;
}
