// src/modules/forms/ps1/ps1.service.ts

import { BaseService } from '../../../core/base.service';
import { PS1Entity } from './ps1.entity';
import { PS1Repository } from './ps1.repository';
import { CreatePS1Dto, UpdatePS1Dto } from './ps1.type';
import { DeepPartial } from 'typeorm';

export class PS1Service extends BaseService<PS1Entity> {
    constructor(private readonly ps1Repository: PS1Repository) {
        super(ps1Repository);
    }

    async createPS1(dto: CreatePS1Dto): Promise<PS1Entity> {
        const data = {
            ...dto,
            financialYear: dto.financialYear ? { id: Number(dto.financialYear) } : null,
            fund: dto.fund ? { id: Number(dto.fund) } : null,
            mpmla: dto.mpmla ? { id: Number(dto.mpmla) } : null,
            sector: dto.sector ? { id: Number(dto.sector) } : null,
            subSector: dto.subSector ? { id: Number(dto.subSector) } : null,
            district: dto.district ? { id: Number(dto.district) } : null,
            taluka: dto.taluka ? { id: Number(dto.taluka) } : null,
            village: dto.village ? { id: Number(dto.village) } : null,
            nagarpalika: dto.nagarpalika ? { id: Number(dto.nagarpalika) } : null,
            demandOfficer: dto.demandOfficer ? { id: Number(dto.demandOfficer) } : null,
            assignPSTo: dto.assignPSTo ? { id: Number(dto.assignPSTo) } : null,
            implementationOfficer: dto.implementationOfficer ? { id: Number(dto.implementationOfficer) } : null,
            isActive: dto.isActive ?? true,
            createdBy: dto.createdBy ?? 'system',
            createdAt: dto.createdAt ?? new Date(),
            modifiedBy: dto.modifiedBy ?? 'system',
            modifiedAt: dto.modifiedAt ?? null
        } as DeepPartial<PS1Entity>;

        return super.create(data);
    }

    async updatePS1(id: number, dto: UpdatePS1Dto): Promise<PS1Entity | null> {
        const ps1 = await this.ps1Repository.findOneOrFail({
            where: { id },
            relations: [
                'financialYear', 'fund', 'mpmla', 'sector', 'subSector',
                'district', 'taluka', 'village', 'nagarpalika',
                'demandOfficer', 'assignPSTo', 'implementationOfficer'
            ]
        });

        const data = {
            ...dto,
            financialYear: dto.financialYear ? { id: Number(dto.financialYear) } : ps1.financialYear,
            fund: dto.fund ? { id: Number(dto.fund) } : ps1.fund,
            mpmla: dto.mpmla ? { id: Number(dto.mpmla) } : ps1.mpmla,
            sector: dto.sector ? { id: Number(dto.sector) } : ps1.sector,
            subSector: dto.subSector ? { id: Number(dto.subSector) } : ps1.subSector,
            district: dto.district ? { id: Number(dto.district) } : ps1.district,
            taluka: dto.taluka ? { id: Number(dto.taluka) } : ps1.taluka,
            village: dto.village ? { id: Number(dto.village) } : ps1.village,
            nagarpalika: dto.nagarpalika ? { id: Number(dto.nagarpalika) } : ps1.nagarpalika,
            demandOfficer: dto.demandOfficer ? { id: Number(dto.demandOfficer) } : ps1.demandOfficer,
            assignPSTo: dto.assignPSTo ? { id: Number(dto.assignPSTo) } : ps1.assignPSTo,
            implementationOfficer: dto.implementationOfficer ? { id: Number(dto.implementationOfficer) } : ps1.implementationOfficer,
            modifiedBy: dto.modifiedBy,
            modifiedAt: new Date()
        } as DeepPartial<PS1Entity>;

        return super.update(id, data);
    }

    async findAll(): Promise<PS1Entity[]> {
        const ps1s = await this.ps1Repository.findAll();
        return ps1s;
    }

    async findOne(id: number): Promise<PS1Entity> {
        const ps1 = await this.ps1Repository.findById(id);
        if (!ps1) {
            throw new Error(`PS1 with id ${id} not found`);
        }
        return ps1;
    }

    async findAllWithRelations(): Promise<PS1Entity[]> {
        return this.ps1Repository.findAllWithRelations([
            'financialYear',
            'fund',
            'mpmla',
            'sector',
            'subSector',
            'district',
            'taluka',
            'village',
            'nagarpalika',
            'demandOfficer',
            'assignPSTo',
            'implementationOfficer'
        ]);
    }

    async findByFinancialYear(financialYearId: number): Promise<PS1Entity[]> {
        const ps1s = await this.ps1Repository.findByFinancialYearId(financialYearId);
        if (!ps1s || ps1s.length === 0) {
            throw new Error(`No PS1 forms found for financial year ID ${financialYearId}`);
        }
        return ps1s;
    }
}