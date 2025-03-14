import { ConfigService } from '@nestjs/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import DBConfig from './database.config';

// Create a ConfigService instance to load your .env variables
const configService = new ConfigService();
console.log("🚀 ~ DATABASE_HOST:", configService.get('DATABASE_HOST'));
console.log("🚀 ~ DATABASE_PASSWORD:", configService.get('DATABASE_PASSWORD'));


export const AppDataSource = new DataSource(
    DBConfig.getDataSourceOptions(configService)
);
