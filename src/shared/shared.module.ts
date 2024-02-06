import { Module } from '@nestjs/common';
import {
  EncryptService,
  TokenService,
  DateService,
  ScheduledTasksService,
  EnvironmentService,
} from './services/services';
import { RefreshTokenRepository } from '@modules/auth/repositories/repositories';

@Module({
  providers: [
    EnvironmentService,
    EncryptService,
    TokenService,
    DateService,
    ScheduledTasksService,
    RefreshTokenRepository,
  ],
  exports: [
    EnvironmentService,
    EncryptService,
    TokenService,
    DateService,
    ScheduledTasksService,
  ],
})
export class SharedModule {}
