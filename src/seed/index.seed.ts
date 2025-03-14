import { seedAdmins } from "./admin.seed";


export async function seed() {
  await seedAdmins();
}
