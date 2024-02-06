import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from '@shared/services/services';
import { UserService } from '@modules/user/user.service';
import { UnauthorizedExceptionMessage } from '@core/enums/enums';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const accessToken = this.extractAccessToken(req);

      if (!accessToken) {
        throw new UnauthorizedException(
          UnauthorizedExceptionMessage.USER_IS_NOT_AUTHORIZED,
        );
      }

      const userId = await this.getUserIdFromAccessToken(accessToken);
      const user = await this.userService.findById(userId);

      if (!user) {
        throw new UnauthorizedException(
          UnauthorizedExceptionMessage.USER_NOT_FOUND,
        );
      }

      req.user = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  private extractAccessToken(req: any): string | undefined {
    const [type, accessToken] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? accessToken : undefined;
  }

  private async getUserIdFromAccessToken(accessToken: string): Promise<string> {
    const { userId } = await this.tokenService.decodeAccessToken(accessToken);
    if (!userId) {
      throw new UnauthorizedException(
        UnauthorizedExceptionMessage.INVALID_ACCESS_TOKEN,
      );
    }
    return userId;
  }
}
