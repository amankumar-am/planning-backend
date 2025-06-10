// src/modules/employmentType/employmentType.repository.ts

import { EmploymentTypeEntity } from './employmentType.entity';
import { BaseRepository } from '../../core/base.repository';

export class EmploymentTypeRepository extends BaseRepository<EmploymentTypeEntity> {
  constructor() {
    super(EmploymentTypeEntity);
  }
}