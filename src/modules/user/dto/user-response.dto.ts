import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    example: '727f1c6e-3fec-49ff-9612-63258d9a5165',
    description: 'ID',
  })
  id: string;
  @ApiProperty({ example: 'Jon', description: 'First name' })
  firstName: string;
  @ApiProperty({ example: 'Jones', description: 'Last name' })
  lastName: string;
  @ApiProperty({ example: 'foo@gmail.com', description: 'User email' })
  email: string;
  @ApiProperty({ example: ['admin', 'user'], description: 'User roles' })
  roles: string[];
}
