import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { CreateRoleDto } from '../dto/create-role.dto';

@Injectable()
export class RoleRepository extends Repository<Role> {
  constructor(private dataSource: DataSource) {
    super(Role, dataSource.createEntityManager());
  }

  public async store(createRoleDto: CreateRoleDto): Promise<Role> {
    const newRole = this.create(createRoleDto);
    return this.save(newRole);
  }
}
