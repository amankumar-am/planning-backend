// src/modules/beneficiary-group/beneficiaryGroup.repository.ts

import { BeneficiaryGroup } from './beneficiaryGroup.entity';
import { BaseRepository } from '../../core/base.repository';

export class BeneficiaryGroupRepository extends BaseRepository<BeneficiaryGroup> {
    constructor() {
        super(BeneficiaryGroup);
    }
}