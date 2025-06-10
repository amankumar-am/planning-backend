// src/modules/department/department.repository.ts

import { DepartmentEntity } from './department.entity';
import { BaseRepository } from '../../core/base.repository';
export class DepartmentRepository extends BaseRepository<DepartmentEntity> {
  constructor() {
    super(DepartmentEntity);
  }

  async totalCount(): Promise<number> {
    return this.repository.count();
  }
}