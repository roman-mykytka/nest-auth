import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { SharedModule } from '@shared/shared.module';
import { UserModule } from '@/modules/user/user.module';
import { RoleModule } from '@/modules/role/role.module';
import { AuthModule } from '@modules/auth/auth.module';
import { EnvironmentService } from '@shared/services/services';
import {
  configuration,
  validationSchema,
} from '@/config/environment/environment';

@Module({
  imports: [
    ScheduleModule.forRoot(),
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
      dataSourceFactory: (options) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return Promise.resolve(
          addTransactionalDataSource(new DataSource(options)),
        );
      },
    }),
    JwtModule.register({ global: true }),
    SharedModule,
    UserModule,
    RoleModule,
    AuthModule,
  ],
})
export class AppModule {}
