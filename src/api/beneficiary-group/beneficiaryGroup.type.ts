// src/types/financial-year.ts
export interface CreateBeneficiaryGroupDto {
    name: string;
    duration: string;
    startDate: Date;
    endDate: Date;
    isActive?: boolean;
    isCurrent?: boolean;
    createdBy?: string;
    modifiedBy?: string;
}

export interface UpdateBeneficiaryGroupDto extends Partial<CreateBeneficiaryGroupDto> {
    modifiedBy: string;
    modifiedAt: Date;
}