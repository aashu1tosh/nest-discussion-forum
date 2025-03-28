import 'reflect-metadata';
import { AppDataSource } from "src/config/dataSource.config";
import { admins } from "src/constants/admin";
import Logger from "src/helpers/log.helper";
import { Auth } from "src/modules/auth/entity/auth.entity";
import { AuthDetails } from "src/modules/auth/entity/detail.entity";
import { BcryptService } from "src/modules/bcrypt/bcrypt.service";

const authRepo = AppDataSource.getRepository(Auth);
const authDetailsRepo = AppDataSource.getRepository(AuthDetails);
const bcryptService = new BcryptService();

async function seedAdmin(data: Auth) {
    try {
        const alreadyExist = await authRepo.findOne({
            where: { email: data.email },
        });

        const uniquePhoneNumber = await authDetailsRepo.findOne({
            where: {
                phoneNumber: data.details.phoneNumber,
            },
        });

        if (alreadyExist) return;

        if (uniquePhoneNumber)
            return;

        const user = authRepo.create(data);
        user.isOtpVerified = true;
        let details = authDetailsRepo.create(data.details);
        const password = await bcryptService.hash(data.password);
        console.log("🚀 ~ seedAdmin ~ password:", password)
        user.password = password
        user.details = details;
        await authDetailsRepo.save(details);
        await authRepo.save(user);
        Logger.info('Admin seeded successfully');
    } catch (error: any) {
        Logger.error(error?.message);
    }
}

export async function seedAdmins(): Promise<void> {
    try {
        await AppDataSource.initialize();
        for (const admin of admins) {
            await seedAdmin(admin as Auth);
        }
    } catch (error) {
        Logger.error('Failed to seed admin 💣');
    }
}

