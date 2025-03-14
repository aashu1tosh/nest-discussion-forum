import { ROLE } from "src/constants/enum";

export interface IJwtOptions {
    secret: string;
    expiresIn: string;
}

export interface IJwtPayload {
    id: string;
    role?: ROLE;
}
