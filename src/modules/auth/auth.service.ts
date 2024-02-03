import { Response } from 'express';
import { Transactional } from 'typeorm-transactional';
import { Injectable } from '@nestjs/common';
import { UserService } from '@modules/user/user.service';
import { CreateUserRequestDto } from '@modules/user/dto/create-user-request.dto';
import { CreateUserResponseDto } from '@modules/user/dto/create-user-response.dto';
import { TokenService } from '@shared/services/token.service';
import { DateService } from '@shared/services/date.service';
import { RefreshTokenRepository } from '@modules/auth/repositories/refresh-token.repository';
import { EnvironmentService } from '@shared/services/environment.service';
import { User } from '@modules/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly dateService: DateService,
    private readonly environmentService: EnvironmentService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}
  @Transactional()
  public async register(
    createUserDto: CreateUserRequestDto,
    res: Response,
  ): Promise<CreateUserResponseDto> {
    const user = await this.userService.create(createUserDto);

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

    return this.mapToCreateUserResponseDto(user, accessToken);
  }

  private mapToCreateUserResponseDto(
    user: User,
    accessToken: string,
  ): CreateUserResponseDto {
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
