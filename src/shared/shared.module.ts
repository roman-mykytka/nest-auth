import { Module } from '@nestjs/common';
import { EnvironmentService } from '@shared/services/environment.service';
import { EncryptService } from './services/encrypt.service';
import { TokenService } from './services/token.service';
import { DateService } from './services/date.service';
import { ScheduledTasksService } from './services/scheduled-tasks.service';
import { RefreshTokenRepository } from '@modules/auth/repositories/refresh-token.repository';

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
