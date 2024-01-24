import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  configuration,
  validationSchema,
} from './config/environment/environment';
import { EnvironmentService } from './shared/services/environment.service';

import { SharedModule } from './shared/shared.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';

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
    UserModule,
    RoleModule,
  ],
})
export class AppModule {}
