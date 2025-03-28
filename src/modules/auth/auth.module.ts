import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { JwtService } from '../jwt/jwt.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Auth } from './entity/auth.entity';
import { AuthDetails } from './entity/detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auth, AuthDetails])],
  controllers: [AuthController],
  providers: [AuthService, BcryptService, JwtService],
  exports: [AuthService, JwtService],
})
export class AuthModule { }
