import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment } from '../../config/environment/environment';

@Injectable()
export class EnvironmentService {
  constructor(private configService: ConfigService<Environment>) {}

  get appConfig() {
    return this.configService.get('app', { infer: true });
  }
}
