// src/modules/fund/fund.routes.ts

import { Router } from 'express';
import { FundController } from './fund.controller';
import { FundService } from './fund.service';
import { BaseRepository } from '../../core/base.repository';
import { Fund } from './fund.entity';
import { createModuleRouter } from '../../core/module.factory';

const fundRepository = new BaseRepository(Fund);
const fundService = new FundService(fundRepository);
const fundController = new FundController(fundService);

export default createModuleRouter(fundController, '/funds');