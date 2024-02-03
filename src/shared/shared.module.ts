import { Module } from '@nestjs/common';
import { EnvironmentService } from '@shared/services/environment.service';
import { EncryptService } from './services/encrypt.service';
import { TokenService } from './services/token.service';
import { DateService } from './services/date.service';

@Module({
  providers: [EnvironmentService, EncryptService, TokenService, DateService],
  exports: [EnvironmentService, EncryptService, TokenService, DateService],
})
export class SharedModule {}
