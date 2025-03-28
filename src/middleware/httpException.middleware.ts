import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { Response } from 'express';
import Logger from 'src/helpers/log.helper';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const timestamp = new Date().toISOString();

        if (exception instanceof HttpException) {
            const message: any = exception.getResponse();
            const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
            const formattedMessage =
                Array.isArray(message?.message)
                    ? message?.message.join(', ')
                    : message;
            return response.status(status).json({
                status: false,
                timestamp,
                message: formattedMessage,
                data: message?.errors,
            });
        }

        Logger.error(exception);
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: false,
            timestamp,
            message: 'INTERNAL SERVER ERROR',
        });

    }
}