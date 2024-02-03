import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';

@Injectable()
export class DateService {
  public getDate(date?: Date): Date {
    return dayjs(date).toDate();
  }

  public addDays(date: Date, days: number): Date {
    return dayjs(date).add(days, 'day').toDate();
  }

  public addMinutes(date: Date, days: number): Date {
    return dayjs(date).add(days, 'minute').toDate();
  }

  public addSeconds(date: Date, days: number): Date {
    return dayjs(date).add(days, 'second').toDate();
  }
}
