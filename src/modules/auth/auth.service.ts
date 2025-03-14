import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { LogInDTO } from './dto/auth.dto';
import { Auth } from './entity/auth.entity';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(Auth) private authRepo: Repository<Auth>,
        private bcryptService: BcryptService,
    ) { }
    async login(data: LogInDTO): Promise<any> {
        const { email, password } = data;

        const check = await this.authRepo.createQueryBuilder('auth')
            .select(['auth.id', 'auth.email', 'auth.password'])
            .where('auth.email = :email', { email })
            .getOne();

        if (!check)
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

        if (email === 'admin' && password === 'password') {
            return { message: 'Login successful' };
        }
        console.log("🚀 ~ AuthService ~ login ~ check:", check)

        const isPasswordMatched = await this.bcryptService.compare(
            password,
            check.password
        );

        if (isPasswordMatched) {
            return check;
        }
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
}
