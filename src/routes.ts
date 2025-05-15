// src/routes.ts

import { Router } from 'express';

import districtRoute from './modules/district/district.route';
import fyRoute from './modules/financial-year/financialYear.route';
import bgRoute from './modules/beneficiary-group/beneficiaryGroup.route';
import fundRoute from './modules/fund/fund.route';
import sectorRoute from './modules/sector/sector.route';
import subsectorRoute from './modules/subsector/subsector.route';
import talukaRoute from './modules/taluka/taluka.route';
import gpVillageRoute from './modules/gpVillage/gpVillage.route';
import planningstage1Route from './modules/planningstage1/planningstage1.route';


const apiRouter = Router();

apiRouter.use('/fy', fyRoute);
apiRouter.use('/bg', bgRoute);
apiRouter.use('/funds', fundRoute);
apiRouter.use('/sectors', sectorRoute);
apiRouter.use('/subSectors', subsectorRoute);
apiRouter.use('/districts', districtRoute);
apiRouter.use('/talukas', talukaRoute);
apiRouter.use('/gpVillages', gpVillageRoute);
apiRouter.use('/ps1', planningstage1Route);

export default apiRouter;