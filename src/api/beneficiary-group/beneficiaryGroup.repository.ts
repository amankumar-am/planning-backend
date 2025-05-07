// src/api/beneficiary-group/beneficiaryGroup.repository.ts
import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/database';
import { BeneficiaryGroup } from './beneficiaryGroup.entity';
import { CreateBeneficiaryGroupDto, UpdateBeneficiaryGroupDto } from '../models/beneficiaryGroup.type';

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
}