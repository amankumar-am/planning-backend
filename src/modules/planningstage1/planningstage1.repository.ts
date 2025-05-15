// src/modules/planningstage1/planningstage1.repository.ts

import { PlanningStage1Entity } from './planningstage1.entity';
import { BaseRepository } from '../../core/base.repository';

export class PlanningStage1Repository extends BaseRepository<PlanningStage1Entity> {
  constructor() {
    super(PlanningStage1Entity);
  }

  async findAll(): Promise<PlanningStage1Entity[]> {
    return this.repository.find({
      relations: ['financialYear', 'fund', 'taluka', 'sector'], // Specify relations to load
    });
  }

  async findById(id: number): Promise<PlanningStage1Entity | null> {
    return this.repository.findOne({
      where: { id } as any,
      relations: ['financialYear', 'fund', 'taluka', 'sector'], // Specify relations to load
    });
  }


}