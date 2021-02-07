import { Injectable, CanActivate, ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { OrganisationService } from 'src/modules/organisation/organisation.service';
import { UserRole } from 'src/modules/user/model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private orgService: OrganisationService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { params, user } = context.switchToHttp().getRequest<Request>();
    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    const userRole = await this.orgService.getUserRole(params.orgId, user.id);

    if (!roles) {
      return userRole !== undefined;
    }

    return roles.includes(userRole);
  }
}

export const AllowedRoles = (...roles: UserRole[]) => SetMetadata('roles', roles);
