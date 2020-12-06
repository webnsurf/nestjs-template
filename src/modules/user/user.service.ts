import { Injectable } from '@nestjs/common';

import { User, UserRepository, UserRoleRepository } from './model';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private userRoleRepository: UserRoleRepository,
  ) {}

  getByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }

  getWithOrganisations(where: Partial<User>) {
    return this.userRepository.findWithOrganisations(where);
  }

  getUserRoles() {
    return this.userRoleRepository.find({ order: { id: 'ASC' } });
  }

  createNewUser(data: Partial<User>) {
    return this.userRepository.save(this.userRepository.create(data));
  }
}
