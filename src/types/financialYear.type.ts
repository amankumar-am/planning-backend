// src/types/financial-year.ts
export interface CreateFinancialYearDto {
    name: string;
    duration: string;
    startDate: Date;
    endDate: Date;
    isActive?: boolean;
    isCurrent?: boolean;
    createdBy?: string;
    modifiedBy?: string;
}

export interface UpdateFinancialYearDto extends Partial<CreateFinancialYearDto> {
    modifiedBy: string;
    modifiedAt: Date;
}