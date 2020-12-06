import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import {
  User,
  UserRepository,
  UserRoleEntity,
  UserRoleRepository,
} from './model';
import { UserService } from './user.service';

const typeOrmModule = TypeOrmModule.forFeature([
  User,
  UserRepository,
  UserRoleEntity,
  UserRoleRepository,
]);

@Module({
  imports: [typeOrmModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, typeOrmModule],
})
export class UserModule {}
