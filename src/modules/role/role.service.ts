import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entity';
import { RoleRepository } from './repositories/role.repository';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}
  public async create(createRoleDto: CreateRoleDto): Promise<Role> {
    return await this.roleRepository.store(createRoleDto);
  }

  public async findByName(name: string) {
    return await this.roleRepository.getByName(name);
  }
}
