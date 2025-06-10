// src/modules/designation/designation.repository.ts

import { DesignationEntity } from './designation.entity';
import { BaseRepository } from '../../core/base.repository';
export class DesignationRepository extends BaseRepository<DesignationEntity> {
  constructor() {
    super(DesignationEntity);
  }

  async findByDepartmentId(departmentId: number): Promise<DesignationEntity[]> {
    return this.repository.find({
      where: { department: { id: departmentId } },
      relations: ['department'],
    });
  }

  async totalCount(): Promise<number> {
    return this.repository.count();
  }
}