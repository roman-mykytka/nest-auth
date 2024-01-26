import { Module } from '@nestjs/common';
import { EnvironmentService } from '@shared/services/environment.service';

@Module({
  providers: [EnvironmentService],
  exports: [EnvironmentService],
})
export class SharedModule {}
