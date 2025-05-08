// src/modules/sector/sector.repository.ts


import { BaseRepository } from '../../core/base.repository';
import { SectorEntity } from './sector.entity';

export class SectorRepository extends BaseRepository<SectorEntity> {
    constructor() {
        super(SectorEntity);
    }
}