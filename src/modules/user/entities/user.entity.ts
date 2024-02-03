import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { AbstractEntity } from '@database/abstract.entity';
import { Role } from '@modules/role/entities/role.entity';
import { ApiProperty } from '@nestjs/swagger';
import { RefreshToken } from '@modules/auth/entities/refresh-token.entity';

@Entity('user')
export class User extends AbstractEntity {
  @ApiProperty({ example: 'Jon', description: 'First name' })
  @Column()
  firstName: string;

  @ApiProperty({ example: 'Jones', description: 'Last name' })
  @Column()
  lastName: string;

  @ApiProperty({ example: 'foo@gmail.com', description: 'User email' })
  @Column({ nullable: false })
  @Index({ unique: true })
  email: string;

  @ApiProperty({
    example: '$2b$04$pCp1H71sX7RPcs1qR7tZK.AZtrSw1OK5idpHsShgBvORLQtNXvsLC',
    description: 'User password',
  })
  @Column({ nullable: false })
  passwordHash: string;

  @ApiProperty({
    example: '$2b$04$pCp1H71sX7RPcs1qR7tZK.',
    description: 'User password salt',
  })
  @Column({ nullable: false })
  passwordSalt: string;

  @ApiProperty({
    example: true,
    description: "Is the user's email address verified?",
  })
  @Column({ default: false })
  isActive: boolean;

  @ApiProperty({ example: ['ADMIN', 'MANAGER'], description: 'User roles' })
  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({ name: 'user_role' })
  roles: Role[];

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];
}
