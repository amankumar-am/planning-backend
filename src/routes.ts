// src/routes.ts

import { Router } from 'express';
import fundRoutes from './modules/fund/fund.routes';
import fyRoutes from './modules/financial-year/financialYear.routes';
import bgRoutes from './modules/beneficiary-group/beneficiaryGroup.routes';

const apiRouter = Router();

apiRouter.use('/fy', fyRoutes);
apiRouter.use('/bg', bgRoutes);
apiRouter.use('/funds', fundRoutes);


export default apiRouter;