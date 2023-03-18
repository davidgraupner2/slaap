import { Module, Logger } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { ValidateTableName } from '@lib/database/dto/validators';

@Module({
  providers: [TableService, Logger, ValidateTableName],
  controllers: [TableController],
})
export class TableModule {}
