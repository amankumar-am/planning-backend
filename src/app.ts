import { createServer } from './config/server';
import { AppDataSource } from './config/database';
import config from './config/env';
import fyRoutes from './routes/financialYear.routes';

// Initialize database
AppDataSource.initialize()
    .then(() => {
        console.log('Database connected');

        // Create Express server
        const app = createServer();

        // Routes
        app.use('/api/fy', fyRoutes);

        // Start server
        app.listen(config.PORT, () => {
            console.log(`Server running on port ${config.PORT}`);
        });
    })
    .catch((error) => {
        console.log('Database connection failed', error);
        process.exit(1);
    });