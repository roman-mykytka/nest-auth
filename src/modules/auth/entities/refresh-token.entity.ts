import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@database/abstract.entity';
import { User } from '@modules/user/entities/user.entity';

@Entity()
export class RefreshToken extends AbstractEntity {
  @Column()
  token: string;

  @Column()
  expires: Date;

  @ManyToOne(() => User, (user) => user.refreshTokens)
  user: User;
}
