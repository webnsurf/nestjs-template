import { Controller, Post, Body, Request, Response, Get, UseGuards } from '@nestjs/common';

import { LoginRequest, RegisterRequest } from './auth.request';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('authenticate')
  async authenticate(@Request() req, @Response() res) {
    return this.authService.signAndSendResponse(
      await this.authService.authenticate(req.user.id),
      res,
    );
  }

  @Post('register')
  async register(@Body() data: RegisterRequest, @Response() res) {
    this.authService.signAndSendResponse(await this.authService.register(data), res);
  }

  @Post('login')
  async login(@Body() data: LoginRequest, @Response() res) {
    this.authService.signAndSendResponse(await this.authService.login(data), res);
  }

  @Get('logout')
  async logout(@Response() res) {
    return this.authService.logout(res);
  }
}
