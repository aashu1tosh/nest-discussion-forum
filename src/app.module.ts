import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBConfigAsync } from './config/database.config';
import { HttpExceptionFilter } from './middleware/httpException.middleware';
import { AuthModule } from './modules/auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(DBConfigAsync),
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    HttpExceptionFilter,
    AppService,
],
})
export class AppModule { }
