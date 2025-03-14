import { ConfigModule, ConfigService } from '@nestjs/config';
import {
    TypeOrmModuleAsyncOptions,
    TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import path from 'path';
import { DataSourceOptions } from 'typeorm';

export default class DBConfig {
    static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: configService.get('DATABASE_HOST') || 'localhost',
            port: configService.get('DATABASE_PORT') || 5432,
            username: configService.get('DATABASE_USERNAME'),
            password: configService.get('DATABASE_PASSWORD'),
            database: configService.get('DATABASE_NAME'),
            entities: [path.join(__dirname, '..', 'modules', '**', 'entity', '*.entity.{js,ts}')],
            synchronize: true,
            logging: false,
            dropSchema: false,
        };
    }

    static getDataSourceOptions(configService: ConfigService): DataSourceOptions {
        return {
            ...this.getOrmConfig(configService), // Copy shared config
        } as DataSourceOptions;
    }
}

export const DBConfigAsync: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: async (
        configService: ConfigService,
    ): Promise<TypeOrmModuleOptions> => DBConfig.getOrmConfig(configService),
    inject: [ConfigService],
};

