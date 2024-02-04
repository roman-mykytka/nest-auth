import { PartialType } from '@nestjs/mapped-types';
import { UserSignUpRequestDto } from '../../auth/dto/user-sign-up-request.dto';

export class UpdateUserDto extends PartialType(UserSignUpRequestDto) {}
