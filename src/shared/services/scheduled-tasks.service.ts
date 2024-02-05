import { LessThan } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RefreshTokenRepository } from '@modules/auth/repositories/refresh-token.repository';
import { DateService } from '@shared/services/date.service';

@Injectable()
export class ScheduledTasksService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly dateService: DateService,
  ) {}
  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async removeExpiredTokens() {
    const currentDate = this.dateService.getDate();
    await this.refreshTokenRepository.delete({
      expires: LessThan(currentDate),
    });
  }
}
