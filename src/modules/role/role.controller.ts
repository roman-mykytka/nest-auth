import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from '@core/decorators/decorators';
import { Role as RoleEntity } from '@modules/role/entities/role.entity';
import { JwtAuthGuard, RolesGuard } from '@core/guards/guards';
import { Role, RoleApiPath } from '@modules/role/enums/enums';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller(RoleApiPath.ROOT)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: 'Create role' })
  @ApiResponse({ status: HttpStatus.CREATED, type: RoleEntity })
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(RoleApiPath.CREATE)
  public async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.roleService.create(createRoleDto);
  }
}
