import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SharedModule } from './shared/shared.module';
import { EnvironmentService } from './shared/services/environment.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.select(SharedModule).get(EnvironmentService);
  const port = configService.appConfig.port;
  await app.listen(port);
  console.info(`Server running on ${await app.getUrl()}`);
}
void bootstrap();
