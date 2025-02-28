export interface IAuth {
    email: string;
    password: string;
    role: string;
    details: IAuthDetails;
    isOtpVerified: boolean;
    isBlocked: boolean;
    token?: string;
}

export interface IAuthDetails {
    firstName: string;
    middleName?: string;
    lastName: string;
    phoneNumber?: string;
}