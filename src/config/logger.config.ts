import { ConfigService } from '@nestjs/config';
import { Environment } from 'src/constants/enum';
import { format, transports, createLogger as winstonCreateLogger } from 'winston';

const { combine, timestamp, colorize, printf } = format;

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const getLogLevel = (configService: ConfigService) => {
    const env = configService.get('NODE_ENV') ?? Environment.DEVELOPMENT;
    return env === Environment.DEVELOPMENT ? 'debug' : 'warn';
};

const logFormat = combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    colorize({ all: true }), // Enable color for all levels
    printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

const loggerTransports = [
    new transports.Console(),
    new transports.File({
        filename: 'log/error.log',
        level: 'error',
    }),
    new transports.File({ filename: 'log/all.log' }),
];

export const createLogger = (configService: ConfigService) => {
    return winstonCreateLogger({
        level: getLogLevel(configService),
        levels,
        format: logFormat,
        transports: loggerTransports,
    });
};
