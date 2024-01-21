import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment } from '../../config/environment/environment';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class EnvironmentService {
  constructor(private configService: ConfigService<Environment>) {}

  get appConfig() {
    return this.configService.get('app', { infer: true });
  }

  get postgresConfig(): TypeOrmModuleOptions {
    return this.configService.get('db', { infer: true });
  }
}
