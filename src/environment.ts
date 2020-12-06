import { CookieOptions } from 'express';

export const AUTHENTICATION_COOKIE_KEY = 'webnsurf-nestjs';
export const AUTHENTICATED_COOKIE_KEY = `${AUTHENTICATION_COOKIE_KEY}-authenticated`;
export const BASE_AUTH_COOKIE_OPTIONS: CookieOptions = {
  domain: 'webnsurf.com',
  secure: true,
};
