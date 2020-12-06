import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from 'src/modules/user/user.module';

import {
  Organisation,
  OrganisationRepository,
  Organisations_Users,
  OrgUsersRepository,
} from './model';
import { OrganisationController } from './organisation.controller';
import { OrganisationService } from './organisation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Organisation,
      OrganisationRepository,
      Organisations_Users,
      OrgUsersRepository,
    ]),
    UserModule,
  ],
  controllers: [OrganisationController],
  providers: [OrganisationService],
})
export class OrganisationModule {}
