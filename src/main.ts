import { ConfigService } from "@nestjs/config";
import { createApp } from "./config/app.config";
import { seed } from "./seed/index.seed";

async function bootstrap() {
  const app = await createApp();
  await seed();

  const configService = app.get(ConfigService);

  // Get the port from environment variables
  const port = configService.get<number>('PORT') || 3000;

  await app.listen(port);
}

bootstrap().catch((error) => {
  console.log(error, 'error running server');
  console.error(error);
});
