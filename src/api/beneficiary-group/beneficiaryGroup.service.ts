// src/services/financial-year.service.ts
import { BeneficiaryGroupRepository } from './beneficiaryGroup.repository';
import { BeneficiaryGroup } from './beneficiaryGroup.entity';
import { CreateBeneficiaryGroupDto, UpdateBeneficiaryGroupDto } from './beneficiaryGroup.type';

export class BeneficiaryGroupService {
    constructor(private beneficiaryGroupRepository: BeneficiaryGroupRepository) { }

    async getAllBeneficiaryGroups(): Promise<BeneficiaryGroup[]> {
        return this.beneficiaryGroupRepository.findAll();
    }

    async getBeneficiaryGroupById(id: number): Promise<BeneficiaryGroup | null> {
        return this.beneficiaryGroupRepository.findById(id);
    }

    async getCurrentBeneficiaryGroup(): Promise<BeneficiaryGroup | null> {
        return this.beneficiaryGroupRepository.findCurrent();
    }

    async createBeneficiaryGroup(beneficiaryGroupData: CreateBeneficiaryGroupDto): Promise<BeneficiaryGroup> {
        // Validate date range
        if (beneficiaryGroupData.startDate >= beneficiaryGroupData.endDate) {
            throw new Error('End date must be after start date');
        }

        // Check for overlapping financial years
        const existing = await this.beneficiaryGroupRepository.findAll();
        const isOverlapping = existing.some(fy =>
            (beneficiaryGroupData.startDate <= fy.endDate && beneficiaryGroupData.endDate >= fy.startDate)
        );

        if (isOverlapping) {
            throw new Error('Financial year dates overlap with an existing financial year');
        }

        return this.beneficiaryGroupRepository.create(beneficiaryGroupData);
    }

    async updateBeneficiaryGroup(id: number, beneficiaryGroupData: UpdateBeneficiaryGroupDto): Promise<BeneficiaryGroup | null> {
        // Add similar validation as create if needed
        return this.beneficiaryGroupRepository.update(id, beneficiaryGroupData);
    }

    async deleteBeneficiaryGroup(id: number): Promise<void> {
        return this.beneficiaryGroupRepository.delete(id);
    }

    async setCurrentBeneficiaryGroup(id: number): Promise<void> {
        return this.beneficiaryGroupRepository.setAsCurrent(id);
    }
}