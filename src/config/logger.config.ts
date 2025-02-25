import { ConfigService } from '@nestjs/config';
import { Environment } from 'src/constants/enum';
import winston, { format } from 'winston';

const { combine, timestamp, colorize, printf } = format;

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
}

const getLogLevel = (configService: ConfigService) => {
    const env = configService.get('NODE_ENV') ?? Environment.DEVELOPMENT
    const isDevelopment = env === Environment.DEVELOPMENT
    return isDevelopment ? 'debug' : 'warn'
}

const logFormat = combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    colorize({ all: true }), // Enable color for all levels
    printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
)

const transports = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: 'log/error.log',
        level: 'error',
    }),
    new winston.transports.File({ filename: 'log/all.log' }),
]

export const createLogger = (configService: ConfigService) => {
    return winston.createLogger({
        level: getLogLevel(configService),
        levels,
        format: logFormat, // Use the custom log format
        transports,
    })
}
