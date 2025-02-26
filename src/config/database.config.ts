import { ConfigModule, ConfigService } from '@nestjs/config';
import {
    TypeOrmModuleAsyncOptions,
    TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export default class DBConfig {
    static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: configService.get('DATABASE_HOST') || 'localhost',
            port: configService.get('DATABASE_PORT') || 5432,
            username: configService.get('DATABASE_USERNAME'),
            password: configService.get('DATABASE_PASSWORD'),
            database: configService.get('DATABASE_NAME'),
            entities: [__dirname, '/../modules/**/*.entity.{js,ts}'],
            synchronize: true,
        };
    }
}

export const DBConfigAsync: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: async (
        configService: ConfigService,
    ): Promise<TypeOrmModuleOptions> => DBConfig.getOrmConfig(configService),
    inject: [ConfigService],
};
