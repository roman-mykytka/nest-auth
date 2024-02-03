import { Injectable, BadRequestException, PipeTransform } from '@nestjs/common';
import { CreateUserRequestDto } from '@modules/user/dto/create-user-request.dto';
import { createUserValidationSchema } from '@modules/auth/validation-schemas/create-user-request.validation-schema';

@Injectable()
export class CreateUserRequestDtoValidatePipe
  implements PipeTransform<CreateUserRequestDto>
{
  transform(value: CreateUserRequestDto): CreateUserRequestDto {
    const result = createUserValidationSchema.validate(value);
    if (result.error) {
      console.log(result.error);
      const errorMessages = result.error.details
        .map((d: { message: string }) => d.message)
        .join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
