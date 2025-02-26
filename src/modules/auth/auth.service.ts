import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LogInDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
    async login(loginDto: LogInDTO): Promise<any> {
        const { email, password } = loginDto;

        if (email === 'admin' && password === 'password') {
            return { message: 'Login successful' };
        }
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
}
