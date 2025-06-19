export interface CreateRoleDto {
    name: string;
    description?: string;
    code: string;
    type?: string;
    priority?: number;
    isActive?: boolean;
    createdBy?: string;
    createdAt?: Date;
    modifiedBy?: string;
    modifiedAt?: Date;
}

export interface UpdateRoleDto {
    name?: string;
    description?: string;
    code?: string;
    type?: string;
    priority?: number;
    isActive?: boolean;
    modifiedBy?: string;
    modifiedAt?: Date;
}

export interface RoleWithRelationsDto {
    id: number;
    name: string;
    description?: string;
    code: string;
    type?: string;
    priority?: number;
    users?: any[]; // User entities
    groups?: any[]; // Group entities
    isActive?: boolean;
    createdBy?: string;
    createdAt?: Date;
    modifiedBy?: string;
    modifiedAt?: Date;
} 