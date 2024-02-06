import { Response, Request } from 'express';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  UserSignUpRequestDto,
  UserSignInResponseDto,
  UserSignUpResponseDto,
  UserSignInRequestDto,
} from '@modules/auth/dto/dto';
import { AuthApiPathEnum } from '@modules/auth/enums/enums';
import { UserSignUpRequestDtoValidatePipe } from '@modules/auth/pipes/pipes';
import { JwtAuthGuard, RefreshTokenGuard } from '@core/guards/guards';
import { AuthService } from '@modules/auth/auth.service';

@Controller(AuthApiPathEnum.ROOT)
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign up' })
  @ApiResponse({ status: HttpStatus.CREATED, type: UserSignUpResponseDto })
  @UsePipes(new UserSignUpRequestDtoValidatePipe())
  @Post(AuthApiPathEnum.SIGN_UP)
  public async signUp(
    @Body() userSignUpDto: UserSignUpRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<UserSignUpResponseDto> {
    return await this.authService.signUp(userSignUpDto, res);
  }

  @ApiOperation({ summary: 'Sign in' })
  @ApiResponse({ status: HttpStatus.OK, type: UserSignInResponseDto })
  @Post(AuthApiPathEnum.SIGN_IN)
  public async signIn(
    @Body() userSignInDto: UserSignInRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<UserSignInResponseDto> {
    return await this.authService.signIn(userSignInDto, res);
  }

  @ApiOperation({ summary: 'Logout' })
  @ApiResponse({ status: HttpStatus.OK })
  @UseGuards(JwtAuthGuard)
  @Get(AuthApiPathEnum.LOGOUT)
  public async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    return await this.authService.logout(req, res);
  }

  @ApiOperation({ summary: 'Refresh' })
  @ApiResponse({ status: HttpStatus.OK, type: UserSignInResponseDto })
  @UseGuards(RefreshTokenGuard)
  @Get(AuthApiPathEnum.REFRESH)
  public async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<UserSignInResponseDto> {
    return await this.authService.refresh(req, res);
  }
}
