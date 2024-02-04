import { Injectable, BadRequestException, PipeTransform } from '@nestjs/common';
import { UserSignUpRequestDto } from '@modules/auth/dto/user-sign-up-request.dto';
import { createUserValidationSchema } from '@modules/auth/validation-schemas/create-user-request.validation-schema';

@Injectable()
export class UserSignUpRequestDtoValidatePipe
  implements PipeTransform<UserSignUpRequestDto>
{
  transform(value: UserSignUpRequestDto): UserSignUpRequestDto {
    const result = createUserValidationSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details
        .map((d: { message: string }) => d.message)
        .join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
