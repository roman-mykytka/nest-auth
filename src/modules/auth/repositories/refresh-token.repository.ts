import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RefreshToken } from '@modules/auth/entities/refresh-token.entity';
import { User } from '@modules/user/entities/user.entity';

@Injectable()
export class RefreshTokenRepository extends Repository<RefreshToken> {
  constructor(private dataSource: DataSource) {
    super(RefreshToken, dataSource.createEntityManager());
  }

  async saveToken(
    token: string,
    expires: Date,
    user: User,
  ): Promise<RefreshToken> {
    const refreshToken = this.create({ token, expires, user });
    return this.save(refreshToken);
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    return await this.findOneBy({ token });
  }

  async deleteToken(token: string): Promise<void> {
    await this.delete({ token });
  }
}
