import { Module } from '@nestjs/common';

import { UserModule } from 'src/modules/user/user.module';

import { DataTreeController } from './data-tree.controller';
import { DataTreeService } from './data-tree.service';

@Module({
  imports: [UserModule],
  controllers: [DataTreeController],
  providers: [DataTreeService],
})
export class DataTreeModule {}
