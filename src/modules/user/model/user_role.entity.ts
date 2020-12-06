import {
  Entity,
  Column,
  PrimaryColumn,
  EntityRepository,
  Repository,
} from 'typeorm';

@Entity({ name: 'user_roles' })
export class UserRoleEntity {
  @PrimaryColumn()
  id: UserRole;

  @Column({ type: 'varchar', length: 40 })
  name: string;
}

export enum UserRole {
  ADMIN = 1,
  PUBLISHER = 5,
  EDITOR = 10,
  VIEWER = 15,
}

@EntityRepository(UserRoleEntity)
export class UserRoleRepository extends Repository<UserRoleEntity> {}
