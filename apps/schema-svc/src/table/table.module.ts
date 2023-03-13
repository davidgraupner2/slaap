import { Module, Logger } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';

@Module({
  providers: [TableService, Logger],
  controllers: [TableController],
})
export class TableModule {}
