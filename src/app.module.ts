import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  configuration,
  validationSchema,
} from './config/environment/environment';
import { SharedModule } from './shared/shared.module';
import { EnvironmentService } from './shared/services/environment.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
      validationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: EnvironmentService) =>
        configService.postgresConfig,
      inject: [EnvironmentService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
