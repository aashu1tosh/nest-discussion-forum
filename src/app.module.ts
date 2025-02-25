import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBConfigAsync } from './config/database.config';
import { createLogger } from './config/logger.config';
import { HttpExceptionFilter } from './middleware/httpException.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigService available globally
    }),
    TypeOrmModule.forRootAsync(DBConfigAsync)
  ],
  controllers: [AppController],
  providers: [
    HttpExceptionFilter,
    {
      provide: 'LOGGER',
      useFactory: (configService: ConfigService) => createLogger(configService),
      inject: [ConfigService],
    },
    AppService],
})
export class AppModule { }
