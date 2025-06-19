import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../core/base.entity';
import { UserEntity } from '../auth/user.entity';
import { GroupEntity } from '../group/group.entity';

@Entity('Master_Role')
export class RoleEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'MRole_Id' })
    id!: number;

    @Column({ name: 'MRole_Name', length: 100, unique: true })
    name!: string;

    @Column({ name: 'MRole_Description', length: 500, nullable: true })
    description?: string;

    @Column({ name: 'MRole_Code', length: 50, unique: true })
    code!: string;

    @Column({ name: 'MRole_Type', length: 50, nullable: true })
    type?: string; // e.g., 'system', 'custom', 'functional'

    @Column({ name: 'MRole_Priority', type: 'int', default: 0 })
    priority?: number; // For role hierarchy/priority

    // Many-to-many with Users (direct role assignments)
    @ManyToMany(() => UserEntity, user => user.roles)
    @JoinTable({
        name: 'User_Role_Mapping',
        joinColumn: { name: 'URM_Role', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'URM_User', referencedColumnName: 'id' }
    })
    users?: UserEntity[];

    // Many-to-many with Groups (roles assigned to groups)
    @ManyToMany(() => GroupEntity, group => group.roles)
    groups?: GroupEntity[];
} 