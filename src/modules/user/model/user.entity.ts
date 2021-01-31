import { Entity, Column, OneToMany, EntityRepository, Repository } from 'typeorm';

import { BaseEntity } from 'src/entities';
import { Organisations_Users } from 'src/modules/organisation/model';

import { UserOrganisation } from './types';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 160, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 60 })
  password: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  image: string;

  @OneToMany(() => Organisations_Users, userOrgs => userOrgs.user)
  organisations: UserOrganisation[];
}

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findWithOrganisations(where: Partial<User>) {
    const userRows = await this.createQueryBuilder('user')
      .leftJoinAndSelect('organisations_users', 'org_user', 'org_user.user_id = user.id')
      .leftJoinAndSelect(
        'organisations',
        'organisation',
        'organisation.id = org_user.organisation_id',
      )
      .select(
        '"user".*, org_user.role_id as org_role, organisation.id as org_id, organisation.name as org_name',
      )
      .where(where)
      .getRawMany();

    if (userRows.length) {
      const firstRecord = userRows[0];
      const user = Object.keys(firstRecord).reduce((user, key) => {
        if (!/^org_/.test(key)) {
          user[key] = firstRecord[key];
        }

        return user;
      }, {} as User);

      user.organisations = [];
      userRows.forEach(({ org_id, org_name, org_role }) => {
        if (org_id) {
          user.organisations.push({
            id: org_id,
            name: org_name,
            roleId: org_role,
          });
        }
      });

      return user;
    }

    return null;
  }
}
