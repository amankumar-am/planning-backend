// src/modules/financial-year/financialYear.service.ts

import { BaseService } from '../../core/base.service';
import { BaseRepository } from '../../core/base.repository';
import { FinancialYear } from './financialYear.entity';
import { FinancialYearRepository } from './financialYear.repository';
import { CreateFinancialYearDto, UpdateFinancialYearDto } from './financialYear.type';


export class FinancialYearService extends BaseService<FinancialYear> {
    constructor(private readonly fyRepository: FinancialYearRepository) {
        super(fyRepository);
    }

    async create(dto: CreateFinancialYearDto): Promise<FinancialYear> {
        return this.fyRepository.create({
            ...dto,
            isActive: dto.isActive ?? true,
            createdBy: dto.createdBy ?? 'system',
            createdAt: dto.createdAt ?? new Date(),
            modifiedBy: dto.modifiedBy ?? 'system',
            modifiedAt: dto.modifiedAt ?? null,
        });
    }

    async update(id: number, dto: UpdateFinancialYearDto): Promise<FinancialYear> {
        const fund = await this.fyRepository.findOneOrFail({ where: { id } });
        Object.assign(fund, {
            ...dto,
            modifiedBy: dto.modifiedBy,
            modifiedAt: dto.modifiedAt,
        });
        return this.fyRepository.save(fund);
    }

    async findAll(): Promise<FinancialYear[]> {
        const funds = await this.fyRepository.findAll();
        console.log('Funds:', funds); // Debug log
        return funds;
    }

    async findOne(id: number): Promise<FinancialYear> {
        const fund = await this.fyRepository.findById(id);
        if (!fund) {
            throw new Error(`Fund with id ${id} not found`);
        }
        return fund;
    }
}