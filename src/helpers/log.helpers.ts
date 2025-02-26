import { ConfigService } from '@nestjs/config';
import * as chalk from 'chalk';
import { createLogger } from 'src/config/logger.config';
import { Environment } from 'src/constants/enum';

class Logger {
    private static configService = new ConfigService();
    private static logger = createLogger(Logger.configService);
    private static isDevelopment = Logger.configService.get<string>('NODE_ENV') === Environment.DEVELOPMENT;

    static error(message: object | string): void {
        if (this.isDevelopment) console.log(chalk.bgRed(message));
        else this.logger.error(message);
    }

    static info(message: object | string): void {
        if (this.isDevelopment) console.log(chalk.green(message));
        else this.logger.info(message);
    }

    static warn(message: object | string): void {
        if (this.isDevelopment) console.log(chalk.yellow(message));
        else this.logger.warn(message);
    }

    static debug(message: object | string): void {
        if (this.isDevelopment) console.log(chalk.blue(message));
        else this.logger.debug(message);
    }

    static http(message: object | string): void {
        if (this.isDevelopment) console.log(chalk.magenta(message));
        else this.logger.http(message);
    }
}

export default Logger;
