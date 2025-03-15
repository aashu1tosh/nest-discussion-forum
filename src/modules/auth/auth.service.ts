import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ROLE } from 'src/constants/enum';
import { DataSource, Repository } from 'typeorm';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { LogInDTO, RegisterDTO } from './dto/auth.dto';
import { Auth } from './entity/auth.entity';
import { AuthDetails } from './entity/detail.entity';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(Auth) private authRepo: Repository<Auth>,
        @InjectRepository(AuthDetails) private authDetailsRepo: Repository<AuthDetails>,
        private bcryptService: BcryptService,
        private dataSource: DataSource,
    ) { }
    async login(data: LogInDTO): Promise<Auth> {
        const { email, password } = data;

        const check = await this.authRepo.createQueryBuilder('auth')
            .select(['auth.id', 'auth.email', 'auth.password', 'auth.role'])
            .where('auth.email = :email', { email })
            .getOne();

        if (!check)
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

        const isPasswordMatched = await this.bcryptService.compare(
            password,
            check.password
        );

        if (isPasswordMatched) {
            return check;
        }
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    async me(id: string): Promise<Auth> {
        const user = await this.authRepo.createQueryBuilder('auth')
            .select(['auth.id', 'auth.email', 'auth.role'])
            .where('auth.id = :id', { id })
            .getOne();

        if (!user)
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);

        return user;
    }

    async check(id: string): Promise<Auth> {
        const user = await this.authRepo.createQueryBuilder('auth')
            .select(['auth.id'])
            .where('auth.id = :id', { id })
            .getOne();

        if (!user)
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);

        return user;
    }

    async register(data: RegisterDTO): Promise<void> {

        const check = await this.authRepo.createQueryBuilder('auth')
            .select(['auth.id', 'auth.email'])
            .where('auth.email = :email', { email: data.email })
            .getOne();

        if (check)
            throw new HttpException('Email already exists', HttpStatus.CONFLICT);

        const phoneCheck = await this.authDetailsRepo.createQueryBuilder('details')
            .select(['details.id', 'details.phoneNumber'])
            .where('details.phoneNumber = :phone', { phone: data.phone })
            .getOne();

        if (phoneCheck)
            throw new HttpException('Phone number already exists', HttpStatus.CONFLICT);


        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.startTransaction();

        try {
            const auth = new Auth();
            auth.email = data.email;
            auth.password = await this.bcryptService.hash(data.password);
            auth.role = ROLE.USER;

            // Save auth in the transaction
            await queryRunner.manager.save(auth);

            const details = new AuthDetails();
            details.firstName = data.firstName;
            details.middleName = data.middleName;
            details.lastName = data.lastName;
            details.phoneNumber = data.phone;
            details.auth = auth;

            // Save authDetails in the transaction
            await queryRunner.manager.save(details);

            // Commit transaction
            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }

        return;
    }

}
