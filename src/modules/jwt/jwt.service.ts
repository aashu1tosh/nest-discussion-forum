import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jwt from 'jsonwebtoken';
import { Auth } from '../auth/entity/auth.entity';
import { IJwtOptions, IJwtPayload } from './jwt.interface';

@Injectable()
export class JwtService {
    constructor(private configService: ConfigService) { }

    private getConfigValue(key: string): string {
        return this.configService.get<string>(key) ?? "";
    }

    sign(data: IJwtPayload, options: IJwtOptions): string {
        return jwt.sign(
            {
                id: data.id,
                role: data.role,
            },
            options.secret,
            {
                expiresIn: options.expiresIn,
            }
        );
    }

    emailVerifyToken(id: string): string {
        return jwt.sign(
            {
                id: id,
            },
            this.getConfigValue('VERIFY_EMAIL_TOKEN_SECRET'),
            {
                expiresIn: this.getConfigValue('VERIFY_EMAIL_TOKEN_EXPIRES_IN'),
            }
        );
    }

    resetPasswordToken(id: string): string {
        return jwt.sign(
            {
                id: id,
            },
            this.getConfigValue('VERIFY_EMAIL_TOKEN_SECRET'),
            {
                expiresIn: this.getConfigValue('VERIFY_EMAIL_TOKEN_EXPIRES_IN'),
            }
        );
    }

    verify(token: string, secret: string): any {
        return jwt.verify(token, secret);
    }

    generateTokens(
        auth: Auth
    ): { accessToken: string; refreshToken: string } {
        const accessToken = this.sign(
            {
                id: auth.id,
                role: auth.role,
            },
            {
                expiresIn: this.getConfigValue('ACCESS_TOKEN_EXPIRES_IN'),
                secret: this.getConfigValue('ACCESS_TOKEN_SECRET'),
            },
        );

        const refreshToken = this.sign(
            {
                id: auth.id,
                role: auth.role,
            },
            {
                expiresIn: this.getConfigValue('REFRESH_TOKEN_EXPIRES_IN'),
                secret: this.getConfigValue('REFRESH_TOKEN_SECRET'),
            },

        );
        return { accessToken, refreshToken };
    }
}
