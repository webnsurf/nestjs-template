import {
  Entity,
  Column,
  OneToMany,
  EntityRepository,
  Repository,
} from 'typeorm';

import { BaseEntity } from 'src/entities';

import { Organisations_Users } from './organisations_users.entity';

@Entity({ name: 'organisations' })
export class Organisation extends BaseEntity {
  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @OneToMany(
    () => Organisations_Users,
    userOrgs => userOrgs.organisation,
  )
  users: Organisations_Users[];
}

@EntityRepository(Organisation)
export class OrganisationRepository extends Repository<Organisation> {}
