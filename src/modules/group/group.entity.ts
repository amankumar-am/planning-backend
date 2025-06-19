import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../core/base.entity';
import { UserEntity } from '../auth/user.entity';
import { RoleEntity } from '../role/role.entity';

@Entity('Master_Group')
export class GroupEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'MGroup_Id' })
    id!: number;

    @Column({ name: 'MGroup_Name', length: 100, unique: true })
    name!: string;

    @Column({ name: 'MGroup_Description', length: 500, nullable: true })
    description?: string;

    @Column({ name: 'MGroup_Code', length: 50, unique: true })
    code!: string;

    @Column({ name: 'MGroup_Type', length: 50, nullable: true })
    type?: string; // e.g., 'department', 'functional', 'project'

    @Column({ name: 'MGroup_ParentId', nullable: true })
    parentId?: number; // For group hierarchy

    // Many-to-many with Users (user group memberships)
    @ManyToMany(() => UserEntity, user => user.groups)
    @JoinTable({
        name: 'User_Group_Mapping',
        joinColumn: { name: 'UGM_Group', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'UGM_User', referencedColumnName: 'id' }
    })
    users?: UserEntity[];

    // Many-to-many with Roles (roles assigned to groups)
    @ManyToMany(() => RoleEntity, role => role.groups)
    @JoinTable({
        name: 'Group_Role_Mapping',
        joinColumn: { name: 'GRM_Group', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'GRM_Role', referencedColumnName: 'id' }
    })
    roles?: RoleEntity[];
} 