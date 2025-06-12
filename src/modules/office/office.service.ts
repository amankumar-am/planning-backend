// src/modules/office/office.service.ts

import { BaseService } from '../../core/base.service';
import { OfficeEntity } from './office.entity';
import { OfficeRepository } from './office.repository';
import { CreateOfficeDto, UpdateOfficeDto } from './office.type';

export class OfficeService extends BaseService<OfficeEntity> {
    constructor(private readonly officeRepository: OfficeRepository) {
        super(officeRepository);
    }

    async create(dto: CreateOfficeDto): Promise<OfficeEntity> {
        return this.officeRepository.create({
            ...dto,
            officeLevel: { id: dto.officeLevel } as any,
            department: { id: dto.department } as any,
            reportsTo: { id: dto.reportsTo } as any,
            state: { id: dto.state } as any,
            district: { id: dto.district } as any,
            prant: { id: dto.prant } as any,
            taluka: { id: dto.taluka } as any,
            village: { id: dto.village } as any,
            isActive: dto.isActive ?? true,
            createdBy: dto.createdBy ?? 'system',
            createdAt: dto.createdAt ?? new Date(),
            modifiedBy: dto.modifiedBy ?? 'system',
            modifiedAt: dto.modifiedAt ?? null,
        });
    }

    async update(id: number, dto: UpdateOfficeDto): Promise<OfficeEntity> {
        const office = await this.officeRepository.findOneOrFail({ where: { id } });
        Object.assign(office, {
            ...dto,
            modifiedBy: dto.modifiedBy,
            modifiedAt: dto.modifiedAt,
        });
        return this.officeRepository.save(office);
    }

    async findAll(): Promise<OfficeEntity[]> {
        const offices = await this.officeRepository.findAll();
        return offices;
    }

    async findAllWithRelations(): Promise<OfficeEntity[]> {
        return this.officeRepository.findAllWithRelations(['department', 'reportsTo', 'state', 'district', 'prant', 'taluka', 'village']);
    }
}