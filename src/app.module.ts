import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './modules/user/user.module';
import { OrganisationModule } from './modules/organisation/organisation.module';
import { AuthModule } from './modules/auth/auth.module';
import { AccessControlModule } from './modules/access-control/access-control.module';
import { DataTreeModule } from './modules/data-tree/data-tree.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT) || 5432,
      database: process.env.POSTGRES_DB,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    UserModule,
    OrganisationModule,
    AuthModule,
    AccessControlModule,
    DataTreeModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
