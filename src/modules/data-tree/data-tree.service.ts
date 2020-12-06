import { Injectable } from '@nestjs/common';

import { UserService } from 'src/modules/user/user.service';

import { DataTree } from './types';

@Injectable()
export class DataTreeService {
  constructor(private userService: UserService) {}
  async generateDatatree(): Promise<DataTree> {
    const userRoles = await this.userService.getUserRoles();

    return { userRoles };
  }
}
