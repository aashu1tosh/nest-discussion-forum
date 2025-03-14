import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
import { JwtService } from '../jwt/jwt.service';
import { AuthService } from './auth.service';
import { LogInDTO, RegisterDTO } from './dto/auth.dto';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    @Post('login')
    async login(@Body() loginDto: LogInDTO, @Res({ passthrough: true }) res: Response) {
        const auth = await this.authService.login(loginDto);

        const { accessToken, refreshToken } = this.jwtService.generateTokens(auth);

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: this.configService.get<string>('NODE_ENV') === 'PRODUCTION',
            maxAge: 3600 * 1000,
            sameSite: 'lax',
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: this.configService.get<string>('NODE_ENV') === 'PRODUCTION',
            maxAge: 7 * 24 * 3600 * 1000,
            sameSite: 'lax',
        });


        return {
            status: true,
            message: 'Login successful',
        };
    }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() data: RegisterDTO) {
        console.log(data.email)
        await this.authService.register(data);

        return {
            status: true,
            message: 'Registration successful',
        };

    }

    @Post('refresh-token')
    async refreshToken(@Req() request: Request, @Res({ passthrough: true }) res: Response) {
        const refreshTokenCheck = request.cookies['refreshToken'];
        const data = this.jwtService.verify(refreshTokenCheck, this.configService.get<string>('REFRESH_TOKEN_SECRET') ?? '');
        const auth = await this.authService.me(data.id);
        const { accessToken, refreshToken } = this.jwtService.generateTokens(auth);

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: this.configService.get<string>('NODE_ENV') === 'PRODUCTION',
            maxAge: 3600 * 1000,
            sameSite: 'lax',
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: this.configService.get<string>('NODE_ENV') === 'PRODUCTION',
            maxAge: 7 * 24 * 3600 * 1000,
            sameSite: 'lax',
        });


        return {
            status: true,
            message: 'Token refreshed',
        };
    }
}