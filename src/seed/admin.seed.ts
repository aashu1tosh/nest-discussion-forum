import DBConfig from "src/config/database.config";
import { BcryptService } from "src/helpers/bcrypt.service";
import Logger from "src/helpers/log.helpers";

const authRepo = DBCOn.getRepository(Auth);
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

        if (alreadyExist) throw new Error(`${data?.email} Email already used.`);

        if (uniquePhoneNumber)
            throw new Error(
                `${data?.details?.phoneNumber} Phone number already used`
            );

        const user = authRepo.create(data);
        user.otpVerified = true;
        let details = authDetailsRepo.create(data.details);
        user.password = await bcryptService.hash(data.password);
        user.details = details;
        await authDetailsRepo.save(details);
        await authRepo.save(user);
        Logger.info('Admin seeded successfully');
    } catch (error: any) {
        Logger.error(error?.message);
    }
}

async function seedAdmins(admins: IAuth[]): Promise<void> {
    try {
        await AppDataSource.initialize();
        for (const admin of admins) {
            await seedAdmin(admin as Auth);
        }
    } catch (error) {
        console.log('Failed to seed admin 💣');
        console.error(error);
    } finally {
        process.exit(0);
    }
}

const args = process.argv[2];
if (!args) {
    console.error('Please provide an argument');
    process.exit(1);
}

if (args === 'seed') {
    void seedAdmins(admins);
} else {
    console.error('Invalid argument');
    process.exit(1);
}
