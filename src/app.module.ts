import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './middleware/httpException.middleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    HttpExceptionFilter,
    AppService],
})
export class AppModule { }
