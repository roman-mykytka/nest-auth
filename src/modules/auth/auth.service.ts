import { Response, Request } from 'express';
import { Transactional } from 'typeorm-transactional';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@modules/user/user.service';
import {
  UserSignUpRequestDto,
  UserSignInResponseDto,
  UserSignInRequestDto,
  UserSignUpResponseDto,
} from '@modules/auth/dto/dto';
import {
  DateService,
  TokenService,
  EncryptService,
  EnvironmentService,
} from '@shared/services/services';
import { User } from '@modules/user/entities/entities';
import { RefreshTokenRepository } from '@modules/auth/repositories/repositories';
import { UnauthorizedExceptionMessage } from '@core/enums/enums';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly dateService: DateService,
    private readonly environmentService: EnvironmentService,
    private readonly encryptService: EncryptService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}
  @Transactional()
  public async signUp(
    userSignUpDto: UserSignUpRequestDto,
    res: Response,
  ): Promise<UserSignUpResponseDto> {
    const user = await this.userService.create(userSignUpDto);

    const accessToken = await this.updateAuthTokens(user, res);

    return this.mapToAuthUserResponseDto(user, accessToken);
  }

  public async signIn(
    userSignInDto: UserSignInRequestDto,
    res: Response,
  ): Promise<UserSignInResponseDto> {
    const { email, password } = userSignInDto;

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException(
        UnauthorizedExceptionMessage.USER_BY_EMAIL_NOT_FOUND,
      );
    }

    const isPasswordCorrect = this.encryptService.compare(
      password,
      user.passwordSalt,
      user.passwordHash,
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException(
        UnauthorizedExceptionMessage.PASSWORD_IS_INCORRECT,
      );
    }

    const accessToken = await this.updateAuthTokens(user, res);

    return this.mapToAuthUserResponseDto(user, accessToken);
  }

  async logout(req: Request, res: Response): Promise<void> {
    const { refreshToken } = req.cookies;
    await this.refreshTokenRepository.deleteToken(refreshToken);
    res.clearCookie('refreshToken');
  }

  async refresh(req: Request, res: Response) {
    const { refreshToken } = req.cookies;
    const { userId } = await this.tokenService.decodeRefreshToken(refreshToken);
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new UnauthorizedException(
        UnauthorizedExceptionMessage.USER_NOT_FOUND,
      );
    }

    const accessToken = await this.updateAuthTokens(user, res);

    return this.mapToAuthUserResponseDto(user, accessToken);
  }

  private async updateAuthTokens(user: User, res: Response): Promise<string> {
    const accessToken = await this.tokenService.getAccessToken({
      userId: user.id,
    });
    const refreshToken = await this.tokenService.getRefreshToken({
      userId: user.id,
    });

    const currentDate = this.dateService.getDate();
    const expires = this.dateService.addSeconds(
      currentDate,
      this.environmentService.refreshTokenSetting.expiresIn,
    );

    res.cookie('refreshToken', refreshToken, {
      expires,
      httpOnly: true,
    });

    await this.refreshTokenRepository.saveToken(refreshToken, expires, user);

    return accessToken;
  }

  private mapToAuthUserResponseDto(
    user: User,
    accessToken: string,
  ): UserSignUpResponseDto | UserSignInResponseDto {
    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roles: user.roles.map((role) => role.name),
      },
      accessToken,
    };
  }
}
