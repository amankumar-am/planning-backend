// src/routes.ts

import { Router } from 'express';

import stateRoute from './modules/state/state.route';
import districtRoute from './modules/district/district.route';
import prantRoute from './modules/prant/prant.route';
import acRoute from './modules/ac/ac.route';
import fyRoute from './modules/financial-year/financialYear.route';
import bgRoute from './modules/beneficiary-group/beneficiaryGroup.route';
import fundRoute from './modules/fund/fund.route';
import sectorRoute from './modules/sector/sector.route';
import subsectorRoute from './modules/subsector/subsector.route';
import talukaRoute from './modules/taluka/taluka.route';
import gpVillageRoute from './modules/gpVillage/gpVillage.route';
import planningstage1Route from './modules/dashboard/dashboard.route';
import userRoute from './modules/auth/auth.route';
import departmentRoute from './modules/department/department.route';
import officeRoute from './modules/office/office.route';
import designationRoute from './modules/designation/designation.route';
import empTypeRoute from './modules/employmentType/employmentType.route';
import mpmlaRoute from './modules/mpmla/mpmla.route';
import officeLevelRoute from './modules/officeLevel/officeLevel.route';
import officerClassRoute from './modules/officerClass/officerClass.route';
import ps1Route from './modules/forms/ps1/ps1.route';
import roleRoute from './modules/role/role.route';
import groupRoute from './modules/group/group.route';

const apiRouter = Router();

apiRouter.use('/fy', fyRoute);
apiRouter.use('/bg', bgRoute);
apiRouter.use('/funds', fundRoute);
apiRouter.use('/sectors', sectorRoute);
apiRouter.use('/subSectors', subsectorRoute);
apiRouter.use('/states', stateRoute)
apiRouter.use('/districts', districtRoute);
apiRouter.use('/prants', prantRoute);
apiRouter.use('/acs', acRoute);
apiRouter.use('/talukas', talukaRoute);
apiRouter.use('/gpVillages', gpVillageRoute);
apiRouter.use('/users', userRoute);
apiRouter.use('/departments', departmentRoute);
apiRouter.use('/offices', officeRoute);
apiRouter.use('/designations', designationRoute);
apiRouter.use('/empTypes', empTypeRoute);
apiRouter.use('/mpmlas', mpmlaRoute);
apiRouter.use('/offLevels', officeLevelRoute);
apiRouter.use('/offClasses', officerClassRoute);
apiRouter.use('/ps1', planningstage1Route);
apiRouter.use('/ps1Route', ps1Route);
apiRouter.use('/roles', roleRoute);
apiRouter.use('/groups', groupRoute);


export default apiRouter;