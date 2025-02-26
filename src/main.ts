import { ConfigService } from "@nestjs/config";
import { createApp } from "./config/app.config";

async function bootstrap() {
  const app = await createApp();

  const configService = app.get(ConfigService);

  // Get the port from environment variables
  const port = configService.get<number>('PORT') || 3000;

  await app.listen(port);
}

bootstrap().catch((error) => {
  console.error(error);
});
