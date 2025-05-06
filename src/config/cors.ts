import config from './env';

export const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
    credentials: true,  // If you need to allow cookies or credentials
    preflightContinue: false,  // Set to true if you want to handle preflight requests manually
    optionsSuccessStatus: 204  // Status code for successful OPTIONS requests
};