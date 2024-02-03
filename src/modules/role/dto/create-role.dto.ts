import { ValueOf } from '@core/types/value-of.type';
import { Role } from '@modules/role/enums/role.enum';

export class CreateRoleDto {
  name: ValueOf<typeof Role>;
}
