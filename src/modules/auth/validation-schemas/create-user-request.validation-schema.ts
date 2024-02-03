import * as Joi from 'joi';
import { CreateUserRequestDto } from '@modules/user/dto/create-user-request.dto';
import { UserValidationMessage } from '@modules/auth/enums/user-validation-message.enum';
import { UserValidationRule } from '@modules/auth/enums/user-validation-rule.enum';

const createUserValidationSchema = Joi.object<CreateUserRequestDto, true>({
  firstName: Joi.string()
    .required()
    .pattern(UserValidationRule.FIRST_NAME_REGEX)
    .messages({
      'string.pattern.base': UserValidationMessage.FIRST_NAME_IS_INVALID,
      'any.required': UserValidationMessage.FIRST_NAME_REQUIRE,
    }),
  lastName: Joi.string()
    .required()
    .pattern(UserValidationRule.LAST_NAME_REGEX)
    .messages({
      'string.pattern.base': UserValidationMessage.LAST_NAME_IS_INVALID,
      'any.required': UserValidationMessage.LAST_NAME_REQUIRE,
    }),
  email: Joi.string()
    .required()
    .regex(UserValidationRule.EMAIL_REGEX)
    .email({
      tlds: {
        allow: false,
      },
    })
    .messages({
      'string.pattern.base': UserValidationMessage.EMAIL_IS_INVALID,
      'string.email': UserValidationMessage.EMAIL_WRONG,
      'any.required': UserValidationMessage.EMAIL_REQUIRE,
    }),
  password: Joi.string()
    .required()
    .pattern(UserValidationRule.PASSWORD_REGEX)
    .messages({
      'string.pattern.base': UserValidationMessage.PASSWORD_IS_INVALID,
      'any.required': UserValidationMessage.PASSWORD_REQUIRE,
    }),
});

export { createUserValidationSchema };
