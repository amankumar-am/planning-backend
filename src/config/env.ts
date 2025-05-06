// config/env.ts
import dotenv from 'dotenv';

dotenv.config();

const {
    NODE_ENV = 'development',
    PORT = 3000,
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    JWT_SECRET
} = process.env;

export default {
    NODE_ENV,
    PORT: Number(PORT),
    DB_HOST,
    DB_PORT: DB_PORT ? Number(DB_PORT) : 5432,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    JWT_SECRET
};