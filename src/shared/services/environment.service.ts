import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Environment } from '@config/environment/environment';
import {
  JwtAccessSetting,
  JwtRefreshSetting,
} from '@config/environment/types/types';

@Injectable()
export class EnvironmentService {
  constructor(private configService: ConfigService<Environment>) {}

  get appConfig() {
    return this.configService.get('app', { infer: true });
  }

  get postgresConfig(): TypeOrmModuleOptions {
    return this.configService.get('db', { infer: true });
  }

  get userPasswordSaltRounds(): number {
    return this.configService.get('encrypt.passwordSaltRounds', {
      infer: true,
    });
  }

  get accessTokenSetting(): JwtAccessSetting {
    return this.configService.get('jwt.access', {
      infer: true,
    });
  }

  get refreshTokenSetting(): JwtRefreshSetting {
    return this.configService.get('jwt.refresh', {
      infer: true,
    });
  }
}
