import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ValueOf } from '@core/types/value-of.type';
import { JwtAccessSetting, JwtRefreshSetting } from '../types/types';
import { NodeEnvironment } from '../enums/node-environment.enum';

type Environment = {
  app: {
    nodeEnv: ValueOf<typeof NodeEnvironment>;
    port: number;
  };
  db: TypeOrmModuleOptions;
  encrypt: {
    passwordSaltRounds: number;
  };
  jwt: {
    access: JwtAccessSetting;
    refresh: JwtRefreshSetting;
  };
};

export { type Environment };
