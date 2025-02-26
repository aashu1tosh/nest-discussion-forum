import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDto: LogInDTO) {
        return this.authService.login(loginDto);
    }
}