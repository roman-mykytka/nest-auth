import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ValueOf } from '@core/types/types';
import { Role } from '@/modules/role/enums/enums';
import { ROLES_KEY } from '@core/constants/constants';
import { Role as RoleEntity } from '@/modules/role/entities/entities';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<
      ValueOf<typeof Role>[]
    >(ROLES_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    return requiredRoles.some((role) =>
      user.roles?.map((r: RoleEntity) => r.name).includes(role),
    );
  }
}
