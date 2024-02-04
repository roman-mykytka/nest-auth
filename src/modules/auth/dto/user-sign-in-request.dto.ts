import { ApiProperty } from '@nestjs/swagger';

export class UserSignInRequestDto {
  @ApiProperty({ example: 'foo@gmail.com', description: 'User email' })
  readonly email: string;
  @ApiProperty({ example: 'password', description: 'User password' })
  readonly password: string;
}
