import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { IsNotBlank } from "src/decorator/dto/isNotBlank.dto";

export class LogInDTO {
    @IsNotEmpty()
    @IsNotBlank()
    @Transform(({ value }) => value.toLowerCase())
    email: string;

    @IsNotEmpty()
    @IsNotBlank()
    password: string;
}

export class RegisterDTO {
    @IsEmail()
    @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
    email: string;

    @IsNotEmpty()
    @IsString()
    @IsNotBlank()
    password: string;

    @IsNotEmpty()
    @IsString()
    @IsNotBlank()
    firstName: string;

    @IsOptional()
    @IsString()
    middleName: string;

    @IsNotEmpty()
    @IsString()
    @IsNotBlank()
    lastName: string;

    @IsNotEmpty()
    @IsString()
    @IsNotBlank()
    phone: string;

}
