// src/config/database.ts

import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const {
    DB_HOST = 'localhost',
    DB_PORT = '5432',
    DB_USER = 'postgres',
    DB_PASSWORD = 'password',
    DB_NAME = 'planning_db',
    NODE_ENV = 'development',
} = process.env;

// Log for debugging
console.log('Loading database.ts with env:', {
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_NAME,
    NODE_ENV,
});

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: DB_HOST,
    port: parseInt(DB_PORT, 10),
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: false, // Use migrations
    logging: true,
    entities: ['src/modules/**/*.entity.ts'],
    migrations: ['src/migrations/**/*.ts'],
    subscribers: [],
});

// Initialize only for runtime, not CLI
if (NODE_ENV !== 'migration' && process.argv[2] !== 'migration:generate' && process.argv[2] !== 'migration:run') {
    AppDataSource.initialize()
        .then(() => {
            console.log('Data Source has been initialized!');
        })
        .catch((err) => {
            console.error('Error during Data Source initialization:', err);
        });
}