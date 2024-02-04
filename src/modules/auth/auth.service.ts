import { Response } from 'express';
import { Transactional } from 'typeorm-transactional';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@modules/user/user.service';
import { UserSignUpRequestDto } from '@modules/auth/dto/user-sign-up-request.dto';
import { UserSignUpResponseDto } from '@modules/auth/dto/user-sign-up-response.dto';
import { TokenService } from '@shared/services/token.service';
import { DateService } from '@shared/services/date.service';
import { RefreshTokenRepository } from '@modules/auth/repositories/refresh-token.repository';
import { EnvironmentService } from '@shared/services/environment.service';
import { User } from '@modules/user/entities/user.entity';
import { UserSignInRequestDto } from '@modules/auth/dto/user-sign-in-request.dto';
import { UserSignInResponseDto } from '@modules/auth/dto/user-sign-in-response.dto';
import { EncryptService } from '@shared/services/encrypt.service';
import { UnauthorizedExceptionMessage } from '@modules/auth/enums/unauthorized-exception-message.enum';

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

    await this.refreshTokenRepository.saveRefreshToken(
      refreshToken,
      expires,
      user,
    );

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
