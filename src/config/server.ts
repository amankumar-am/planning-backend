// config/server.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import config from './env';

export const createServer = () => {
    const app = express();

    // Middlewares
    app.use(cors({
        origin: config.NODE_ENV === 'production' ? 'your-angular-app-domain' : '*'
    }));
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    console.log('Registered routes:');
    // Health check
    app.get('/health', (req, res) => {
        res.status(200).json({ status: 'OK' });
    });

    return app;
};