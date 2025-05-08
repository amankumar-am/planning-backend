// src/modules/fund/fund.service.ts

import { BaseService } from '../../core/base.service';
import { FundRepository } from './fund.repository';
import { FundEntity } from './fund.entity';
import { CreateFundDto, UpdateFundDto } from './fund.type';

export class FundService extends BaseService<FundEntity> {
    constructor(private readonly fundRepository: FundRepository) {
        super(fundRepository);
    }

    async create(dto: CreateFundDto): Promise<FundEntity> {
        return this.fundRepository.create({
            ...dto,
            isActive: dto.isActive ?? true,
            createdBy: dto.createdBy ?? 'system',
            createdAt: dto.createdAt ?? new Date(),
            modifiedBy: dto.modifiedBy ?? 'system',
            modifiedAt: dto.modifiedAt ?? null,
        });
    }

    async update(id: number, dto: UpdateFundDto): Promise<FundEntity> {
        const fund = await this.fundRepository.findOneOrFail({ where: { id } });
        Object.assign(fund, {
            ...dto,
            modifiedBy: dto.modifiedBy,
            modifiedAt: dto.modifiedAt,
        });
        return this.fundRepository.save(fund);
    }

    async findAll(): Promise<FundEntity[]> {
        const funds = await this.fundRepository.findAll();
        console.log('Funds:', funds); // Debug log
        return funds;
    }

    async findOne(id: number): Promise<FundEntity> {
        const fund = await this.fundRepository.findById(id);
        if (!fund) {
            throw new Error(`Fund with id ${id} not found`);
        }
        return fund;
    }
}