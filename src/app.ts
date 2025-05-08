// src/app.ts
import { createServer } from './server';
import { AppDataSource } from './config/database';
import config from './config/env';
// import fyRoutes from './modules/financial-year/financialYear.routes';
// import bgRoutes from './modules/beneficiary-group/beneficiaryGroup.routes';
// import fundRoutes from './modules/fund/fund.routes';
import apiRouter from './routes';
// Initialize database
AppDataSource.initialize()
    .then(() => {
        console.log('Database connected');
        // Create Express server
        const app = createServer();
        // Routes
        app.use('/api', apiRouter);
        // app.use('/api/bg', bgRoutes);
        // app.use('/api/fund', fundRoutes);
        // Start server
        app.listen(config.PORT, () => {
            console.log(`Server running on port ${config.PORT}`);
        });
    })
    .catch((error) => {
        console.log('Database connection failed', error);
        process.exit(1);
    });