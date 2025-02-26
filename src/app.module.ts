import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBConfigAsync } from './config/database.config';
import { HttpExceptionFilter } from './middleware/httpException.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(DBConfigAsync)
  ],
  controllers: [AppController],
  providers: [
    HttpExceptionFilter,

    AppService],
})
export class AppModule { }
