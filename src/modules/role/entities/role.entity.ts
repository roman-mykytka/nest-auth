import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../../../database/abstract.entity';
import { User } from '../../user/entities/user.entity';

@Entity('role')
export class Role extends AbstractEntity {
  @Column({ unique: true, nullable: false })
  name: string;

  @ManyToMany(() => User, (user) => user.roles)
  @JoinTable({ name: 'user_role' })
  users: User[];
}
