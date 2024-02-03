const EnvironmentValidationMessage = {
  PORT_NUMBER: '{{#label}}: Port must be a number',
  PORT_REQUIRE: '{{#label}}: Port is required',
  DB_TYPE_STRING: '{{#label}}: Database type must be a string',
  DB_TYPE_REQUIRE: '{{#label}}: Database type is required',
  DB_HOST_STRING: '{{#label}}: Database host must be a string',
  DB_HOST_REQUIRED: '{{#label}}: Database host is required',
  DB_PORT_NUMBER: '{{#label}}: Database port must be a number',
  DB_PORT_REQUIRED: '{{#label}}: Database port is required',
  DB_USERNAME_STRING: '{{#label}}: Database username must be a string',
  DB_USERNAME_REQUIRED: '{{#label}}: Database username is required',
  DB_PASSWORD_STRING: '{{#label}}: Database password must be a string',
  DB_PASSWORD_REQUIRED: '{{#label}}: Database password is required',
  DB_NAME_STRING: '{{#label}}: Database name must be a string',
  DB_NAME_REQUIRED: '{{#label}}: Database name is required',
  USER_PASSWORD_SALT_ROUNDS_NUMBER:
    '{{#label}}: Password salt rounds must be a number',
  USER_PASSWORD_SALT_ROUNDS_REQUIRED:
    '{{#label}}: Password salt rounds is required',
  USER_PASSWORD_SALT_ROUNDS_MIN:
    '{{#label}}: Password salt rounds must be greater than or equal to 3',
  JWT_ACCESS_SECRET_STRING:
    '{{#label}}: JWT access secret key must be a string',
  JWT_ACCESS_SECRET_REQUIRED: '{{#label}}: JWT access secret key is required',
  JWT_REFRESH_SECRET_STRING:
    '{{#label}}: JWT refresh secret key must be a string',
  JWT_REFRESH_SECRET_REQUIRED: '{{#label}}: JWT refresh secret key is required',
  JWT_ACCESS_EXPIRES_IN_REQUIRED:
    '{{#label}}: JWT access expires in is required',
  JWT_REFRESH_EXPIRES_IN_REQUIRED:
    '{{#label}}: JWT access expires in is required',
};

export { EnvironmentValidationMessage };
