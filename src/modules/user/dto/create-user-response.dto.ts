import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '@modules/user/dto/user-response.dto';

export class CreateUserResponseDto {
  @ApiProperty({
    example: {
      id: '727f1c6e-3fec-49ff-9612-63258d9a5165',
      createdAt: '2024-01-01 01:00:00.091742',
      updatedAt: '2024-01-01 01:00:00.091742',
      firstName: 'Jon',
      lastName: 'Jones',
      email: 'foo@gmail.com',
      isActive: true,
      roles: ['ADMIN', 'MANAGER'],
    },
    type: UserResponseDto,
  })
  user: UserResponseDto;
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyZDRlZmYzMy0yNjQxLTQ2NjQtYmIwMS0zNWRjMzQ5ZWQ5MzAiLCJpYXQiOjE3MDYzNTg1MTAsImV4cCI6MTcwNjM1OTQxMH0.KurJPHpoQPcxIU-ufFf07Azsat55uT_lW1xHLpf4vVY',
    description: 'Access token',
  })
  accessToken: string;
}
