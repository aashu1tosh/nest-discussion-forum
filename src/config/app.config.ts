import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { HttpExceptionFilter } from 'src/middleware/httpException.middleware';
import { morganMiddleware } from 'src/middleware/morgan.middleware';

export async function createApp(): Promise<INestApplication> {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api/v1');
    app.enableCors();
    app.use(morganMiddleware);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
        }),
    );

    const httpExceptionFilter = app.get<HttpExceptionFilter>(HttpExceptionFilter);
    app.useGlobalFilters(httpExceptionFilter);

    return app;
}
