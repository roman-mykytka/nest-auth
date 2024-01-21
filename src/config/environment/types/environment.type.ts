import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ValueOf } from '../../../core/types/value-of.type';
import { NodeEnvironment } from '../enums/node-environment.enum';

type Environment = {
  app: {
    nodeEnv: ValueOf<typeof NodeEnvironment>;
    port: number;
  };
  db: TypeOrmModuleOptions;
};

export { type Environment };
