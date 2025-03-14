import { ConfigService } from '@nestjs/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import DBConfig from './database.config';

// Create a ConfigService instance to load your .env variables
const configService = new ConfigService();

export const AppDataSource = new DataSource(
    DBConfig.getDataSourceOptions(configService)
);
