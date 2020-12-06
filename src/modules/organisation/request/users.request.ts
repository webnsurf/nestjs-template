import { IsEmail, IsEnum } from 'class-validator';

import { UserRole } from 'src/modules/user/model';

export class AddOrganisationUserRequest {
  @IsEnum(UserRole)
  roleId: UserRole;

  @IsEmail()
  email: string;
}

export class UpdateOrganisationUserRequest {
  @IsEnum(UserRole)
  roleId: UserRole;
}
