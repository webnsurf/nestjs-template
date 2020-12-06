import { BeforeInsert, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { TimeStampEntity } from './timestamp.entity';

export class BaseEntity extends TimeStampEntity {
  @PrimaryColumn({ type: 'varchar', length: 32, unique: true })
  id: string;

  @BeforeInsert()
  generateId() {
    this.id = uuid().replace(/-/g, '');
  }
}
