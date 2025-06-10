// src/routes.ts

import { Router } from 'express';

import stateRoute from './modules/state/state.route';
import districtRoute from './modules/district/district.route';
import acRoute from './modules/ac/ac.route';
import fyRoute from './modules/financial-year/financialYear.route';
import bgRoute from './modules/beneficiary-group/beneficiaryGroup.route';
import fundRoute from './modules/fund/fund.route';
import sectorRoute from './modules/sector/sector.route';
import subsectorRoute from './modules/subsector/subsector.route';
import talukaRoute from './modules/taluka/taluka.route';
import gpVillageRoute from './modules/gpVillage/gpVillage.route';
import planningstage1Route from './modules/dashboard/dashboard.route';
import authRoute from './modules/auth/auth.route';
import departmentRoute from './modules/department/department.route';
import designationRoute from './modules/designation/designation.route';
import empTypeRoute from './modules/employmentType/employmentType.route';
import mpmlaRoute from './modules/mpmla/mpmla.route';
const apiRouter = Router();

apiRouter.use('/fy', fyRoute);
apiRouter.use('/bg', bgRoute);
apiRouter.use('/funds', fundRoute);
apiRouter.use('/sectors', sectorRoute);
apiRouter.use('/subSectors', subsectorRoute);
apiRouter.use('/states', stateRoute)
apiRouter.use('/districts', districtRoute);
apiRouter.use('/acs', acRoute);
apiRouter.use('/talukas', talukaRoute);
apiRouter.use('/gpVillages', gpVillageRoute);
apiRouter.use('/ps1', planningstage1Route);
apiRouter.use('/auth', authRoute);
apiRouter.use('/departments', departmentRoute);
apiRouter.use('/designations', designationRoute);
apiRouter.use('/empTypes', empTypeRoute);
apiRouter.use('/mpmlas', mpmlaRoute);

export default apiRouter;