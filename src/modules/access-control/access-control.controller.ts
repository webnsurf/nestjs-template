import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/modules/auth/guards';

import { accessControl } from './data';

@Controller('access-control')
export class AccessControlController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getAccessControl() {
    return accessControl;
  }
}
