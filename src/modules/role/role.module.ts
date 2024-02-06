import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '@shared/shared.module';
import { UserService } from '@modules/user/user.service';
import { UserRepository } from '@modules/user/repositories/repositories';
import { Role } from '@modules/role/entities/entities';
import { RoleRepository } from '@modules/role/repositories/repositories';
import { RoleService } from '@modules/role/role.service';
import { RoleController } from '@modules/role/role.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), SharedModule],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository, UserService, UserRepository],
  exports: [RoleService, RoleRepository],
})
export class RoleModule {}
