import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan'; // Use named import
import { createLogger } from 'src/config/logger.config';
import { Environment } from 'src/constants/enum';

// Initialize ConfigService
const configService = new ConfigService();
const logger = createLogger(configService);

// Set up the stream for logging
const stream: morgan.StreamOptions = {
    write: (message: string) => logger.http(message.trim()),
};

// Skip logging in development
const skip = (): boolean => {
    const env = configService.get<string>('NODE_ENV') ?? Environment.DEVELOPMENT;
    return env === Environment.DEVELOPMENT;
};

// Use the `combined` format as recommended
export const morganMiddleware = morgan('combined', {
    stream,
    skip,
});
