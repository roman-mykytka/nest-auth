const UnauthorizedExceptionMessage = {
  USER_NOT_FOUND: 'User not found.',
  USER_BY_EMAIL_NOT_FOUND: 'User with this email does not exist.',
  PASSWORD_IS_INCORRECT: 'Password is incorrect',
  USER_IS_NOT_AUTHORIZED: 'User is not authorized',
  INVALID_ACCESS_TOKEN: 'Invalid access token',
  REFRESH_TOKEN_MISSING: 'Refresh token missing',
  INVALID_REFRESH_TOKEN: 'Invalid refresh token',
} as const;

export { UnauthorizedExceptionMessage };
