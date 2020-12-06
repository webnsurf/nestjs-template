import { UserRole } from 'src/modules/user/model';

import { Organisation } from '../model';

export class OrganisationResponse {
  public id: string;
  public name: string | null;
  public roleId?: UserRole;

  constructor(organisation: Organisation) {
    this.id = organisation.id;
    this.name = organisation.name;
  }

  asAdmin() {
    this.roleId = UserRole.ADMIN;
    return this;
  }
}
