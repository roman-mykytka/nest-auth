import { Module } from '@nestjs/common';
import { EnvironmentService } from '@shared/services/environment.service';
import { EncryptService } from './services/encrypt.service';

@Module({
  providers: [EnvironmentService, EncryptService],
  exports: [EnvironmentService],
})
export class SharedModule {}
