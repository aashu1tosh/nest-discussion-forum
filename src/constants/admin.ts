import { IAuth } from 'src/modules/auth/interface/auth.interface';
import { ROLE } from './enum';


export const admins: IAuth[] = [
    {
        email: 'admin@aashutosh.com',
        password: 'Admin@123',
        role: ROLE.SUDO_ADMIN,
        isOtpVerified: true,
        isBlocked: false,
        details: {
            firstName: 'Aashutosh',
            middleName: '',
            lastName: 'Parajuli',
            phoneNumber: '9843818516',
        },
    },
];
