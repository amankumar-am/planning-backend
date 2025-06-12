// src/modules/office/office.repository.ts

import { OfficeEntity } from './office.entity';
import { BaseRepository } from '../../core/base.repository';

export class OfficeRepository extends BaseRepository<OfficeEntity> {
    constructor() {
        super(OfficeEntity);
    }

    // async findBySectorId(sectorId: number): Promise<OfficeEntity[]> {
    //     return this.repository.find({
    //         where: { sector: { id: sectorId } },
    //         relations: ['sector'],
    //     });
    // }

    async findAllWithRelations(relations: string[]): Promise<OfficeEntity[]> {
        return this.repository.find({ relations });
    }
}