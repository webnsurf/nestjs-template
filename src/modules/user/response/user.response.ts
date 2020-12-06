import { UserOrganisation } from '../model/types';
import { User, UserRole } from '../model';

export class UserResponse {
  public id: string;
  public email: string;
  public name: string | null;
  public image: string | null;
  public organisations?: UserOrganisation[];
  public roleId?: UserRole;

  constructor(user: User, roleId?: number) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.image = user.image;
    this.organisations = user.organisations || [];
    this.roleId = roleId;
  }

  static fromList(users: User[]) {
    return users.map(user => new UserResponse(user));
  }
}
