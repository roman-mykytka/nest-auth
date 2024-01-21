import * as Joi from 'joi';
import { EnvironmentValidationMessage } from '../enums/enums';
const environmentValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().required().default(3000).messages({
    'number.base': EnvironmentValidationMessage.PORT_NUMBER,
    'any.required': EnvironmentValidationMessage.PORT_REQUIRE,
  }),
});

export { environmentValidationSchema };
