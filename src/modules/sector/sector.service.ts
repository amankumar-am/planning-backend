// src/modules/sector/sector.service.ts

import { BaseService } from '../../core/base.service';
import { SectorEntity } from './sector.entity';
import { SectorRepository } from './sector.repository';
import { CreateSectorDto, UpdateSectorDto } from './sector.type';

export class SectorService extends BaseService<SectorEntity> {
    constructor(private readonly sectorRepository: SectorRepository) {
        super(sectorRepository);
    }

    async create(dto: CreateSectorDto): Promise<SectorEntity> {
        return this.sectorRepository.create({
            ...dto,
            isActive: dto.isActive ?? true,
            createdBy: dto.createdBy ?? 'system',
            createdAt: dto.createdAt ?? new Date(),
            modifiedBy: dto.modifiedBy ?? 'system',
            modifiedAt: dto.modifiedAt ?? null,
        });
    }

    async update(id: number, dto: UpdateSectorDto): Promise<SectorEntity> {
        const sector = await this.sectorRepository.findOneOrFail({ where: { id } });
        Object.assign(sector, {
            ...dto,
            modifiedBy: dto.modifiedBy,
            modifiedAt: dto.modifiedAt,
        });
        return this.sectorRepository.save(sector);
    }

    async findAll(): Promise<SectorEntity[]> {
        const sectors = await this.sectorRepository.findAll();
        console.log('Funds:', sectors); // Debug log
        return sectors;
    }

    async findOne(id: number): Promise<SectorEntity> {
        const sector = await this.sectorRepository.findById(id);
        if (!sector) {
            throw new Error(`Fund with id ${id} not found`);
        }
        return sector;
    }

    async totalCount(): Promise<number> {
        return this.sectorRepository.totalCount();
    }
}