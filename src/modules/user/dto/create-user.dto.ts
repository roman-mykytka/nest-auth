import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Jon', description: 'First name' })
  readonly firstName: string;
  @ApiProperty({ example: 'Jones', description: 'Last name' })
  readonly lastName: string;
  @ApiProperty({ example: 'foo@gmail.com', description: 'User email' })
  readonly email: string;
  @ApiProperty({ example: 'password', description: 'User password' })
  readonly password: string;
}
