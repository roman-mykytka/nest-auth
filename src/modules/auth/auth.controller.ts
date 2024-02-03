import { Response } from 'express';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserRequestDto } from '@modules/user/dto/create-user-request.dto';
import { AuthService } from './auth.service';
import { CreateUserResponseDto } from '@modules/user/dto/create-user-response.dto';
import { CreateUserRequestDtoValidatePipe } from '@modules/auth/pipes/create-user-request-dto-validate.pipe';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateUserResponseDto })
  @UsePipes(new CreateUserRequestDtoValidatePipe())
  @Post('/register')
  public async create(
    @Body() createUserDto: CreateUserRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<CreateUserResponseDto> {
    return await this.authService.register(createUserDto, res);
  }
}
