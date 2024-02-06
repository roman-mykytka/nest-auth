import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserApiPath } from '@modules/user/enums/enums';
import { UserResponseDto } from '@modules/user/dto/dto';
import { Role } from '@modules/role/enums/enums';
import { Roles } from '@core/decorators/decorators';
import { JwtAuthGuard, RolesGuard } from '@core/guards/guards';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller(UserApiPath.ROOT)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: HttpStatus.OK, type: [UserResponseDto] })
  @Get(UserApiPath.GET_ALL)
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  public async getAll(): Promise<UserResponseDto[]> {
    return await this.userService.getAll();
  }
}
