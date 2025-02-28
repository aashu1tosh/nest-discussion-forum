import { ROLE } from './enum';

export interface IUser {
    email: string;
    password: string;
    role: ROLE;
    details: {
        firstName: string;
        middleName: string;
        lastName: string;
        phoneNumber: string;
    };
}
export const admins: IUser[] = [
    {
        email: 'admin@aashutosh.com',
        password: 'Admin@123',
        role: ROLE.ADMIN,
        details: {
            firstName: 'Aashutosh',
            middleName: '',
            lastName: 'Parajuli',
            phoneNumber: '9843818516',
        },
    },
];
