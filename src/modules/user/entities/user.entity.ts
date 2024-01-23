import { Column, Entity, Index } from 'typeorm';
import { AbstractEntity } from '../../../database/abstract.entity';

@Entity('user')
export class User extends AbstractEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: false })
  @Index({ unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: false })
  isActive: boolean;
}
