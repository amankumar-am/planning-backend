// src/routes.ts

import { Router } from 'express';
import fundRoutes from './modules/fund/fund.routes';
import fyRoutes from './modules/financial-year/financialYear.routes';
import bgRoutes from './modules/beneficiary-group/beneficiaryGroup.routes';
import sectorRoutes from 'modules/sector/sector.routes';
import subsectorRoutes from 'modules/subsector/subSector.routes';

const apiRouter = Router();

apiRouter.use('/fy', fyRoutes);
apiRouter.use('/bg', bgRoutes);
apiRouter.use('/funds', fundRoutes);
apiRouter.use('/sectors', sectorRoutes);
apiRouter.use('/subSectors', subsectorRoutes);

export default apiRouter;