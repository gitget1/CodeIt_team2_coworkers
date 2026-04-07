export const ACCESS_TOKEN_MAX_AGE = 60 * 60;
export const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 7;

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};

export const EXPIRED_COOKIE_OPTIONS = {
  ...COOKIE_OPTIONS,
  maxAge: 0,
};
