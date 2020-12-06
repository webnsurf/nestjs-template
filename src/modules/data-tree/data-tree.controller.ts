import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/modules/auth/guards';

import { DataTreeService } from './data-tree.service';

@Controller('data-tree')
export class DataTreeController {
  constructor(private dataTreeService: DataTreeService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getDataTree() {
    return this.dataTreeService.generateDatatree();
  }
}
