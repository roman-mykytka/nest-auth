import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '@core/constants/constants';

export const Roles = (...args: string[]) => SetMetadata(ROLES_KEY, args);
