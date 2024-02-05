import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from '@shared/services/token.service';
import { RefreshTokenRepository } from '@modules/auth/repositories/refresh-token.repository';
import { UnauthorizedExceptionMessage } from '@core/enums/enums';
import { UserService } from '@modules/user/user.service';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const refreshToken = this.extractRefreshToken(req);

      if (!refreshToken) {
        throw new UnauthorizedException(
          UnauthorizedExceptionMessage.REFRESH_TOKEN_MISSING,
        );
      }

      const isValid = await this.validateRefreshToken(refreshToken);

      if (!isValid) {
        throw new UnauthorizedException(
          UnauthorizedExceptionMessage.INVALID_REFRESH_TOKEN,
        );
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  private extractRefreshToken(req: any): string | undefined {
    return req.cookies?.refreshToken;
  }

  private async validateRefreshToken(refreshToken: string): Promise<boolean> {
    const existingToken =
      await this.refreshTokenRepository.findByToken(refreshToken);

    if (!existingToken) {
      return false;
    }

    const { userId } = await this.tokenService.decodeRefreshToken(refreshToken);
    const user = await this.userService.findById(userId);

    if (!user) {
      return false;
    }

    return true;
  }
}
