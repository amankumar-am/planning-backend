// src/modules/beneficiary-group/beneficiaryGroup.service.ts

import { BaseService } from '../../core/base.service';
import { BeneficiaryGroup } from './beneficiaryGroup.entity';
import { CreateBeneficiaryGroupDto, UpdateBeneficiaryGroupDto } from './beneficiaryGroup.type';
import { BeneficiaryGroupRepository } from './beneficiaryGroup.repository';


export class BeneficiaryGroupService extends BaseService<BeneficiaryGroup> {
    constructor(private readonly bgRepository: BeneficiaryGroupRepository) {
        super(bgRepository);
    }

    async create(dto: CreateBeneficiaryGroupDto): Promise<BeneficiaryGroup> {
        return this.bgRepository.create({
            ...dto,
            isActive: dto.isActive ?? true,
            createdBy: dto.createdBy ?? 'system',
            createdAt: dto.createdAt ?? new Date(),
            modifiedBy: dto.modifiedBy ?? 'system',
            modifiedAt: dto.modifiedAt ?? null,
        });
    }

    async update(id: number, dto: UpdateBeneficiaryGroupDto): Promise<BeneficiaryGroup> {
        const fund = await this.bgRepository.findOneOrFail({ where: { id } });
        Object.assign(fund, {
            ...dto,
            modifiedBy: dto.modifiedBy,
            modifiedAt: dto.modifiedAt,
        });
        return this.bgRepository.save(fund);
    }

    async findAll(): Promise<BeneficiaryGroup[]> {
        const funds = await this.bgRepository.findAll();
        return funds;
    }

    async findOne(id: number): Promise<BeneficiaryGroup> {
        const fund = await this.bgRepository.findById(id);
        if (!fund) {
            throw new Error(`Fund with id ${id} not found`);
        }
        return fund;
    }
}