export interface CreateGroupDto {
    name: string;
    description?: string;
    code: string;
    type?: string;
    parentId?: number;
    isActive?: boolean;
    createdBy?: string;
    createdAt?: Date;
    modifiedBy?: string;
    modifiedAt?: Date;
}

export interface UpdateGroupDto {
    name?: string;
    description?: string;
    code?: string;
    type?: string;
    parentId?: number;
    isActive?: boolean;
    modifiedBy?: string;
    modifiedAt?: Date;
}

export interface GroupWithRelationsDto {
    id: number;
    name: string;
    description?: string;
    code: string;
    type?: string;
    parentId?: number;
    users?: any[]; // User entities
    roles?: any[]; // Role entities
    isActive?: boolean;
    createdBy?: string;
    createdAt?: Date;
    modifiedBy?: string;
    modifiedAt?: Date;
} 