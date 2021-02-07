import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';

import { UserRole } from 'src/modules/user/model';
import { UserService } from 'src/modules/user/user.service';
import { UserResponse } from 'src/modules/user/response/user.response';

import { OrganisationRepository, OrgUsersRepository } from './model';
import { CreateOrganisationRequest } from './request/create.request';
import { AddOrganisationUserRequest } from './request/users.request';

@Injectable()
export class OrganisationService {
  constructor(
    private orgRepository: OrganisationRepository,
    private orgUsersRepo: OrgUsersRepository,
    private userService: UserService,
  ) {}

  async create(data: CreateOrganisationRequest, userId: string) {
    const existingOrganisation = await this.orgRepository.findOne({
      name: data.name,
    });

    if (existingOrganisation) {
      throw new ConflictException({ fields: { name: 'Name already taken' } });
    }

    const organisation = await this.orgRepository.save(this.orgRepository.create(data));

    await this.linkUser(organisation.id, userId, UserRole.ADMIN);

    return organisation;
  }

  async delete(orgId: string) {
    return this.orgRepository.delete(orgId);
  }

  async getUsers(organisationId: string) {
    const users = await this.orgUsersRepo.find({
      relations: ['user'],
      where: { organisationId },
      order: { createdAt: 'ASC' },
    });

    return users.map(({ user, roleId }) => new UserResponse(user, roleId));
  }

  async addUser(organisationId: string, data: AddOrganisationUserRequest) {
    const user = await this.userService.getByEmail(data.email);

    if (!user) {
      throw new NotFoundException({
        fields: { email: 'User does not exist' },
      });
    }

    if (await this.checkUserInOrganisation(organisationId, user.id)) {
      throw new ConflictException({
        fields: { email: 'User already belongs to organisation' },
      });
    }

    await this.linkUser(organisationId, user.id, data.roleId);
  }

  async removeUser(organisationId: string, userId: string) {
    await this.orgUsersRepo.delete({
      organisationId,
      userId,
    });
  }

  async updateUserRole(organisationId: string, userId: string, roleId: UserRole) {
    await this.orgUsersRepo.update({ organisationId, userId }, { roleId });
  }

  async getUserRole(organisationId: string, userId: string) {
    const userRoleRecord = await this.orgUsersRepo.findOne({
      where: { organisationId, userId },
      select: ['roleId'],
    });

    return userRoleRecord?.roleId;
  }

  private async checkUserInOrganisation(organisationId: string, userId: string) {
    const userCount = await this.orgUsersRepo.count({
      where: { organisationId, userId },
    });

    return userCount > 0;
  }

  private async linkUser(organisationId: string, userId: string, roleId: number) {
    return await this.orgUsersRepo.save(
      this.orgUsersRepo.create({
        organisationId,
        roleId,
        userId,
      }),
    );
  }
}
