import { Module } from '@nestjs/common';
import { UserService } from '@modules/user/user.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '@modules/user/user.module';
import { SharedModule } from '@shared/shared.module';
import { RoleModule } from '@modules/role/role.module';
import { RefreshTokenRepository } from '@modules/auth/repositories/refresh-token.repository';

@Module({
  imports: [UserModule, SharedModule, RoleModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, RefreshTokenRepository],
})
export class AuthModule {}
