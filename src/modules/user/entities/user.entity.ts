import { Column, Entity, Index, JoinTable, ManyToMany } from 'typeorm';
import { AbstractEntity } from '@database/abstract.entity';
import { Role } from '@modules/role/entities/role.entity';
import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({ example: 'password', description: 'User password' })
  @Column({ nullable: false })
  password: string;

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
}
