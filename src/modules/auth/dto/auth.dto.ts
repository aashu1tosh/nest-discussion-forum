import { IsNotEmpty, IsString } from "class-validator";

export class LogInDTO {

    @IsString()
    email: string;

    @IsNotEmpty()
    password: string;
}
