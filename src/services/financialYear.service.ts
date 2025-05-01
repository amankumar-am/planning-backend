// src/services/financial-year.service.ts
import { FinancialYearRepository } from '../repositories/financialYear.repository';
import { FinancialYear } from '../models/financialYear.entity';
import { CreateFinancialYearDto, UpdateFinancialYearDto } from '../types/financialYear.type';

export class FinancialYearService {
    constructor(private financialYearRepository: FinancialYearRepository) { }

    async getAllFinancialYears(): Promise<FinancialYear[]> {
        return this.financialYearRepository.findAll();
    }

    async getFinancialYearById(id: number): Promise<FinancialYear | null> {
        return this.financialYearRepository.findById(id);
    }

    async getCurrentFinancialYear(): Promise<FinancialYear | null> {
        return this.financialYearRepository.findCurrent();
    }

    async createFinancialYear(financialYearData: CreateFinancialYearDto): Promise<FinancialYear> {
        // Validate date range
        if (financialYearData.startDate >= financialYearData.endDate) {
            throw new Error('End date must be after start date');
        }

        // Check for overlapping financial years
        const existing = await this.financialYearRepository.findAll();
        const isOverlapping = existing.some(fy =>
            (financialYearData.startDate <= fy.endDate && financialYearData.endDate >= fy.startDate)
        );

        if (isOverlapping) {
            throw new Error('Financial year dates overlap with an existing financial year');
        }

        return this.financialYearRepository.create(financialYearData);
    }

    async updateFinancialYear(id: number, financialYearData: UpdateFinancialYearDto): Promise<FinancialYear | null> {
        // Add similar validation as create if needed
        return this.financialYearRepository.update(id, financialYearData);
    }

    async deleteFinancialYear(id: number): Promise<void> {
        return this.financialYearRepository.delete(id);
    }

    async setCurrentFinancialYear(id: number): Promise<void> {
        return this.financialYearRepository.setAsCurrent(id);
    }
}