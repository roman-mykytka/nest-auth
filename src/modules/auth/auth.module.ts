import { Module } from '@nestjs/common';
import { UserService } from '@modules/user/user.service';
import { UserModule } from '@modules/user/user.module';
import { SharedModule } from '@shared/shared.module';
import { RoleModule } from '@modules/role/role.module';
import { AuthService } from '@modules/auth/auth.service';
import { AuthController } from '@modules/auth/auth.controller';
import { RefreshTokenRepository } from '@modules/auth/repositories/repositories';

@Module({
  imports: [UserModule, SharedModule, RoleModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, RefreshTokenRepository],
})
export class AuthModule {}
