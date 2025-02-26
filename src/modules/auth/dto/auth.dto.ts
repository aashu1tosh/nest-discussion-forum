import { IsEmail, IsNotEmpty } from "class-validator";

export class LogInDTO {

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}
