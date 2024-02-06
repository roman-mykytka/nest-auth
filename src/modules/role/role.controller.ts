import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from '@core/decorators/decorators';
import { Role as RoleEntity } from '@modules/role/entities/entities';
import { JwtAuthGuard, RolesGuard } from '@core/guards/guards';
import { Role, RoleApiPath } from '@modules/role/enums/enums';
import { CreateRoleDto } from '@modules/role/dto/dto';
import { RoleService } from '@modules/role/role.service';

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
