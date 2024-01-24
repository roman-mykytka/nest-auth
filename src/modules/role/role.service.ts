import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { RoleRepository } from './repositories/role.repository';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    return await this.roleRepository.store(createRoleDto);
  }

  findAll() {
    return `This action returns all role`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role. ${updateRoleDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
