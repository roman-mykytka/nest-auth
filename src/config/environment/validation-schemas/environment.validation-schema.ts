import * as Joi from 'joi';
import { EnvironmentValidationMessage } from '../enums/enums';
const environmentValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .required()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().required().messages({
    'number.base': EnvironmentValidationMessage.PORT_NUMBER,
    'any.required': EnvironmentValidationMessage.PORT_REQUIRE,
  }),
  DB_TYPE: Joi.string().required().messages({
    'string.base': EnvironmentValidationMessage.DB_TYPE_STRING,
    'any.required': EnvironmentValidationMessage.DB_TYPE_REQUIRE,
  }),
  DB_HOST: Joi.string().required().messages({
    'string.base': EnvironmentValidationMessage.DB_HOST_REQUIRED,
    'any.required': EnvironmentValidationMessage.DB_HOST_REQUIRED,
  }),
  DB_PORT: Joi.number().required().messages({
    'number.base': EnvironmentValidationMessage.DB_PORT_REQUIRED,
    'any.required': EnvironmentValidationMessage.DB_PORT_NUMBER,
  }),
  DB_USERNAME: Joi.string().required().messages({
    'string.base': EnvironmentValidationMessage.DB_USERNAME_STRING,
    'any.required': EnvironmentValidationMessage.DB_USERNAME_REQUIRED,
  }),
  DB_PASSWORD: Joi.string().required().messages({
    'string.base': EnvironmentValidationMessage.DB_PASSWORD_STRING,
    'any.required': EnvironmentValidationMessage.DB_PASSWORD_REQUIRED,
  }),
  DB_NAME: Joi.string().required().messages({
    'string.base': EnvironmentValidationMessage.DB_NAME_STRING,
    'any.required': EnvironmentValidationMessage.DB_NAME_REQUIRED,
  }),
  USER_PASSWORD_SALT_ROUNDS: Joi.number().required().min(3).messages({
    'number.base':
      EnvironmentValidationMessage.USER_PASSWORD_SALT_ROUNDS_NUMBER,
    'any.required':
      EnvironmentValidationMessage.USER_PASSWORD_SALT_ROUNDS_REQUIRED,
    'number.min': EnvironmentValidationMessage.USER_PASSWORD_SALT_ROUNDS_MIN,
  }),
  JWT_ACCESS_SECRET: Joi.string().required().messages({
    'string.base': EnvironmentValidationMessage.JWT_ACCESS_SECRET_STRING,
    'any.required': EnvironmentValidationMessage.JWT_ACCESS_SECRET_REQUIRED,
  }),
  JWT_ACCESS_EXPIRES_IN: Joi.required().messages({
    'any.required': EnvironmentValidationMessage.JWT_ACCESS_EXPIRES_IN_REQUIRED,
  }),
  JWT_REFRESH_SECRET: Joi.string().required().messages({
    'string.base': EnvironmentValidationMessage.JWT_REFRESH_SECRET_STRING,
    'any.required': EnvironmentValidationMessage.JWT_REFRESH_SECRET_REQUIRED,
  }),
  JWT_REFRESH_EXPIRES_IN: Joi.required().messages({
    'any.required': EnvironmentValidationMessage.JWT_ACCESS_EXPIRES_IN_REQUIRED,
  }),
});

export { environmentValidationSchema };
