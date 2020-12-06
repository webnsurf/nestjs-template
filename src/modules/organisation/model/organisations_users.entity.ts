import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  Column,
  EntityRepository,
  Repository,
} from 'typeorm';

import { User, UserRoleEntity, UserRole } from 'src/modules/user/model';
import { TimeStampEntity } from 'src/entities';

import { Organisation } from './organisation.entity';

@Entity({ name: 'organisations_users' })
export class Organisations_Users extends TimeStampEntity {
  @PrimaryColumn({ name: 'user_id', type: 'varchar', length: 32 })
  userId: string;

  @PrimaryColumn({ name: 'organisation_id', type: 'varchar', length: 32 })
  organisationId: string;

  @ManyToOne(
    () => User,
    user => user.id,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(
    () => Organisation,
    org => org.id,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'organisation_id' })
  organisation: Organisation;

  @Column({ name: 'role_id', type: 'tinyint' })
  roleId: number;

  @ManyToOne(() => UserRoleEntity)
  @JoinColumn({ name: 'role_id' })
  role: UserRole;
}

@EntityRepository(Organisations_Users)
export class OrgUsersRepository extends Repository<Organisations_Users> {}
