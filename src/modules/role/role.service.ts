import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from '@modules/role/dto/dto';
import { Role } from '@modules/role/entities/entities';
import { RoleRepository } from '@modules/role/repositories/repositories';

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
