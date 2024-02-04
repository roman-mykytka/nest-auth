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
import { UserSignUpRequestDto } from '@modules/auth/dto/user-sign-up-request.dto';
import { UserSignUpResponseDto } from '@modules/auth/dto/user-sign-up-response.dto';
import { UserSignUpRequestDtoValidatePipe } from '@modules/auth/pipes/user-sign-up-request-dto-validate.pipe';
import { AuthApiPath } from '@modules/auth/enums/auth-api-path';
import { UserSignInRequestDto } from '@modules/auth/dto/user-sign-in-request.dto';
import { UserSignInResponseDto } from '@modules/auth/dto/user-sign-in-response.dto';
import { AuthService } from './auth.service';

@Controller(AuthApiPath.ROOT)
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign up' })
  @ApiResponse({ status: HttpStatus.CREATED, type: UserSignUpResponseDto })
  @UsePipes(new UserSignUpRequestDtoValidatePipe())
  @Post(AuthApiPath.SIGN_UP)
  public async signUp(
    @Body() userSignUpDto: UserSignUpRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<UserSignUpResponseDto> {
    return await this.authService.signUp(userSignUpDto, res);
  }

  @ApiOperation({ summary: 'Sign in' })
  @ApiResponse({ status: HttpStatus.OK, type: UserSignInResponseDto })
  @Post(AuthApiPath.SIGN_IN)
  public async signIn(
    @Body() userSignInDto: UserSignInRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<UserSignInResponseDto> {
    return await this.authService.signIn(userSignInDto, res);
  }
}
