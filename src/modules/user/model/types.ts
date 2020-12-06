import { UserRole } from './user_role.entity';
import { User } from './user.entity';

export interface UserOrganisation {
  id: string;
  name: string;
  roleId: UserRole;
}

export interface UserWithOrganisationRow extends User {
  org_role: number;
  org_id: string;
  org_name: string;
}
