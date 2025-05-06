// app.ts
import { createServer } from './config/server';
import { AppDataSource } from './config/database';
import config from './config/env';
import fyRoutes from './api/financial-year/financialYear.routes';
import bgRoutes from './api/beneficiary-group/beneficiaryGroup.routes';
// Initialize database
AppDataSource.initialize()
    .then(() => {
        console.log('Database connected');
        // Create Express server
        const app = createServer();
        // Routes
        app.use('/api/fy', fyRoutes);
        // app.use('/api/bg', bgRoutes);
        // Start server
        app.listen(config.PORT, () => {
            console.log(`Server running on port ${config.PORT}`);
        });
    })
    .catch((error) => {
        console.log('Database connection failed', error);
        process.exit(1);
    });