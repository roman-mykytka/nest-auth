import * as cookieParser from 'cookie-parser';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from '@/app.module';
import { SharedModule } from '@shared/shared.module';
import { EnvironmentService } from '@shared/services/environment.service';
import { setupSwagger } from '@config/swagger/swagger.config';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);
  const configService = app.select(SharedModule).get(EnvironmentService);
  const port = configService.appConfig.port;
  app.setGlobalPrefix('/api');
  app.use(helmet());
  app.enableCors();
  setupSwagger(app);
  app.use(cookieParser());
  await app.listen(port);
  console.info(`Server running on ${await app.getUrl()}`);
}
void bootstrap();
