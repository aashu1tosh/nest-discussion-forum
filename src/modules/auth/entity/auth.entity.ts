import { ROLE } from "src/constants/enum";
import Base from "src/helpers/base.entity";
import { Column, Entity, OneToOne } from "typeorm";
import { AuthDetails } from "./detail.entity";

@Entity('auth')
export class Auth extends Base {
    @Column({
        unique: true,
    })
    email: string;

    @Column({ select: false })
    password: string;

    @Column({
        type: 'enum',
        enum: ROLE,
    })
    role: ROLE;

    @OneToOne(() => AuthDetails, (details) => details.auth, { cascade: true })
    details: AuthDetails;

    @Column({ nullable: true, select: false })
    token: string;

    @Column({ name: 'is_otp_verified', default: false, select: false })
    isOtpVerified: boolean;

    @Column({ name: 'is_blocked', default: false, select: false })
    isBlocked: boolean;
}
