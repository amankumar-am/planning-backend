// config/database.ts
import { DataSource } from 'typeorm';
import config from '../config/env';


export const AppDataSource = new DataSource({
    type: 'postgres',
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    synchronize: true,
    logging: true,
    entities: ['src/api/**/*.entity.ts'],
    migrations: ['src/migrations/**/*.ts'],
    subscribers: [],
});

// Initialize the data source
AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err);
    });