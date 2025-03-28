import Base from 'src/helpers/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Auth } from './auth.entity';

@Entity('auth_details')
export class AuthDetails extends Base {
    @Column({ name: 'first_name' })
    firstName: string;

    @Column({ name: 'middle_name', nullable: true })
    middleName: string;

    @Column({ name: 'last_name' })
    lastName: string;

    @Column({ name: 'phone_number', nullable: true, unique: true })
    phoneNumber: string;

    @OneToOne(() => Auth, (auth) => auth.details, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'auth_id' })
    auth: Auth;
}
