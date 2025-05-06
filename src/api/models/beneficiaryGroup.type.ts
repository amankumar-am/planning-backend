// src/api/models/beneficiary-group.type.ts
export interface CreateBeneficiaryGroupDto {
    name: string;
    name_gu: string;
    description: string;
    endDate: Date;
    createdBy?: string;
    modifiedBy?: string;
    isActive?: boolean;
}

export interface UpdateBeneficiaryGroupDto extends Partial<CreateBeneficiaryGroupDto> {
    modifiedBy: string;
    modifiedAt: Date;
}