// src/api/financial-year/financial-year.repository.ts
import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/database';
import { FinancialYear } from './financialYear.entity';
import { CreateFinancialYearDto, UpdateFinancialYearDto } from '../models/financialYear.type';

export class FinancialYearRepository {
    private repository: Repository<FinancialYear>;

    constructor() {
        this.repository = AppDataSource.getRepository(FinancialYear);
    }

    async findAll(): Promise<FinancialYear[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<FinancialYear | null> {
        return this.repository.findOne({ where: { id } });
    }

    async findCurrent(): Promise<FinancialYear | null> {
        return this.repository.findOne({ where: { isCurrent: true } });
    }

    async create(financialYearData: CreateFinancialYearDto): Promise<FinancialYear> {
        const financialYear = this.repository.create(financialYearData);
        return this.repository.save(financialYear);
    }

    async update(id: number, financialYearData: UpdateFinancialYearDto): Promise<FinancialYear | null> {
        await this.repository.update(id, financialYearData);
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