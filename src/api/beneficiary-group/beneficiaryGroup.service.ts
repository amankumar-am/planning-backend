// src/services/financial-year.service.ts
import { BeneficiaryGroupRepository } from './beneficiaryGroup.repository';
import { BeneficiaryGroup } from './beneficiaryGroup.entity';
import { CreateBeneficiaryGroupDto, UpdateBeneficiaryGroupDto } from '../models/beneficiaryGroup.type';

export class BeneficiaryGroupService {
    constructor(private beneficiaryGroupRepository: BeneficiaryGroupRepository) { }

    async getAllBeneficiaryGroups(): Promise<BeneficiaryGroup[]> {
        return this.beneficiaryGroupRepository.findAll();
    }

    async getBeneficiaryGroupById(id: number): Promise<BeneficiaryGroup | null> {
        return this.beneficiaryGroupRepository.findById(id);
    }

    async createBeneficiaryGroup(beneficiaryGroupData: CreateBeneficiaryGroupDto): Promise<BeneficiaryGroup> {
        return this.beneficiaryGroupRepository.create(beneficiaryGroupData);
    }

    async updateBeneficiaryGroup(id: number, beneficiaryGroupData: UpdateBeneficiaryGroupDto): Promise<BeneficiaryGroup | null> {
        // Add similar validation as create if needed
        return this.beneficiaryGroupRepository.update(id, beneficiaryGroupData);
    }

    async deleteBeneficiaryGroup(id: number): Promise<void> {
        return this.beneficiaryGroupRepository.delete(id);
    }
}