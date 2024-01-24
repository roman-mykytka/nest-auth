import { Column, Entity, Index, JoinTable, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../../../database/abstract.entity';
import { Role } from '../../role/entities/role.entity';

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

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({ name: 'user_role' })
  roles: Role[];
}
