import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EnvironmentService } from '@shared/services/environment.service';

type JwtPayload = {
  userId: string;
};

@Injectable()
export class TokenService {
  constructor(
    private readonly environmentService: EnvironmentService,
    private readonly jwtService: JwtService,
  ) {}

  public async getAccessToken<T extends Record<string, unknown>>(
    payload: T & JwtPayload,
  ): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.environmentService.accessTokenSetting.secretKey,
      expiresIn: this.environmentService.accessTokenSetting.expiresIn,
    });
  }

  public async getRefreshToken<T extends Record<string, unknown>>(
    payload: T & JwtPayload,
  ): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.environmentService.refreshTokenSetting.secretKey,
      expiresIn: this.environmentService.refreshTokenSetting.expiresIn,
    });
  }

  public decodeAccessToken<T>(token: string): Promise<JwtPayload & T> {
    return this.jwtService.verifyAsync(token);
  }

  public decodeRefreshToken<T>(token: string): Promise<JwtPayload & T> {
    return this.jwtService.verifyAsync(token);
  }
}
