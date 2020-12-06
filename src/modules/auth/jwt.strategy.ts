import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';

import { AUTHENTICATION_COOKIE_KEY } from 'src/environment';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => req.cookies[AUTHENTICATION_COOKIE_KEY],
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: { sub: number }) {
    return { id: payload.sub };
  }
}
