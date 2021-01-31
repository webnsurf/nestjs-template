import {
  Controller,
  Body,
  Param,
  Request,
  Get,
  Post,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { AllowedRoles, JwtAuthGuard, RolesGuard } from 'src/modules/auth/guards';

import { accessControl } from '../access-control/data';
import { OrganisationService } from './organisation.service';
import { CreateOrganisationRequest } from './request/create.request';
import { AddOrganisationUserRequest, UpdateOrganisationUserRequest } from './request/users.request';
import { OrganisationResponse } from './response/organisation.response';

const {
  organisation: { editUsers },
} = accessControl;

@Controller('organisation')
export class OrganisationController {
  constructor(private orgService: OrganisationService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: CreateOrganisationRequest, @Request() req) {
    return new OrganisationResponse(await this.orgService.create(data, req.user.id)).asAdmin();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':orgId/users')
  async getUsers(@Param('orgId') id) {
    return await this.orgService.getUsers(id);
  }

  @AllowedRoles(...editUsers)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':orgId/users')
  async addUser(@Body() data: AddOrganisationUserRequest, @Param('orgId') orgId: string) {
    return await this.orgService.addUser(orgId, data);
  }

  @AllowedRoles(...editUsers)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':orgId/users/:userId')
  async removeUser(@Param('orgId') orgId: string, @Param('userId') userId: string) {
    return await this.orgService.removeUser(orgId, userId);
  }

  @AllowedRoles(...editUsers)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':orgId/users/:userId')
  async updateUserRole(
    @Param('orgId') orgId: string,
    @Param('userId') userId: string,
    @Body() { roleId }: UpdateOrganisationUserRequest,
  ) {
    return await this.orgService.updateUserRole(orgId, userId, roleId);
  }
}
