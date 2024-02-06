import { PartialType } from '@nestjs/mapped-types';
import { UserSignUpRequestDto } from '@modules/auth/dto/user-sign-up-request.dto';

export class UpdateUserDto extends PartialType(UserSignUpRequestDto) {}
