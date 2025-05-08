// src/modules/fund/fund.service.ts

import { BaseService } from '../../core/base.service';
import { FundRepository } from './fund.repository';
import { Fund } from './fund.entity';
import { CreateFundDto, UpdateFundDto } from './fund.type';

export class FundService extends BaseService<Fund> {
    constructor(private readonly fundRepository: FundRepository) {
        super(fundRepository);
    }

    async create(dto: CreateFundDto): Promise<Fund> {
        return this.fundRepository.create({
            ...dto,
            isActive: dto.isActive ?? true,
            createdBy: dto.createdBy ?? 'system',
            createdAt: dto.createdAt ?? new Date(),
            modifiedBy: dto.modifiedBy ?? 'system',
            modifiedAt: dto.modifiedAt ?? null,
        });
    }

    async update(id: number, dto: UpdateFundDto): Promise<Fund> {
        const fund = await this.fundRepository.findOneOrFail({ where: { id } });
        Object.assign(fund, {
            ...dto,
            modifiedBy: dto.modifiedBy,
            modifiedAt: dto.modifiedAt,
        });
        return this.fundRepository.save(fund);
    }

    async findAll(): Promise<Fund[]> {
        const funds = await this.fundRepository.findAll();
        console.log('Funds:', funds); // Debug log
        return funds;
    }

    async findOne(id: number): Promise<Fund> {
        const fund = await this.fundRepository.findById(id);
        if (!fund) {
            throw new Error(`Fund with id ${id} not found`);
        }
        return fund;
    }
}