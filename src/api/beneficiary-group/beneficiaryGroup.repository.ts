// src/repositories/financial-year.repository.ts
import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/database';
import { BeneficiaryGroup } from './beneficiaryGroup.entity';
import { CreateBeneficiaryGroupDto, UpdateBeneficiaryGroupDto } from './beneficiaryGroup.type';

export class BeneficiaryGroupRepository {
    private repository: Repository<BeneficiaryGroup>;

    constructor() {
        this.repository = AppDataSource.getRepository(BeneficiaryGroup);
    }

    async findAll(): Promise<BeneficiaryGroup[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<BeneficiaryGroup | null> {
        return this.repository.findOne({ where: { id } });
    }

    async findCurrent(): Promise<BeneficiaryGroup | null> {
        return this.repository.findOne({ where: { isCurrent: true } });
    }

    async create(beneficiaryGroupData: CreateBeneficiaryGroupDto): Promise<BeneficiaryGroup> {
        const beneficiaryGroup = this.repository.create(beneficiaryGroupData);
        return this.repository.save(beneficiaryGroup);
    }

    async update(id: number, beneficiaryGroupData: UpdateBeneficiaryGroupDto): Promise<BeneficiaryGroup | null> {
        await this.repository.update(id, beneficiaryGroupData);
        return this.findById(id);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }

    async setAsCurrent(id: number): Promise<void> {
        // Reset all other financial years as not current
        await this.repository.update({ isCurrent: true }, { isCurrent: false });
        // Set the selected one as current
        await this.repository.update(id, { isCurrent: true });
    }
}