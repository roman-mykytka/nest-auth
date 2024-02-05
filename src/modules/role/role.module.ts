import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '@shared/shared.module';
import { UserService } from '@modules/user/user.service';
import { UserRepository } from '@modules/user/repositories/user.repository';
import { Role } from './entities/role.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleRepository } from './repositories/role.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), SharedModule],
  controllers: [RoleController],
  providers: [RoleService, RoleRepository, UserService, UserRepository],
  exports: [RoleService, RoleRepository],
})
export class RoleModule {}
