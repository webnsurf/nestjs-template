import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

import { User } from 'src/modules/user/model';
import { UserResponse } from 'src/modules/user/response/user.response';
import { UserService } from 'src/modules/user/user.service';
import {
  AUTHENTICATION_COOKIE_KEY,
  AUTHENTICATED_COOKIE_KEY,
  BASE_AUTH_COOKIE_OPTIONS,
} from 'src/environment';

import { LoginRequest, RegisterRequest } from './auth.request';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async authenticate(id: string) {
    const user = await this.userService.getWithOrganisations({ id });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async register(userData: RegisterRequest) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    try {
      const user = await this.userService.createNewUser({
        ...userData,
        password: hashedPassword,
      });
      return user;
    } catch (postgresError) {
      if (/Key \(email\)/.test(postgresError.detail)) {
        throw new ConflictException({
          fieldErrors: { email: 'Email already in use' },
        });
      }

      throw postgresError;
    }
  }

  async login(userData: LoginRequest) {
    const user = await this.userService.getWithOrganisations({
      email: userData.email,
    });

    if (!user || !bcrypt.compareSync(userData.password, user.password)) {
      throw new UnauthorizedException({
        fieldErrors: { email: 'Email or password incorrect' },
        message: 'Invalid details provided',
      });
    }

    return user;
  }

  logout(res: Response) {
    res
      .clearCookie(AUTHENTICATION_COOKIE_KEY, BASE_AUTH_COOKIE_OPTIONS)
      .clearCookie(AUTHENTICATED_COOKIE_KEY, BASE_AUTH_COOKIE_OPTIONS)
      .end();
  }

  signAndSendResponse(userData: User, res: Response) {
    const user = new UserResponse(userData);
    const { token, expires } = this.getToken(user.id);

    res
      .cookie(AUTHENTICATION_COOKIE_KEY, token, {
        ...BASE_AUTH_COOKIE_OPTIONS,
        httpOnly: true,
        expires,
      })
      .cookie(AUTHENTICATED_COOKIE_KEY, true, {
        ...BASE_AUTH_COOKIE_OPTIONS,
        expires,
      })
      .json(user);
  }

  getToken(id: string, options?: JwtSignOptions) {
    const token = this.jwtService.sign({ sub: id }, options);
    const decoded = this.jwtService.decode(token) as { exp: number };
    const expires = new Date();
    expires.setTime(decoded.exp * 1000);

    return { token, expires };
  }
}
